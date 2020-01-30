import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { Picker } from "native-base";
import Ionicons from 'react-native-vector-icons/Ionicons'
import Utilities from '../../utils/Utilities.js';
import { getCategoriesByPostType } from '../../database/CategoriesSchema'

const Screen = {
    width: Dimensions.get('window').width
}

export default class DropDown extends Component {
    state = {
        valueType: 'all',
        arrValueType: []
    }

    async _getCategories(postType) {
        var values = [{
            category: "all",
            category_name: "Tất cả"
        }]
        let arrValue = [];

        let arrValueType = await getCategoriesByPostType(postType);

        values = values.concat(arrValueType.map(e => {
            var tmp = {}
            tmp.category = e.category_id
            tmp.category_name = e.category_name
            return tmp
        }))

        values.forEach(element => {
            let item = <Picker.Item key={element.category} label={element.category_name}
                value={element.category}
            />

            arrValue.push(item)
        });

        return arrValue;
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    async onReset(postType) {
        try {
            let arrValueType = await this._getCategories(postType);

            if (global.dataFilterTemp.category) {
                this.setState({
                    valueType: global.dataFilterTemp.category,
                    arrValueType
                })
            } else {
                if (global.dataFilterTemp.category) {
                    this.setState({
                        valueType: global.dataFilterTemp.category,
                        arrValueType
                    })
                } else {
                    this.setState({
                        valueType: 'all',
                        arrValueType
                    })
                }
            }
        } catch (error) {
            //  alert(error)
        }
    }

    async componentDidMount() {
        try {
            this.props.onRef(this)
            let arrValueType = await this._getCategories(global.dataFilter.type_of_post);

            if (global.dataFilterTemp.category) {
                this.setState({
                    valueType: global.dataFilterTemp.category,
                    arrValueType
                })
            } else {
                global.dataFilterTemp.category = "all"

                this.setState({
                    valueType: "all",
                    arrValueType
                })
            }
        } catch (error) {
            //  alert(error)
        }
    }

    onValueChangeValueType(valueType) {
        global.dataFilterTemp.category = valueType
        this.setState({
            valueType
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState === this.state) {
            return false
        }
        return true
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.title}</Text>
                <View style={{
                    marginTop: 5,
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,0.3)',
                    height: 45,
                    width: Screen.width - 32,
                    justifyContent: 'center'
                }}>
                    <Picker
                        modalStyle={styles.modalPicker}
                        headerStyle={styles.headerPicker}
                        itemStyle={styles.itemModal}
                        headerBackButtonTextStyle={styles.headerBackModal}
                        headerTitleStyle={styles.headerTitleModal}
                        iosHeader="Chọn"
                        headerBackButtonText="Trở lại"
                        iosIcon={<Ionicons name="ios-arrow-down" size={24} color="rgba(0,0,0,0.8)" />}
                        placeholder="- - Chọn - -"
                        placeholderIconColor={"rgba(0,0,0,0.5)"}
                        placeholderStyle={{ color: "rgba(0,0,0,0.5)", fontWeight: "rgba(0,0,0,0.5)" }}
                        mode="dialog"
                        textStyle={styles.textPicker}
                        itemTextStyle={styles.textPicker}
                        style={[styles.picker, { width: Screen.width - (Utilities.checkAndroidOS() ? 32 : 48) }]}
                        selectedValue={this.state.valueType}
                        onValueChange={this.onValueChangeValueType.bind(this)} >
                        {this.state.arrValueType}
                    </Picker>
                </View>
            </View>
        );
    }

    onValueChange = (value) => {
        this.setState({ value })
    }
}

const styles = StyleSheet.create({
    viewTitle: {
        marginTop: 20,
        flexDirection: 'row'
    },
    title: {
        fontSize: 13,
        flex: 1,
        color: 'rgba(0,0,0,0.8)'
    },
    container: {
        marginTop: 20,
        marginStart: 16,
    },
    modalPicker: {
        backgroundColor: "white",
    },
    headerPicker: {
        backgroundColor: "white"
    },
    headerBackModal: {
        color: "rgba(0,0,0,0.8)"
    },
    headerTitleModal: {
        color: "rgba(0,0,0,0.8)"
    },
    itemModal: {
        fontSize: 14,
        marginLeft: 0,
        paddingLeft: 16,
    },
    textPicker: {
        fontSize: 14,
        color: "rgba(0,0,0,0.8)",
    },
    picker: {
        fontSize: 14,
        color: "rgba(0,0,0,0.8)"
    }
});

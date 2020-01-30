import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Picker } from "native-base";
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Utilities from '../../utils/Utilities.js';
import { getCategoriesByPostType } from '../../database/CategoriesSchema'

const Screen = {
    width: Dimensions.get('window').width
}

export default class DropDownCategories extends Component {
    constructor(props) {
        super(props)
        this.state = {
            valueType: null,
            arrValueType: [],
            type_of_post: 1
        }
    }

    async _getCategories(post_type) {
        try {
            let arrValue = [];
            let arrValueType = await getCategoriesByPostType(post_type);

            arrValueType.forEach(element => {
                let item = <Picker.Item
                    key={element.category_id}
                    label={element.category_name}
                    value={element.category_id}
                />

                arrValue.push(item)
            })
            return arrValue;
        } catch (error) {
         //   alert(error)
        }
    }

    async onReset(postType) {
        try {

        } catch (error) {

        }
    }

    async componentDidMount() {
        try {
            var type_of_post = this.props.type_of_post
            var category = this.props.category

            let arrValueType = await this._getCategories(type_of_post ? type_of_post : 1);
            this.props.onRecieverValuePostType(type_of_post ? type_of_post : 1)

            this.setState({
                valueType: category,
                arrValueType,
                type_of_post
            })
        } catch (error) {
         //   alert(error)
        }
    }

    onValueChangeValueType(valueType) {
        try {
            this.props.onRecieverValueProduct(valueType)
            this.setState({
                valueType
            })
        } catch (error) {
         //   alert(error)
        }
    }

    async _onChangePostType(type_of_post) {
        try {
            this.props.onRecieverValuePostType(type_of_post)
            this.props.onRecieverValueProduct(null)
            let arrValueType = await this._getCategories(type_of_post);
            this.setState({
                type_of_post,
                valueType: null,
                arrValueType
            })
        } catch (error) {
         //   alert(error)
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     if (nextState === this.state) {
    //         return false
    //     }
    //     return true
    // }

    render() {
        return (
            <View style={{
                paddingTop: 10,
                paddingBottom: 24
            }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => this._onChangePostType(1)}
                        style={{
                            flex: 1,
                            borderWidth: 1.1,
                            borderRadius: 3,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginEnd: 4,
                            borderColor: 'rgba(200, 200, 218, 1)'
                        }}>
                        <Text style={{ color: 'rgba(0,0,0,0.8)', fontSize: 14 }}>Mua nhà</Text>
                        {
                            this.state.type_of_post == 1
                                ?
                                <AntDesign
                                    name="checkcircle"
                                    size={14}
                                    color={'rgba(0,0,0,0.8)'}
                                    style={{
                                        position: 'absolute',
                                        right: 10
                                    }}
                                />
                                :
                                null
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this._onChangePostType(2)}
                        style={{
                            flex: 1,
                            borderWidth: 1.1,
                            borderRadius: 3,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginStart: 4,
                            borderColor: 'rgba(200, 200, 218, 1)'
                        }}>
                        <Text style={{ color: 'rgba(0,0,0,0.8)', fontSize: 14 }}>Thuê nhà</Text>
                        {
                            this.state.type_of_post == 2
                                ?
                                <AntDesign
                                    name="checkcircle"
                                    size={14}
                                    color={'rgba(0,0,0,0.8)'}
                                    style={{
                                        position: 'absolute',
                                        right: 10
                                    }}
                                />
                                :
                                null
                        }
                    </TouchableOpacity>
                </View>
                <View style={{
                    marginTop: 8,
                    height: 40,
                    borderWidth: 1.1,
                    borderColor: 'rgba(200, 200, 218, 1)',
                    borderRadius: 3,
                    justifyContent: 'center',
                    padding: 0,
                    margin: 0
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
                        placeholder="Chọn loại đất(*)"
                        placeholderIconColor={"rgba(0,0,0,0.5)"}
                        placeholderStyle={{ color: "rgba(0,0,0,0.8)", fontSize: 14 }}
                        mode="dialog"
                        textStyle={styles.textPicker}
                        itemTextStyle={styles.textPicker}
                        style={[styles.picker, { width: Screen.width - (Utilities.checkAndroidOS() ? 40 : 48) }]}
                        selectedValue={this.state.valueType}
                        onValueChange={this.onValueChangeValueType.bind(this)} >
                        <Picker.Item label="Chọn Loại đất" value={null} />
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
    container: {
        marginTop: 8,
        marginBottom: 24
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
        paddingLeft: 16
    },
    textPicker: {
        fontSize: 14,
        color: "rgba(0,0,0,0.8)"
    },
    picker: {
        color: "rgba(0,0,0,0.8)"
    }
});

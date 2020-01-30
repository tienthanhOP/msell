import React, { Component } from 'react'
import {
    Text, StyleSheet, View, TextInput, FlatList,
    TouchableOpacity, ScrollView, Dimensions
} from 'react-native'
import Utilities from '../../utils/Utilities';
import { Picker } from "native-base";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { getBottomSpace } from 'react-native-iphone-x-helper';

const Screen = {
    width: Dimensions.get('window').width
}

export default class InputSearchProjects extends Component {
    constructor(props) {
        super(props)
        this.state = {
            valueProject: null
        }
        this.userSelect = false
    }

    onValueChangeValueProject(value) {
        try {
            this.userSelect = true
            if (value) {
                var project = this.props.dataProjects.find(e => e.project_id == value)
                this.props.onChangeTextShowAddress(project.name, project)
                this.setState({
                    valueProject: value
                })
            } else {
                this.props.onChangeTextShowAddress("",
                    {
                        locations: null,
                        name: "",
                        project_id: 0,
                        address: null,
                        city_id: null,
                        district_id: null
                    })
                this.setState({
                    valueProject: value
                })
            }
        } catch (error) {

        }
    }

    componentWillReceiveProps(nextProps) {
        try {
            if (this.props.project_id && !this.userSelect) {
                this.state = {
                    valueProject: this.props.project_id
                }
            }
        } catch (error) {

        }
    }

    render() {
        return (
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
                    placeholder="Chọn Dự án"
                    placeholderIconColor={"rgba(0,0,0,0.5)"}
                    placeholderStyle={{ color: "rgba(0,0,0,0.8)", fontSize: 14 }}
                    mode="dialog"
                    textStyle={styles.textPicker}
                    itemTextStyle={styles.textPicker}
                    style={[styles.picker, { width: Screen.width - (Utilities.checkAndroidOS() ? 40 : 48) }]}
                    selectedValue={this.state.valueProject}
                    onValueChange={this.onValueChangeValueProject.bind(this)}>
                    <Picker.Item label="Chọn Dự án" value={null} />
                    {this.props.dataProjects.map((element) => {
                        return <Picker.Item
                            key={element.project_id}
                            label={element.name}
                            value={element.project_id}
                        />
                    })}
                </Picker>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        marginBottom: 24
    },
    modalPicker: {
        backgroundColor: "white",
        paddingBottom: getBottomSpace()
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
        color: "rgba(0,0,0,0.8)",
    },
    picker: {
        fontSize: 14,
        color: "rgba(0,0,0,0.8)"
    }
})

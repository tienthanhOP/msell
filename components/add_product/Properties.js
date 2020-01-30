import React, { Component } from 'react'
import {
    Text, StyleSheet, View, Dimensions,
    TouchableOpacity, TextInput
} from 'react-native'
import { Picker } from "native-base";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Utilities from '../../utils/Utilities';
import LinearGradient from 'react-native-linear-gradient';

const Screen = {
    width: Dimensions.get('window').width
}

const actions = {
    increase: 1,
    decrease: 2
}

const dropdowns = {
    direction: "valueDirection",
    direction_balcony: "valueDirectionBalcony",
    juridical: "valueJuridical",
    furniture: "valueFurniture"
}

const amounts = {
    floors: "valueFloors",
    beds: "valueBeds",
    baths: "valueBaths",
    toilets: "valueToilets",
}

export default class Properties extends Component {
    constructor(props) {
        super(props)
        this.state = {
            valueDirection: null,
            valueDirectionBalcony: null,
            valueJuridical: null,
            valueFurniture: null,
            valueFloors: 0,
            valueBeds: 0,
            valueBaths: 0,
            valueToilets: 0,
            valueFacade: "",
            valueRoadWide: ""
        }
        this._changeValueDropDown = this._changeValueDropDown.bind(this)
        this._changeValueAmount = this._changeValueAmount.bind(this)
        this.properties = {}
    }

    componentDidMount() {
        if (this.props.valueEdit) {
            var properties = this.props.valueEdit
            this.setState({
                valueDirection: properties.direction,
                valueDirectionBalcony: properties.direction_balcony,
                valueJuridical: properties.juridical,
                valueFurniture: properties.furniture,
                valueFloors: properties.floors ? properties.floors : 0,
                valueBeds: properties.beds ? properties.beds : 0,
                valueBaths: properties.baths ? properties.baths : 0,
                valueToilets: properties.toilets ? properties.toilets : 0,
                valueFacade: properties.facade ? properties.facade + "" : "",
                valueRoadWide: properties.road_wide ? properties.road_wide + "" : ""
            })
        }
    }

    _changeValueDropDown(value, dropdown) {
        try {
            switch (dropdown) {
                case dropdowns.direction:
                    this._setValueProperties('direction', value)
                    this.setState({
                        valueDirection: value
                    })
                    break;
                case dropdowns.direction_balcony:
                    this._setValueProperties('direction_balcony', value)
                    this.setState({
                        valueDirectionBalcony: value
                    })
                    break;
                case dropdowns.juridical:
                    this._setValueProperties('juridical', value)
                    this.setState({
                        valueJuridical: value
                    })
                    break;
                case dropdowns.furniture:
                    this._setValueProperties('furniture', value)
                    this.setState({
                        valueFurniture: value
                    })
                    break;
                default:
                    break;
            }
        } catch (error) {
         //   alert(error)
        }
    }

    _changeValueAmount(amount, action) {
        try {
            switch (amount) {
                case amounts.floors:
                    switch (action) {
                        case actions.increase:
                            var valueFloors = this.state.valueFloors + 1
                            this._setValueProperties('floors', parseInt(valueFloors))
                            this.setState({ valueFloors })
                            break;
                        case actions.decrease:
                            var valueFloors = this.state.valueFloors - 1
                            this._setValueProperties('floors', parseInt(valueFloors))
                            this.setState({ valueFloors })
                            break;
                        default:
                            break;
                    }
                    break;
                case amounts.beds:
                    switch (action) {
                        case actions.increase:
                            var valueBeds = this.state.valueBeds + 1
                            this._setValueProperties('beds', parseInt(valueBeds))
                            this.setState({ valueBeds })
                            break;
                        case actions.decrease:
                            var valueBeds = this.state.valueBeds - 1
                            this._setValueProperties('beds', parseInt(valueBeds))
                            this.setState({ valueBeds })
                            break;
                        default:
                            break;
                    }
                    break;
                case amounts.baths:
                    switch (action) {
                        case actions.increase:
                            var valueBaths = this.state.valueBaths + 1
                            this._setValueProperties('baths', parseInt(valueBaths))
                            this.setState({ valueBaths })
                            break;
                        case actions.decrease:
                            var valueBaths = this.state.valueBaths - 1
                            this._setValueProperties('baths', parseInt(valueBaths))
                            this.setState({ valueBaths })
                            break;
                        default:
                            break;
                    }
                    break;
                case amounts.toilets:
                    switch (action) {
                        case actions.increase:
                            var valueToilets = this.state.valueToilets + 1
                            this._setValueProperties('toilets', parseInt(valueToilets))
                            this.setState({ valueToilets })
                            break;
                        case actions.decrease:
                            var valueToilets = this.state.valueToilets - 1
                            this._setValueProperties('toilets', parseInt(valueToilets))
                            this.setState({ valueToilets })
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    break;
            }
        } catch (error) {
         //   alert(error)
        }
    }

    _setValueProperties(key, value) {
        try {
            this.properties[key] = value
            this.props.onRecieverValueProduct(this.properties)
        } catch (error) {
         //   alert(error)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerProperty}>
                    <Text style={styles.txtProperties}>• Hướng nhà</Text>
                    <Picker
                        modalStyle={styles.modalPicker}
                        headerStyle={styles.headerPicker}
                        itemStyle={styles.itemModal}
                        headerBackButtonTextStyle={styles.headerBackModal}
                        headerTitleStyle={styles.headerTitleModal}
                        iosHeader="Chọn"
                        headerBackButtonText="Trở lại"
                        iosIcon={<Ionicons name="ios-arrow-down" size={24} color="rgba(0,0,0,0.8)" />}
                        placeholder="Chọn"
                        placeholderIconColor={"rgba(0,0,0,0.5)"}
                        placeholderStyle={{ color: "rgba(0,0,0,0.8)", fontSize: 14 }}
                        mode="dialog"
                        style={{ maxWidth: 140 }}
                        textStyle={styles.textPicker}
                        itemTextStyle={styles.textPicker}
                        selectedValue={this.state.valueDirection}
                        onValueChange={value => this._changeValueDropDown(value, dropdowns.direction)}
                    >
                        <Picker.Item label="Chọn" value={null} />
                        <Picker.Item label="Đông" value="Đông" />
                        <Picker.Item label="Tây" value="Tây" />
                        <Picker.Item label="Nam" value="Nam" />
                        <Picker.Item label="Bắc" value="Bắc" />
                        <Picker.Item label="Đông Bắc" value="Đông Bắc" />
                        <Picker.Item label="Đông Nam" value="Đông Nam" />
                        <Picker.Item label="Tây Bắc" value="Tây Bắc" />
                        <Picker.Item label="Tây Nam" value="Tây Nam" />
                    </Picker>
                </View>
                <View style={styles.containerProperty}>
                    <Text style={styles.txtProperties}>• Hướng ban công</Text>
                    <Picker
                        modalStyle={styles.modalPicker}
                        headerStyle={styles.headerPicker}
                        itemStyle={styles.itemModal}
                        headerBackButtonTextStyle={styles.headerBackModal}
                        headerTitleStyle={styles.headerTitleModal}
                        iosHeader="Chọn"
                        headerBackButtonText="Trở lại"
                        iosIcon={<Ionicons name="ios-arrow-down" size={24} color="rgba(0,0,0,0.8)" />}
                        placeholder="Chọn"
                        placeholderIconColor={"rgba(0,0,0,0.5)"}
                        placeholderStyle={{ color: "rgba(0,0,0,0.8)", fontSize: 14 }}
                        mode="dialog"
                        style={{ maxWidth: 140 }}
                        textStyle={styles.textPicker}
                        itemTextStyle={styles.textPicker}
                        selectedValue={this.state.valueDirectionBalcony}
                        onValueChange={value => this._changeValueDropDown(value, dropdowns.direction_balcony)}
                    >
                        <Picker.Item label="Chọn" value={null} />
                        <Picker.Item label="Đông" value="Đông" />
                        <Picker.Item label="Tây" value="Tây" />
                        <Picker.Item label="Nam" value="Nam" />
                        <Picker.Item label="Bắc" value="Bắc" />
                        <Picker.Item label="Đông Bắc" value="Đông Bắc" />
                        <Picker.Item label="Đông Nam" value="Đông Nam" />
                        <Picker.Item label="Tây Bắc" value="Tây Bắc" />
                        <Picker.Item label="Tây Nam" value="Tây Nam" />
                    </Picker>
                </View>
                <View style={[styles.containerProperty, {
                    paddingVertical: 8
                }]}>
                    <Text style={styles.txtProperties}>• Số tầng</Text>
                    <TouchableOpacity
                        style={[styles.btnDecrease, {
                            borderColor: this.state.valueFloors > 0 ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0,0,0,0.2)'
                        }]}
                        onPress={() => this.state.valueFloors > 0 ?
                            this._changeValueAmount(amounts.floors, actions.decrease) : null}>
                        <Text style={{ color: this.state.valueFloors > 0 ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0,0,0,0.2)' }}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.txtAmounts}>{this.state.valueFloors}</Text>
                    <TouchableOpacity style={styles.btnIncrease}
                        onPress={() => this._changeValueAmount(amounts.floors, actions.increase)}>
                        <Text>+</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.containerProperty, {
                    paddingVertical: 8
                }]}>
                    <Text style={styles.txtProperties}>• Số phòng ngủ</Text>
                    <TouchableOpacity
                        style={[styles.btnDecrease, {
                            borderColor: this.state.valueBeds > 0 ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0,0,0,0.2)'
                        }]}
                        onPress={() => this.state.valueBeds > 0 ?
                            this._changeValueAmount(amounts.beds, actions.decrease) : null}>
                        <Text style={{ color: this.state.valueBeds > 0 ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0,0,0,0.2)' }}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.txtAmounts}>{this.state.valueBeds}</Text>
                    <TouchableOpacity style={styles.btnIncrease}
                        onPress={() => this._changeValueAmount(amounts.beds, actions.increase)}>
                        <Text>+</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.containerProperty, {
                    paddingVertical: 8
                }]}>
                    <Text style={styles.txtProperties}>• Số phòng tắm</Text>
                    <TouchableOpacity
                        style={[styles.btnDecrease, {
                            borderColor: this.state.valueBaths > 0 ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0,0,0,0.2)'
                        }]}
                        onPress={() => this.state.valueBaths > 0 ?
                            this._changeValueAmount(amounts.baths, actions.decrease) : null}>
                        <Text style={{ color: this.state.valueBaths > 0 ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0,0,0,0.2)' }}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.txtAmounts}>{this.state.valueBaths}</Text>
                    <TouchableOpacity style={styles.btnIncrease}
                        onPress={() => this._changeValueAmount(amounts.baths, actions.increase)}>
                        <Text>+</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.containerProperty, {
                    paddingVertical: 8
                }]}>
                    <Text style={styles.txtProperties}>• Số WC</Text>
                    <TouchableOpacity
                        style={[styles.btnDecrease, {
                            borderColor: this.state.valueToilets > 0 ? 'rgba(0, 0, 0, 0.8)' : 'rgba(200, 200, 218, 1)'
                        }]}
                        onPress={() => this.state.valueToilets > 0 ?
                            this._changeValueAmount(amounts.toilets, actions.decrease) : null}>
                        <Text style={{ color: this.state.valueToilets > 0 ? 'rgba(0, 0, 0, 0.8)' : 'rgba(200, 200, 218, 1)' }}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.txtAmounts}>{this.state.valueToilets}</Text>
                    <TouchableOpacity style={styles.btnIncrease}
                        onPress={() => this._changeValueAmount(amounts.toilets, actions.increase)}>
                        <Text>+</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.containerProperty, {
                    paddingVertical: 8
                }]}>
                    <Text style={styles.txtProperties}>• Mặt tiền</Text>
                    <LinearGradient
                        style={{
                            backgroundColor: 'aliceblue',
                            borderRadius: 2,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                        locations={[0, 0.15, 0.15]}
                        colors={['rgba(200, 200, 218, 0.25)', 'rgba(200, 200, 218, 0.005)', 'aliceblue']}
                    >
                        <TextInput style={styles.inputWide}
                            placeholder="m²"
                            value={this.state.valueFacade}
                            onChangeText={(text) => {
                                this._setValueProperties('facade', text)
                                this.setState({ valueFacade: text })
                            }}
                            returnKeyType="done"
                            keyboardType="numeric"
                            maxLength={5}
                        />
                    </LinearGradient>
                </View>
                <View style={[styles.containerProperty, {
                    paddingVertical: 8
                }]}>
                    <Text style={{
                        flex: 1,
                        fontSize: 14,
                        color: 'rgba(0,0,0,0.8)'
                    }}>• Đường trước nhà rộng</Text>
                    <LinearGradient
                        style={{
                            backgroundColor: 'aliceblue',
                            borderRadius: 2,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                        locations={[0, 0.15, 0.15]}
                        colors={['rgba(200, 200, 218, 0.25)', 'rgba(200, 200, 218, 0.005)', 'aliceblue']}
                    >
                        <TextInput style={styles.inputWide}
                            placeholder="m²"
                            value={this.state.valueRoadWide}
                            onChangeText={(text) => {
                                this._setValueProperties('road_wide', text)
                                this.setState({ valueRoadWide: text })
                            }}
                            returnKeyType="done"
                            keyboardType="numeric"
                            maxLength={5}
                        />
                    </LinearGradient>
                </View>
                <View style={styles.containerProperty}>
                    <Text style={styles.txtProperties}>• Pháp lý</Text>
                    <Picker
                        modalStyle={styles.modalPicker}
                        headerStyle={styles.headerPicker}
                        itemStyle={styles.itemModal}
                        headerBackButtonTextStyle={styles.headerBackModal}
                        headerTitleStyle={styles.headerTitleModal}
                        iosHeader="Chọn"
                        headerBackButtonText="Trở lại"
                        iosIcon={<Ionicons name="ios-arrow-down" size={24} color="rgba(0,0,0,0.8)" />}
                        placeholder="Chọn"
                        placeholderIconColor={"rgba(0,0,0,0.5)"}
                        placeholderStyle={{ color: "rgba(0,0,0,0.8)", fontSize: 14 }}
                        mode="dialog"
                        style={{ maxWidth: 140 }}
                        textStyle={styles.textPicker}
                        itemTextStyle={styles.textPicker}
                        selectedValue={this.state.valueJuridical}
                        onValueChange={value => this._changeValueDropDown(value, dropdowns.juridical)}
                    >
                        <Picker.Item label="Chọn" value={null} />
                        <Picker.Item label="Sổ đỏ" value="Sổ đỏ" />
                        <Picker.Item label="Sổ hồng" value="Sổ hồng" />
                        <Picker.Item label="Sổ trắng" value="Sổ trắng" />
                        <Picker.Item label="Giấy chứng nhận" value="Giấy chứng nhận" />
                    </Picker>
                </View>
                <View style={styles.containerProperty}>
                    <Text style={styles.txtProperties}>• Nội thất</Text>
                    <Picker
                        modalStyle={styles.modalPicker}
                        headerStyle={styles.headerPicker}
                        itemStyle={styles.itemModal}
                        headerBackButtonTextStyle={styles.headerBackModal}
                        headerTitleStyle={styles.headerTitleModal}
                        iosHeader="Chọn"
                        headerBackButtonText="Trở lại"
                        iosIcon={<Ionicons name="ios-arrow-down" size={24} color="rgba(0,0,0,0.8)" />}
                        placeholder="Chọn"
                        placeholderIconColor={"rgba(0,0,0,0.5)"}
                        placeholderStyle={{ color: "rgba(0,0,0,0.8)", fontSize: 14 }}
                        mode="dialog"
                        style={{ maxWidth: 140 }}
                        textStyle={styles.textPicker}
                        itemTextStyle={styles.textPicker}
                        selectedValue={this.state.valueFurniture}
                        onValueChange={value => this._changeValueDropDown(value, dropdowns.furniture)}
                    >
                        <Picker.Item label="Chọn" value={null} />
                        <Picker.Item label="Không có" value="Không có" />
                        <Picker.Item label="Cơ bản" value="Cơ bản" />
                        <Picker.Item label="Đầy đủ" value="Đầy đủ" />
                    </Picker>
                </View>
            </View >
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
    },
    containerProperty: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.3,
        borderColor: 'rgba(0,0,0,0.2)'
    },
    txtProperties: {
        flex: 1,
        fontSize: 14,
        color: 'rgba(0,0,0,0.8)'
    },
    inputWide: {
        color: 'rgba(0,0,0,0.8)',
        borderRadius: 2,
        padding: 5,
        width: 130,
        height: 30,
        textAlign: 'center'
    },
    btnDecrease: {
        borderWidth: 1,
        borderColor: 'rgba(200, 200, 218, 1)',
        color: 'rgba(0,0,0,0.8)',
        borderTopLeftRadius: 2,
        borderBottomLeftRadius: 2,
        borderEndWidth: 0,
        padding: 5,
        height: 30,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnIncrease: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.8)',
        color: 'rgba(0,0,0,0.8)',
        borderTopRightRadius: 2,
        borderBottomRightRadius: 2,
        borderStartWidth: 0,
        padding: 5,
        width: 40,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtAmounts: {
        color: 'rgba(0,0,0,0.8)',
        paddingVertical: 5,
        width: 50,
        height: 30,
        textAlign: 'center',
        borderColor: 'rgba(0,0,0,0.8)',
        borderWidth: 0.5
    }
})

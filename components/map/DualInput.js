import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput } from 'react-native'
import Utilities from '../../utils/Utilities';

let txtValue = "";
export default class DualInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minValue: global.dataFilterTemp["min_" + this.props.keyWord]
                ? String(
                    this.props.keyWord === "price"
                        ?
                        global.dataFilterTemp["min_" + this.props.keyWord] / 1000000
                        :
                        global.dataFilterTemp["min_" + this.props.keyWord]
                )
                : "",
            maxValue: global.dataFilterTemp["max_" + this.props.keyWord]
                ?
                String(
                    this.props.keyWord === "price"
                        ?
                        global.dataFilterTemp["max_" + this.props.keyWord] / 1000000
                        :
                        global.dataFilterTemp["max_" + this.props.keyWord]
                )
                : "",
            value: txtValue !== "" ? txtValue : "Bất kỳ"
        }
    }

    componentWillUnmount(){
        this.props.onRef(undefined)
    }

    componentDidMount() {
        try {
            this.props.onRef(this)

            var min = global.dataFilterTemp["min_" + this.props.keyWord]
                ? String(this.props.keyWord === "price"
                    ? global.dataFilterTemp["min_" + this.props.keyWord] / 1000000
                    : global.dataFilterTemp["min_" + this.props.keyWord])
                : ""

            var max = global.dataFilterTemp["max_" + this.props.keyWord]
                ?
                String(this.props.keyWord === "price"
                    ? global.dataFilterTemp["max_" + this.props.keyWord] / 1000000
                    : global.dataFilterTemp["max_" + this.props.keyWord])
                : ""

            var value = "Bất kỳ"
            if (this.props.keyWord === "price") {
                value = Utilities._handlePrice(min, max)
            } else {
                value = this._handleValue(min, max)
            }

            this.setState({
                minValue: min,
                maxValue: max,
                value
            })
        } catch (error) {
          //  alert(error)
        }
    }

    onReset() {
        this.setState({
            minValue: "",
            maxValue: "",
            value: "Bất kỳ"
        })
    }

    _handleChangeMinValue(minValue) {
        try {
            var min = minValue
            var max = this.state.maxValue

            if (!isNaN(min)) {
                if (max === "" || isNaN(max)) {
                    global.dataFilterTemp["min_" + this.props.keyWord]
                        = this.props.keyWord === "price" ? parseInt(min) * 1000000 : parseInt(min)

                    delete global.dataFilterTemp["max_" + this.props.keyWord]
                } else {
                    if (parseInt(min) > parseInt(max)) {
                        global.dataFilterTemp["max_" + this.props.keyWord]
                            = this.props.keyWord === "price" ? parseInt(min) * 1000000 : parseInt(min)
                        global.dataFilterTemp["min_" + this.props.keyWord]
                            = this.props.keyWord === "price" ? parseInt(max) * 1000000 : parseInt(max)
                    } else {
                        global.dataFilterTemp["min_" + this.props.keyWord]
                            = this.props.keyWord === "price" ? parseInt(min) * 1000000 : parseInt(min)
                        global.dataFilterTemp["max_" + this.props.keyWord]
                            = this.props.keyWord === "price" ? parseInt(max) * 1000000 : parseInt(max)
                    }
                }
            }

            var value = "Bất kỳ"

            if (this.props.keyWord === "price") {
                value = Utilities._handlePrice(min, max)
            } else {
                value = this._handleValue(min, max)
            }

            this.setState({
                minValue,
                value
            })
        } catch (error) {
          //  alert(error)
        }
    }

    _handleChangeMaxValue(maxValue) {
        try {
            global.dataFilterTemp["max_" + this.props.keyWord] = maxValue
            var min = this.state.minValue
            var max = maxValue

            if (!isNaN(max)) {
                if (min === "" || isNaN(min)) {
                    global.dataFilterTemp["max_" + this.props.keyWord]
                        = this.props.keyWord === "price" ? parseInt(max) * 1000000 : parseInt(max)

                    delete global.dataFilterTemp["min_" + this.props.keyWord]
                } else {
                    if (parseInt(min) > parseInt(max)) {
                        global.dataFilterTemp["max_" + this.props.keyWord]
                            = this.props.keyWord === "price" ? parseInt(min) * 1000000 : parseInt(min)
                        global.dataFilterTemp["min_" + this.props.keyWord]
                            = this.props.keyWord === "price" ? parseInt(max) * 1000000 : parseInt(max)
                    } else {
                        global.dataFilterTemp["min_" + this.props.keyWord]
                            = this.props.keyWord === "price" ? parseInt(min) * 1000000 : parseInt(min)
                        global.dataFilterTemp["max_" + this.props.keyWord]
                            = this.props.keyWord === "price" ? parseInt(max) * 1000000 : parseInt(max)
                    }
                }
            }

            var value = "Bất kỳ"

            if (this.props.keyWord === "price") {
                value = Utilities._handlePrice(min, max)
            } else {
                value = this._handleValue(min, max)
            }

            this.setState({
                maxValue,
                value
            })
        } catch (error) {
          //  alert(error)
        }
    }

    _handleValue(min, max) {
        try {
            var value = ""
            if (max === "") {
                if (min === "") {
                    value = "Bất kỳ"
                } else {
                    value = "Trên " + parseInt(min) + " " + this.props.unit
                }
            } else {
                if (min === "") {
                    value = "Dưới " + parseInt(max) + " " + this.props.unit
                } else {
                    var minTemp = min
                    var maxTemp = max

                    if (parseInt(min) > parseInt(max)) {
                        minTemp = max
                        maxTemp = min
                    }

                    value = (parseInt(minTemp) === 0 ? "Dưới " : "Từ " + minTemp + " - ") + maxTemp + " " + this.props.unit
                }
            }
            return value
        } catch (error) {
            return "Bất kỳ"
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextState === this.state){
            return false
        }
        return true
    }

    render() {
        return (
            <View>
                <View style={{
                    flexDirection: 'row',
                    marginTop: 20
                }}>
                    <Text style={{
                        fontSize: 13,
                        marginStart: 16,
                        color: 'rgba(0,0,0,0.8)',
                        flex: 1
                    }}>{this.props.title}</Text>
                    <Text style={{
                        fontSize: 13,
                        marginEnd: 16,
                        color: 'rgba(0,0,0,0.8)'
                    }}>{this.state.value}</Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginHorizontal: 16,
                    height: 45,
                    marginTop: 5
                }}>
                    <TextInput style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0.3)',
                        // height: 45,
                        textAlign: 'center',
                        color: 'rgba(0,0,0,0.8)',
                        fontSize: 15
                    }}
                        returnKeyType="done"
                        keyboardType={"numeric"}
                        value={this.state.minValue}
                        placeholder={"Từ..."}
                        onChangeText={(text) => this._handleChangeMinValue(text)}
                    />
                    <Text style={{
                        marginHorizontal: 20,
                        marginTop: 15,
                        color: 'rgba(0,0,0,0.8)',
                        fontSize: 12
                    }}>-</Text>
                    <TextInput style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0.3)',
                        // height: 45,
                        textAlign: 'center',
                        color: 'rgba(0,0,0,0.8)',
                        fontSize: 15
                    }}
                        returnKeyType="done"
                        keyboardType={"numeric"}
                        value={this.state.maxValue}
                        placeholder={"Đến..."}
                        onChangeText={(text) => this._handleChangeMaxValue(text)}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({})

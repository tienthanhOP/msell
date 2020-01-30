import React, { Component } from 'react'
import {
    Text, StyleSheet, View, Dimensions,
    TouchableOpacity
} from 'react-native'
import Utilities from '../../utils/Utilities';

const { width, height } = Dimensions.get('window')

export default class DualSilder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: global.dataFilterTemp["min_" + this.props.keyWord] ?
                global.dataFilterTemp["min_" + this.props.keyWord] : this.props.minValue
        }
        this._increase = this._increase.bind(this)
        this._decrease = this._decrease.bind(this)
    }

    onReset() {
        this.setState({
            value: this.props.minValue
        })
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    _increase() {
        if (this.state.value < this.props.maxValue) {
            this._changeValue(this.state.value + 1)
        }
    }

    _decrease() {
        if (this.state.value > this.props.minValue) {
            this._changeValue(this.state.value - 1)
        }
    }

    _changeValue(value) {
        var key = this.props.keyWord

        global.dataFilterTemp["min_" + key] = value

        this.setState({
            value
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState === this.state) {
            return false
        }
        return true
    }

    render() {
        var disableIncrease = false
        var disableDecrease = false

        if (this.state.value == this.props.minValue) {
            disableDecrease = true
        }

        if (this.state.value == this.props.maxValue) {
            disableIncrease = true
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.title}</Text>
                <View style={styles.multiSlider}>
                    <TouchableOpacity style={{
                        height: 45,
                        width: 70,
                        borderColor: 'rgba(0,0,0,0.3)',
                        borderWidth: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                        activeOpacity={disableDecrease ? 1 : 0.2}
                        onPress={() => {
                            disableDecrease ? null : this._decrease()
                        }}
                    >
                        <Text style={{
                            color: 'rgba(0,0,0,0.8)',
                            fontSize: 28,
                            opacity: disableDecrease ? 0.5 : 1
                        }}>-</Text>
                    </TouchableOpacity>
                    <View style={{
                        flex: 1,
                        borderColor: 'rgba(0,0,0,0.3)',
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            color: 'rgba(0,0,0,0.8)',
                            fontSize: 15
                        }}>{this.state.value == 0 ? "Bất kỳ" : (this.state.value + "+")}</Text>
                    </View>
                    <TouchableOpacity style={{
                        height: 45,
                        width: 70,
                        borderColor: 'rgba(0,0,0,0.3)',
                        borderWidth: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                        activeOpacity={disableIncrease ? 1 : 0.2}
                        onPress={() => {
                            disableIncrease ? null : this._increase()
                        }}
                    >
                        <Text style={{
                            color: 'rgba(0,0,0,0.8)',
                            fontSize: 28,
                            opacity: disableIncrease ? 0.2 : 1
                        }}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16
    },
    title: {
        marginTop: 20,
        fontSize: 13,
        flex: 1,
        color: 'rgba(0,0,0,0.8)'
    },
    txtRange: {
        fontSize: 12,
        color: 'rgba(0,0,0,0.8)'
    },
    multiSlider: {
        marginTop: 5,
        flexDirection: 'row'
    },
    selectedStyle: {
        backgroundColor: "green",
        height: 4,
        marginTop: -2
    },
    unselectedStyle: {
        backgroundColor: "white",
        height: 2,
        marginTop: -1
    },
    thumb: {
        marginTop: 12,
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: 'white',
        backgroundColor: "green",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.3,
        elevation: 5,
        color: 'rgba(0,0,0,0.8)'
    },
    txtThumb: {
        fontSize: 9,
        color: "rgba(0,0,0,0.8)",
        alignSelf: 'center',
        textAlign: 'center',
        color: 'rgba(0,0,0,0.8)'
    }
})

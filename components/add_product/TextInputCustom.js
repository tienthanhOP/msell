import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Utilities from '../../utils/Utilities';
import LinearGradient from 'react-native-linear-gradient';

export default class TextInputCustom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0,
            error: null,
            text: ""
        }
        this._onTextChange = this._onTextChange.bind(this)
        this.onFocus = this.onFocus.bind(this)
        this.onBlur = this.onBlur.bind(this)
    }

    componentDidMount() {
        if (this.props.valueEdit) {
            this.setState({
                text: this.props.valueEdit,
                count: this.props.valueEdit.length
            })
        }
        this.props.onRef(this)
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    reciverError(message) {
        try {
            Utilities.showToast(message)
            this.input.focus()
        } catch (error) {
         //   alert(error.message)
        }
    }

    onFocus() {
        try {
            this.setState({
                borderColor: 'blue'
            })
        } catch (error) {
        }
    }

    onBlur() {
        try {
            if (this.props.minLength ? (this.state.text.trim().length < this.props.minLength) : false) {
                this.setState({
                    error: "Bạn phải nhập tối thiểu " + this.props.minLength + " ký tự!"
                })
            } else {
                this.setState({
                    error: null
                })
            }
        } catch (error) {
         //   alert(error)
        }
    }

    _onTextChange(text) {
        try {
            this.props.onRecieverValueProduct(text)
            if (this.props.minLength ? (text.trim().length < this.props.minLength) : false) {
                this.setState({
                    text,
                    count: text.length
                })
            } else {
                this.setState({
                    text,
                    count: text.length,
                    error: null
                })
            }
        } catch (error) {
         //   alert(error)
        }
    }

    render() {
        const { style, maxLength } = this.props
        return (
            <View style={style}>
                <LinearGradient
                    style={{
                        backgroundColor: 'aliceblue',
                        borderRadius: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: style.height ? style.height : null,
                        flexDirection: 'row',
                        borderRadius: 3
                    }}
                    locations={[0, 0.15, 0.15]}
                    colors={['rgba(200, 200, 218, 0.25)', 'rgba(200, 200, 218, 0.005)', 'aliceblue']}
                >
                    <TextInput
                        value={this.state.text}
                        ref={ref => (this.input = ref)}
                        autoCorrect={false}
                        returnKeyType="done"
                        onBlur={() => this.onBlur()}
                        {...this.props}
                        style={{
                            flex: 1,
                            padding: 10
                        }}
                        onChangeText={(text) => this._onTextChange(text)}
                    />
                    <Text style={{
                        position: 'absolute',
                        right: 2,
                        bottom: 2,
                        fontSize: 8,
                        color: 'rgba(0,0,0,0.5)'
                    }}>{this.state.count}/{maxLength}</Text>
                </LinearGradient>
                {
                    this.state.error ?
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 3
                        }}>
                            <MaterialIcons name="error" color="red" size={13} />
                            <Text
                                style={{
                                    marginStart: 3,
                                    fontSize: 10,
                                    color: 'red'
                                }}>{this.state.error}</Text>
                        </View>
                        : null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({})

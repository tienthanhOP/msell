import React, { Component } from 'react'
import {
    Text, StyleSheet, View, Alert,
    TextInput, TouchableOpacity
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import LinearGradient from 'react-native-linear-gradient';
import Utilities from '../../utils/Utilities';
import Hash from 'hash.js';
import * as Constants from '../../constants/Constants';
import Toolbar from './Toolbar';

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            new_password: "",
            confirm_new_password: "",
            code: ""
        }
    }

    _setNewPassword() {
        try {
            if (this.state.new_password === "") {
                Utilities.showToast("Bạn chưa nhập mật khẩu")
                this.input_new_password.focus()
                return
            } else if (this.state.new_password.length < 5) {
                Utilities.showToast("Mật khẩu tối thiểu 5 ký tự")
                this.input_new_password.focus()
                return
            }

            if (this.state.confirm_new_password === "") {
                Utilities.showToast("Bạn chưa nhập mật khẩu xác thực")
                this.input_confirm_new_password.focus()
                return
            } else if (this.state.new_password !== this.state.confirm_new_password) {
                Utilities.showToast("Xác thực mật khẩu mới không đúng")
                this.input_confirm_new_password.focus()
                return
            }

            if (this.state.code === "") {
                Utilities.showToast("Bạn chưa nhập mã xác thực")
                this.code.focus()
                return
            } else if (this.state.code.length !== 6) {
                Utilities.showToast("Mã xác thực phải bao gồm 6 ký tự")
                this.input_code.focus()
                return
            }

            this.props.forgotPasswordAction({
                email: this.props.email,
                code: this.state.code,
                new_password: Hash.sha256().update(this.state.new_password).digest('hex')
            })
        } catch (error) {
            
        }
    }

    _resendEmail() {
        try {
            this.props.sendEmailAction(this.props.email, Constants.SEND_EMAIL_FORGOT_PASSWORD)
        } catch (error) {

        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white'
            }}>
                <Toolbar title="Mật khẩu mới" />

                <Text style={{
                    marginTop: 30,
                    color: 'black',
                    fontSize: 14,
                    textAlign: 'center',
                    marginHorizontal: 50
                }}>Đặt lại mật khẩu của bạn</Text>

                <LinearGradient
                    style={{
                        backgroundColor: 'aliceblue',
                        marginTop: 5,
                        marginHorizontal: 24,
                        borderRadius: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 30
                    }}
                    locations={[0, 0.15, 0.15]}
                    colors={['rgba(200, 200, 218, 0.25)', 'rgba(200, 200, 218, 0.005)', 'aliceblue']}
                >
                    <TextInput
                        ref={ref => { this.input_new_password = ref }}
                        placeholder="Mật khẩu mới"
                        returnKeyType="done"
                        secureTextEntry={true}
                        style={{
                            flex: 1,
                            height: 50,
                            borderRadius: 5,
                            padding: 8,
                            color: 'black'
                        }}
                        maxLength={30}
                        value={this.state.new_password}
                        onChangeText={(text) => this.setState({ new_password: text })}
                    />
                </LinearGradient>

                <LinearGradient
                    style={{
                        backgroundColor: 'aliceblue',
                        marginTop: 5,
                        marginHorizontal: 24,
                        borderRadius: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 16
                    }}
                    locations={[0, 0.15, 0.15]}
                    colors={['rgba(200, 200, 218, 0.25)', 'rgba(200, 200, 218, 0.005)', 'aliceblue']}
                >
                    <TextInput
                        ref={ref => { this.input_confirm_new_password = ref }}
                        placeholder="Xác thực mật khẩu mới"
                        secureTextEntry={true}
                        returnKeyType="done"
                        style={{
                            flex: 1,
                            height: 50,
                            borderRadius: 5,
                            padding: 8,
                            color: 'black'
                        }}
                        maxLength={30}
                        value={this.state.confirm_new_password}
                        onChangeText={(text) => this.setState({ confirm_new_password: text })}
                    />
                </LinearGradient>

                <View style={{
                    marginTop: 16,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <LinearGradient
                        style={{
                            backgroundColor: 'aliceblue',
                            marginHorizontal: 24,
                            borderRadius: 5,
                            flexDirection: 'row',
                            alignItems: 'center',
                            flex: 1
                        }}
                        locations={[0, 0.15, 0.15]}
                        colors={['rgba(200, 200, 218, 0.25)', 'rgba(200, 200, 218, 0.005)', 'aliceblue']}
                    >
                        <TextInput
                            ref={ref => { this.input_code = ref }}
                            placeholder="Mã xác thực"
                            returnKeyType="done"
                            style={{
                                flex: 1,
                                height: 50,
                                borderRadius: 5,
                                marginEnd: 8,
                                padding: 8,
                                color: 'black'
                            }}
                            maxLength={6}
                            value={this.state.code}
                            onChangeText={(text) => this.setState({ code: text })}
                        />
                    </LinearGradient>

                    <TouchableOpacity
                        onPress={() => this._resendEmail()}>
                        <Text style={{
                            marginEnd: 24,
                            fontSize: 11,
                            color: "#4285F4",
                            fontWeight: 'bold'
                        }}>NHẬN LẠI MÃ</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={() => this._setNewPassword()}
                    style={{
                        borderRadius: 5,
                        marginTop: 30,
                        height: 50,
                        marginHorizontal: 16,
                        backgroundColor: 'red',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Text style={{
                        color: 'white',
                        fontSize: 18,
                        fontWeight: '500'
                    }}>ĐẶT LẠI MẬT KHẨU</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({})

import React, { Component } from 'react'
import {
    Text, StyleSheet, View, Alert,
    TextInput, TouchableOpacity
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Utilities from '../../utils/Utilities';
import Hash from 'hash.js';
import Toolbar from './Toolbar';

export default class ChangePassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            password: "",
            new_password: "",
            confirm_new_password: ""
        }
    }

    _handleChangePassword() {
        try {
            if (this.state.password.trim() === "") {
                this.password.focus()
                Utilities.showToast("Bạn chưa nhập mật khẩu")
                return
            } else {
                if (this.state.password.trim().length < 5) {
                    this.password.focus()
                    Utilities.showToast("Mật khẩu tối thiểu 5 ký tự")
                    return
                }
            }

            if (this.state.new_password.trim() === "") {
                this.new_password.focus()
                Utilities.showToast("Bạn chưa nhập mật khẩu mới")
                return
            } else {
                if (this.state.new_password.trim().length < 5) {
                    this.password.focus()
                    Utilities.showToast("Mật khẩu tối thiểu 5 ký tự")
                    return
                }
            }

            if (this.state.confirm_new_password.trim() === "") {
                this.confirm_new_password.focus()
                Utilities.showToast("Bạn chưa nhập lại mật khẩu mới")
                return
            } else {
                if (this.state.new_password !== this.state.confirm_new_password) {
                    this.confirm_new_password.focus()
                    Utilities.showToast("Mật khẩu nhập lại không giống mật khẩu mới")
                    return
                }
            }

            this.props.updateUserInfoAction({
                password: Hash.sha256().update(this.state.password.trim()).digest('hex'),
                new_password: Hash.sha256().update(this.state.new_password.trim()).digest('hex')
            }, true)
        } catch (error) {

        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white'
            }}>
                <Toolbar title={"Thay đổi mật khẩu"} />

                <KeyboardAwareScrollView>
                    <Text style={{
                        marginTop: 50,
                        marginStart: 24,
                        color: 'black',
                        fontSize: 14
                    }}>Xác thực mật khẩu</Text>
                    <LinearGradient
                        style={{
                            backgroundColor: 'aliceblue',
                            marginTop: 5,
                            marginHorizontal: 24,
                            borderRadius: 5,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                        locations={[0, 0.15, 0.15]}
                        colors={['rgba(200, 200, 218, 0.25)', 'rgba(200, 200, 218, 0.005)', 'aliceblue']}
                    >
                        <TextInput
                            ref={ref => (this.password = ref)}
                            placeholder="Nhập mật khẩu"
                            returnKeyType="done"
                            style={{
                                flex: 1,
                                height: 50,
                                borderRadius: 5,
                                paddingHorizontal: 12,
                                color: 'black'
                            }}
                            secureTextEntry
                            maxLength={50}
                            value={this.state.password}
                            onChangeText={(text) => this.setState({ password: text })}
                        />
                    </LinearGradient>

                    <Text style={{
                        marginTop: 16,
                        marginStart: 24,
                        color: 'black',
                        fontSize: 14
                    }}>Mật khẩu mới</Text>
                    <LinearGradient
                        style={{
                            backgroundColor: 'aliceblue',
                            marginTop: 5,
                            marginHorizontal: 24,
                            borderRadius: 5,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                        locations={[0, 0.15, 0.15]}
                        colors={['rgba(200, 200, 218, 0.25)', 'rgba(200, 200, 218, 0.005)', 'aliceblue']}
                    >
                        <TextInput
                            ref={ref => (this.new_password = ref)}
                            placeholder="Nhập mật khẩu mới"
                            returnKeyType="done"
                            style={{
                                flex: 1,
                                height: 50,
                                borderRadius: 5,
                                paddingHorizontal: 12,
                                color: 'black'
                            }}
                            secureTextEntry
                            maxLength={50}
                            value={this.state.new_password}
                            onChangeText={(text) => this.setState({ new_password: text })}
                        />
                    </LinearGradient>

                    <Text style={{
                        marginTop: 16,
                        marginStart: 24,
                        color: 'black',
                        fontSize: 14
                    }}>Nhập lại mật khẩu mới</Text>
                    <LinearGradient
                        style={{
                            backgroundColor: 'aliceblue',
                            marginTop: 5,
                            marginHorizontal: 24,
                            borderRadius: 5,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                        locations={[0, 0.15, 0.15]}
                        colors={['rgba(200, 200, 218, 0.25)', 'rgba(200, 200, 218, 0.005)', 'aliceblue']}
                    >
                        <TextInput
                            ref={ref => (this.confirm_new_password = ref)}
                            placeholder="Nhập lại mật khẩu mới"
                            returnKeyType="done"
                            style={{
                                flex: 1,
                                height: 50,
                                borderRadius: 5,
                                paddingHorizontal: 12,
                                color: 'black'
                            }}
                            secureTextEntry
                            maxLength={50}
                            value={this.state.confirm_new_password}
                            onChangeText={(text) => this.setState({ confirm_new_password: text })}
                        />
                    </LinearGradient>

                    <TouchableOpacity
                        style={{
                            borderRadius: 5,
                            marginTop: 50,
                            height: 50,
                            marginHorizontal: 24,
                            backgroundColor: 'red',
                            justifyContent: 'center',
                            alignItems: 'center',
                            shadowOffset: { width: 0, height: 1 },
                            shadowRadius: 2,
                            shadowOpacity: 0.2,
                            elevation: 2
                        }}
                        onPress={() => this._handleChangePassword()}
                    >
                        <Text style={{
                            color: 'white',
                            fontSize: 18,
                            fontWeight: '500',
                            textTransform: 'uppercase'
                        }}>Đổi mật khẩu</Text>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({})

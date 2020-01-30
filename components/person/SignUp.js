import React, { Component } from 'react'
import {
    Text, StyleSheet, View, Alert, TextInput, TouchableOpacity
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import Validator from 'validator';
import Utilities from '../../utils/Utilities';
import Hash from 'hash.js';
import Toolbar from './Toolbar';
import * as Constants from '../../constants/Constants';

class UselessTextInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "",
            count: 0,
            error: ""
        }
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    onChangeValue(text) {
        this.props.onReceiveValue(text)
        this.setState({
            value: text,
            count: text.length
        })
    }

    async _apiCheck(key, value) {
        try {
            var response = await fetch(Constants.BASE_URL + "users/check_exists",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "param": key,
                        "value": value
                    })
                }
            )
            var result = await response.status == 200 ? await response.json() : null
            if (result && result.success && result.data) {
                return result.data.exists !== null ? result.data.exists : false
            } else {
                return false
            }
        } catch (error) {
            return false
        }
    }

    async onBlur() {
        try {
            if (this.props.minLength && this.state.value.trim().length < this.props.minLength) {
                this.setState({
                    error: "Bạn phải nhập tối thiểu " + this.props.minLength + " ký tự!"
                })
                return
            } else {
                switch (this.props.keyInput) {
                    case "username":
                        let existsUserName = await this._apiCheck("username", this.state.value.trim())
                        if (existsUserName) {
                            this.setState({
                                error: "Tên đăng nhập này đã bị đăng ký"
                            })
                            return
                        }
                        break;
                    case "email":
                        if (!Validator.isEmail(this.state.value.trim())) {
                            this.setState({
                                error: "Địa chỉ email không hợp lệ"
                            })
                            return
                        }
                        let existsEmail = await this._apiCheck("email", this.state.value.trim())
                        if (existsEmail) {
                            this.setState({
                                error: "Địa chỉ email này đã bị đăng ký"
                            })
                            return
                        }
                        break;
                    case "phone":
                        if (!Validator.isMobilePhone(this.state.value.trim())) {
                            this.setState({
                                error: "Số điện thoại không hợp lệ"
                            })
                            return
                        }
                        let existsPhone = await this._apiCheck("phone", this.state.value.trim())
                        if (existsPhone) {
                            this.setState({
                                error: "Số điện thoại này đã bị đăng ký"
                            })
                            return
                        }
                        break;
                    default:
                        break;
                }
                this.setState({
                    error: ""
                })
            }
        } catch (error) {
         //   alert(error)
        }
    }

    onFocus() {
        this.input.focus()
    }

    render() {
        var icon_name = ""
        switch (this.props.keyInput) {
            case "display_name":
                icon_name = "address-book"
                break;
            case "username":
                icon_name = "user"
                break;
            case "email":
                icon_name = "envelope"
                break;
            case "phone":
                icon_name = "phone"
                break;
            case "password":
            case "confirm_password":
                icon_name = "lock"
                break;
            default:
                break;
        }

        return (
            <View style={{
                paddingHorizontal: 24,
                marginTop: 16
            }}>
                <LinearGradient
                    style={{
                        backgroundColor: 'aliceblue',
                        borderRadius: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                    locations={[0, 0.15, 0.15]}
                    colors={['rgba(200, 200, 218, 0.25)', 'rgba(200, 200, 218, 0.005)', 'aliceblue']}
                >
                    <View style={{
                        width: 50,
                        height: 30,
                        borderEndWidth: 0.5,
                        borderColor: 'black',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <FontAwesome name={icon_name} size={18} color="black" />
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <TextInput
                            {...this.props}
                            autoCapitalize={false}
                            style={{
                                ...this.props.style,
                                flex: 1
                            }}
                            ref={ref => this.input = ref}
                            onChangeText={(text) => this.onChangeValue(text)}
                            returnKeyType="done"
                            onBlur={() => this.onBlur()}
                        />
                        <View>
                            <Text style={{
                                fontSize: 8,
                                marginHorizontal: 5,
                                marginTop: 35,
                                color: 'rgba(0,0,0,0.8)'
                            }}>{this.state.count}/{this.props.maxLength}</Text>
                        </View>
                    </View>
                </LinearGradient>
                {
                    this.state.error !== ""
                        ?
                        <Text style={{
                            color: 'red',
                            fontSize: 10,
                            marginTop: 5
                        }}>{this.state.error}</Text>
                        : null
                }

            </View>
        )
    }
}

export default class SignUp extends Component {
    constructor(props) {
        super(props)
        this.dataRegister = {
            display_name: "",
            username: "",
            email: "",
            phone: "",
            password: "",
            confirm_password: ""
        }
    }

    onReceiveValue(key, value) {
        try {
            this.dataRegister[key] = value
        } catch (error) {

        }
    }

    onRegister() {
        try {
            if (!this.dataRegister.display_name) {
                Utilities.showToast("Vui nhập tên hiển thị")
                this.inputDisplayName.onFocus()
                return
            } else {
                if (this.dataRegister.display_name.length < 4) {
                    Utilities.showToast("Tên hiển thị tối thiểu 4 ký tự")
                    this.inputDisplayName.onFocus()
                    return
                }
            }

            if (!this.dataRegister.username) {
                Utilities.showToast("Vui nhập tên đăng nhập")
                this.inputUsername.onFocus()
                return
            } else {
                if (this.dataRegister.username.length < 4) {
                    Utilities.showToast("Tên hiển thị tối thiểu 4 ký tự")
                    this.inputDisplayName.onFocus()
                    return
                }
            }

            if (!this.dataRegister.email) {
                Utilities.showToast("Vui nhập địa chỉ email")
                this.inputEmail.onFocus()
                return
            } else {
                if (!Validator.isEmail(this.dataRegister.email)) {
                    Utilities.showToast("Địa chỉ email không hợp lệ")
                    this.inputEmail.onFocus()
                    return
                }
            }

            if (!this.dataRegister.phone) {
                Utilities.showToast("Vui nhập số điện thoại")
                this.inputPhone.onFocus()
                return
            } else {
                if (!Validator.isMobilePhone(this.dataRegister.phone)) {
                    Utilities.showToast("Số điện thoại không hợp lệ")
                    this.inputPhone.onFocus()
                    return
                }
            }

            if (!this.dataRegister.password) {
                Utilities.showToast("Vui nhập mật khẩu")
                this.inputPassword.onFocus()
                return
            } else {
                if (this.dataRegister.password.length < 5) {
                    Utilities.showToast("Mật khẩu tối thiểu 5 ký tự")
                    this.inputPassword.onFocus()
                    return
                }
            }

            if (!this.dataRegister.confirm_password) {
                Utilities.showToast("Vui nhập mật khẩu xác thực")
                this.inputConfirmPassword.onFocus()
                return
            } else {
                if (this.dataRegister.confirm_password !== this.dataRegister.password) {
                    Utilities.showToast("Mật khẩu xác thực không đúng")
                    this.inputConfirmPassword.onFocus()
                    return
                }
            }

            this.props.registerAction({
                ...this.dataRegister,
                password: Hash.sha256().update(this.dataRegister.password).digest('hex')
            })
        } catch (error) {
         //   alert(error)
        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white'
            }}>
                <Toolbar title="Đăng ký" />
                <KeyboardAwareScrollView
                    ref={ref => this.scrollView = ref}>
                    <Text style={{
                        marginTop: 30,
                        color: 'rgba(0,0,0,0.8)',
                        fontSize: 16,
                        textAlign: 'center',
                        marginHorizontal: 50
                    }}>Chúng tôi sẽ gửi mã xác thực tới email của bạn để kích hoạt tài khoản.</Text>

                    <UselessTextInput
                        onRef={ref => (this.inputDisplayName = ref)}
                        onReceiveValue={(value) => this.onReceiveValue('display_name', value)}
                        keyInput="display_name"
                        placeholder="Tên hiển thị"
                        returnKeyType="done"
                        style={{
                            height: 50,
                            borderRadius: 5,
                            paddingHorizontal: 12,
                            color: 'black'
                        }}
                        maxLength={40}
                        minLength={4}
                    />

                    <UselessTextInput
                        onRef={ref => (this.inputUsername = ref)}
                        onReceiveValue={(value) => this.onReceiveValue('username', value)}
                        keyInput="username"
                        placeholder="Tên đăng nhập"
                        returnKeyType="done"
                        style={{
                            height: 50,
                            borderRadius: 5,
                            paddingHorizontal: 12,
                            color: 'black'
                        }}
                        maxLength={30}
                        minLength={4}
                    />


                    <UselessTextInput
                        onRef={ref => (this.inputEmail = ref)}
                        onReceiveValue={(value) => this.onReceiveValue('email', value)}
                        keyInput="email"
                        placeholder="Email"
                        returnKeyType="done"
                        style={{
                            height: 50,
                            borderRadius: 5,
                            paddingHorizontal: 12,
                            color: 'black'
                        }}
                        keyboardType="email-address"
                        maxLength={50}
                    />

                    <UselessTextInput
                        onRef={ref => (this.inputPhone = ref)}
                        onReceiveValue={(value) => this.onReceiveValue('phone', value)}
                        keyInput="phone"
                        placeholder="Số điện thoại"
                        returnKeyType="done"
                        style={{
                            height: 50,
                            borderRadius: 5,
                            paddingHorizontal: 12,
                            color: 'black'
                        }}
                        keyboardType="number-pad"
                        maxLength={12}
                    />

                    <UselessTextInput
                        onRef={ref => (this.inputPassword = ref)}
                        onReceiveValue={(value) => this.onReceiveValue('password', value)}
                        keyInput="password"
                        placeholder="Mật khẩu"
                        returnKeyType="done"
                        style={{
                            height: 50,
                            borderRadius: 5,
                            paddingHorizontal: 12,
                            color: 'black'
                        }}
                        secureTextEntry
                        maxLength={30}
                        minLength={5}
                    />

                    <UselessTextInput
                        onRef={ref => (this.inputConfirmPassword = ref)}
                        onReceiveValue={(value) => this.onReceiveValue('confirm_password', value)}
                        keyInput="confirm_password"
                        placeholder="Xác thực mật khẩu"
                        returnKeyType="done"
                        style={{
                            height: 50,
                            borderRadius: 5,
                            padding: 12,
                            color: 'black'
                        }}
                        secureTextEntry
                        maxLength={30}
                        minLength={5}
                    />

                    <TouchableOpacity
                        style={{
                            borderRadius: 5,
                            marginTop: 30,
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
                        onPress={() => {
                            this.onRegister()
                        }}
                    >
                        <Text style={{
                            color: 'white',
                            fontSize: 18,
                            fontWeight: '500'
                        }}>ĐĂNG KÝ</Text>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({})

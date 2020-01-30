import React, { Component } from 'react'
import {
    Text, StyleSheet, View, TouchableOpacity,
    Alert, TextInput, ScrollView
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Content } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper'
import LogoWithText from '../svg/Logo_With_Text';
import LinearGradient from 'react-native-linear-gradient';
import Utilities from '../../utils/Utilities';
import Hash from 'hash.js';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
        this._handleLogin = this._handleLogin.bind(this)
    }

    async _handleLogin() {
        try {
            if (this.state.username.trim() === "") {
                Utilities.showToast("Bạn chưa nhập tên đăng nhập")
                this.username.focus()
                return
            }

            if (this.state.password.trim() === "") {
                Utilities.showToast("Bạn chưa nhập mật khẩu")
                this.password.focus()
                return
            }

            this.props.loginAction(this.state.username,
                Hash.sha256().update(this.state.password).digest('hex'))
        } catch (error) {
         //   alert(error)
        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white',
                paddingBottom: getBottomSpace()
            }}>
                <View style={{
                    paddingTop: Utilities.checkAndroidOS() ? 0 : getStatusBarHeight(),
                    height: 56 + (Utilities.checkAndroidOS() ? 0 : getStatusBarHeight()),
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowOffset: { width: 0, height: 1 },
                    shadowRadius: 2,
                    shadowOpacity: 0.2,
                    elevation: 2,
                    flexDirection: 'row',
                    zIndex: 9999
                }}>
                    <TouchableOpacity
                        style={{
                            width: 50,
                            paddingStart: 16
                        }}
                        onPress={() => Actions.pop()}>
                        <Ionicons
                            name="ios-arrow-back"
                            size={28}
                            color="black" />
                    </TouchableOpacity>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        transform: [{ scale: 0.6 }]
                    }}>
                        <LogoWithText />
                    </View>
                    <View style={{ width: 50 }} />
                </View>

                <View style={{
                    flex: 1,
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        color: "black",
                        fontSize: 40,
                        textAlign: 'center',
                        marginTop: 30
                    }}>Đăng nhập</Text>

                    <LinearGradient
                        style={{
                            marginTop: 50,
                            backgroundColor: 'aliceblue',
                            marginHorizontal: 24,
                            borderRadius: 5,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                        locations={[0, 0.15, 0.15]}
                        colors={['rgba(200, 200, 218, 0.25)', 'rgba(200, 200, 218, 0.005)', 'aliceblue']}
                    >
                        <View style={{
                            width: 50,
                            height: 30,
                            borderEndWidth: 1,
                            borderColor: 'black',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <FontAwesome name="user" size={18} color="black" />
                        </View>
                        <TextInput
                            value={this.state.username}
                            ref={ref => this.username = ref}
                            placeholder="Tên đăng nhập/Email"
                            returnKeyType="done"
                            style={{
                                flex: 1,
                                borderRadius: 5,
                                height: 50,
                                paddingHorizontal: 12,
                                color: 'black'
                            }}
                            autoCapitalize='none'
                            onChangeText={(text) => this.setState({ username: text })}
                        />
                    </LinearGradient>

                    <LinearGradient
                        style={{
                            backgroundColor: 'aliceblue',
                            marginTop: 16,
                            marginHorizontal: 24,
                            borderRadius: 5,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                        locations={[0, 0.15, 0.15]}
                        colors={['rgba(200, 200, 218, 0.25)', 'rgba(200, 200, 218, 0.005)', 'aliceblue']}
                    >
                        <View style={{
                            width: 50,
                            height: 30,
                            borderEndWidth: 1,
                            borderColor: 'black',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <FontAwesome name="lock" size={18} color="black" />
                        </View>
                        <TextInput
                            value={this.state.password}
                            ref={ref => this.password = ref}
                            placeholder="Mật khẩu"
                            returnKeyType="done"
                            style={{
                                flex: 1,
                                borderRadius: 5,
                                height: 50,
                                paddingHorizontal: 12,
                                color: 'black'
                            }}
                            secureTextEntry
                            autoCapitalize='none'
                            onChangeText={(text) => this.setState({ password: text })}
                        />
                    </LinearGradient>

                    <TouchableOpacity style={{
                        paddingEnd: 24,
                        marginTop: 12,
                        alignSelf: 'flex-end'
                    }}
                        onPress={() => Actions.sendEmail()}
                    >
                        <Text style={{
                            color: "#4285F4",
                            fontSize: 13,
                            textAlign: 'right'
                        }}>Quên mật khẩu?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            width: 200,
                            borderRadius: 5,
                            marginTop: 50,
                            height: 45,
                            backgroundColor: 'red',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            shadowOffset: { width: 0, height: 1 },
                            shadowRadius: 2,
                            shadowOpacity: 0.2,
                            elevation: 2
                        }}
                        onPress={() => { this._handleLogin() }}
                    >
                        <Text style={{
                            color: 'white',
                            fontSize: 18,
                            fontWeight: '500'
                        }}>ĐĂNG NHẬP</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1 }} />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            height: 1,
                            width: 50,
                            backgroundColor: 'black'
                        }} />
                        <Text style={{
                            fontSize: 14,
                            color: 'rgba(0,0,0,0.8)'
                        }}>   Đăng nhập nhanh với   </Text>
                        <View style={{
                            height: 1,
                            width: 50,
                            backgroundColor: 'black'
                        }} />
                    </View>

                    <View style={{
                        marginTop: 10,
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                        <TouchableOpacity style={{
                            borderRadius: 5,
                            backgroundColor: "#3C5A99",
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 30,
                            paddingVertical: 5,
                            marginHorizontal: 5,
                            shadowOffset: { width: 0, height: 1 },
                            shadowRadius: 2,
                            shadowOpacity: 0.2,
                            elevation: 2
                        }}
                            onPress={() => Alert.alert("'Msell' muốn sử dụng 'facebook.com' để đăng nhập",
                                "Việc này cho phép ứng dụng và trang web chia sẻ thông tin về bạn.",
                                [
                                    {
                                        text: "Tiếp tục",
                                        onPress: () => {
                                            alert("Comming soon!")
                                        }
                                    },
                                    {
                                        text: "Huỷ",
                                        style: "cancel"
                                    }
                                ],
                                {
                                    cancelable: false
                                }
                            )}
                        >
                            <FontAwesome name="facebook-square"
                                size={30}
                                color="white"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            borderRadius: 5,
                            backgroundColor: "red",
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 30,
                            paddingVertical: 5,
                            marginHorizontal: 5,
                            shadowOffset: { width: 0, height: 1 },
                            shadowRadius: 2,
                            shadowOpacity: 0.2,
                            elevation: 2,
                        }}
                            onPress={() => Alert.alert("'Msell' muốn sử dụng 'google.com' để đăng nhập",
                                "Việc này cho phép ứng dụng và trang web chia sẻ thông tin về bạn.",
                                [
                                    {
                                        text: "Tiếp tục",
                                        onPress: () => {
                                            alert("Comming soon!")
                                        }
                                    },
                                    {
                                        text: "Huỷ",
                                        style: "cancel"
                                    }
                                ],
                                {
                                    cancelable: false
                                }
                            )}
                        >
                            <FontAwesome name="google-plus-square"
                                size={30}
                                color="white"
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{
                        height: 35,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}
                        onPress={() => Actions.signUp()}
                    >
                        <Text style={{
                            fontSize: 11,
                            color: 'black'
                        }}>Bạn chưa có tài khoản?</Text>
                        <Text style={{
                            fontSize: 11,
                            color: "#4285F4",
                            marginStart: 5
                        }}>Đăng ký ngay</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({})

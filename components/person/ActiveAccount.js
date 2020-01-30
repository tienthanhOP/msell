import React, { Component } from 'react'
import {
    Text, StyleSheet, View, Alert,
    TextInput, TouchableOpacity, Keyboard
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient';
import Utilities from '../../utils/Utilities';
import Toolbar from './Toolbar';
import * as Constants from '../../constants/Constants';

export default class ActiveAccount extends Component {
    constructor(props) {
        super(props)
        this.state = {
            codeActive: ""
        }
    }

    onActiveAccount() {
        try {
            Keyboard.dismiss()
            if (this.state.codeActive.length != 6) {
                this.inputCode.focus()
                Utilities.showToast("Mã kích hoạt phải bao gồm 6 ký tự")
                return
            }
            this.props.activeAccountAction(this.props.email, this.state.codeActive)
        } catch (error) {

        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white'
            }}>
                <Toolbar title={"Kích hoạt tài khoản"} />
                <Text style={{
                    flexWrap: 'wrap',
                    marginTop: 30,
                    color: 'rgba(0,0,0,0.8)',
                    fontSize: 16,
                    textAlign: 'center',
                    marginHorizontal: 50
                }}>
                    <Text>Chúng tôi đã gửi mã kích hoạt vào email của bạn</Text>
                    <Text style={{ fontWeight: 'bold' }}>({this.props.email})</Text>
                    <Text>, vui lòng nhập mã kích hoạt để kích hoạt tài khoản.</Text>
                </Text>

                <View style={{
                    marginTop: 50,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <LinearGradient
                        style={{
                            flex: 1,
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
                            <FontAwesome name="lock" size={18}  color="black" />
                        </View>
                        <TextInput
                            ref={ref => this.inputCode = ref}
                            value={this.state.codeActive}
                            placeholder="Mã kích hoạt"
                            returnKeyType="done"
                            style={{
                                flex: 1,
                                borderRadius: 5,
                                height: 50,
                                paddingHorizontal: 12,
                                color: 'black'
                            }}
                            maxLength={6}
                            keyboardType='number-pad'
                            onChangeText={(text) => this.setState({ codeActive: text })}
                        />
                        <View>
                            <Text style={{
                                fontSize: 8,
                                marginHorizontal: 5,
                                marginTop: 35,
                                color: 'rgba(0,0,0,0.8)'
                            }}>{this.state.codeActive.length}/6</Text>
                        </View>
                    </LinearGradient>


                    <TouchableOpacity
                        onPress={() => {
                            this.props.sendEmailAction(this.props.email, Constants.SEND_EMAIL_ACTIVE_ACCOUNT)
                        }}
                    >
                        <Text style={{
                            marginEnd: 24,
                            fontSize: 11,
                            color: "#4285F4",
                            fontWeight: 'bold'
                        }}>NHẬN LẠI MÃ</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={() => this.onActiveAccount()}
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
                    }}>
                    <Text style={{
                        color: 'white',
                        fontSize: 18,
                        fontWeight: '500'
                    }}>KÍCH HOẠT TÀI KHOẢN</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({})

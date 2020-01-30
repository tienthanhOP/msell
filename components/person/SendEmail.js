import React, { Component } from 'react'
import {
    Text, StyleSheet, View, Alert,
    TextInput, TouchableOpacity
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Utilities from '../../utils/Utilities';
import validator from 'validator';
import * as Constants from '../../constants/Constants';
import Toolbar from './Toolbar';

export default class SendEmail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: ""
        }
    }

    _handleSendEmail() {
        try {
            if (this.state.email === "") {
                this.inputEmail.focus()
                Utilities.showToast("Bạn chưa nhập địa chỉ email")
                return
            } else if (!validator.isEmail(this.state.email)) {
                this.inputEmail.focus()
                Utilities.showToast("Địa chỉ email không hợp lệ")
                return
            }

            this.props.sendEmailAction(this.state.email, Constants.SEND_EMAIL_FORGOT_PASSWORD)
        } catch (error) {

        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white'
            }}>
                <Toolbar title={"Quên mật khẩu"} />

                <Text style={{
                    marginTop: 30,
                    color: 'black',
                    fontSize: 14,
                    textAlign: 'center',
                    marginHorizontal: 50
                }}>Chúng tôi sẽ gửi mã xác thực tới email của bạn để có thể đặt lại mật khẩu.</Text>

                <LinearGradient
                    style={{
                        backgroundColor: 'aliceblue',
                        marginTop: 50,
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
                        borderEndWidth: 0.5,
                        borderColor: 'black',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <FontAwesome name="envelope" size={18}  color="black" />
                    </View>
                    <TextInput
                        autoCapitalize={false}
                        ref={ref => (this.inputEmail = ref)}
                        placeholder="Email"
                        returnKeyType="done"
                        style={{
                            flex: 1,
                            height: 50,
                            borderRadius: 5,
                            paddingHorizontal: 12,
                            color: 'black'
                        }}
                        keyboardType="email-address"
                        maxLength={50}
                        value={this.state.email}
                        onChangeText={(text) => this.setState({ email: text })}
                    />
                </LinearGradient>

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
                    onPress={() => this._handleSendEmail()}
                >
                    <Text style={{
                        color: 'white',
                        fontSize: 18,
                        fontWeight: '500'
                    }}>NHẬN MÃ XÁC THỰC</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({})

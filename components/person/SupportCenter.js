import React, { Component } from 'react'
import {
    Text, StyleSheet, View, TouchableOpacity
} from 'react-native'
import { Content } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Actions } from 'react-native-router-flux';
import * as Constants from '../../constants/Constants';
import { createImageProgress } from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';
const Image = createImageProgress(FastImage);
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import DeviceInfo from 'react-native-device-info';
import Toolbar from './Toolbar';

export default class SupportCenter extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Toolbar title="Trung tâm hỗ trợ" />
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: 18,
                        color: 'black'
                    }}>Tính năng sắp ra mắt</Text>
                </View>
                <View style={{
                    padding: 16,
                    paddingBottom: 16 + getBottomSpace(),
                    backgroundColor: 'white',
                    shadowOffset: { width: 0, height: -1 },
                    shadowRadius: 2,
                    shadowOpacity: 0.2,
                    elevation: 2,
                    zIndex: 999
                }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{
                            color: 'black',
                            fontSize: 15,
                            marginStart: 5,
                            fontWeight: 'bold'
                        }}>Mọi thông tin đóng góp xin vui lòng liên hệ với chúng tôi qua:</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 15
                    }}>
                        <MaterialIcons name="phone" color="black" size={20} />
                        <Text style={{
                            color: 'black',
                            fontSize: 14,
                            marginStart: 5,
                            paddingEnd: 16
                        }}>0973610712</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 10
                    }}>
                        <MaterialIcons name="email" color="black" size={20} />
                        <Text style={{
                            color: 'black',
                            fontSize: 14,
                            marginStart: 5,
                            paddingEnd: 16
                        }}>support@msell.com</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 10
                    }}>
                        <MaterialIcons name="location-on" color="black" size={20} />
                        <Text style={{
                            color: 'black',
                            fontSize: 14,
                            marginStart: 5,
                            paddingEnd: 16
                        }}>Tầng 6, Tòa nhà Hancorp, Số 72 Trần Đăng Ninh, Cầu Giấy, Hà Nội</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})
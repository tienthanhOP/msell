import React, { Component } from 'react'
import {
    Text, StyleSheet, View, TouchableOpacity, Linking
} from 'react-native'
import { Content } from 'native-base';
import { createImageProgress } from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';
const Image = createImageProgress(FastImage);
import DeviceInfo from 'react-native-device-info';
import Toolbar from './Toolbar';

export default class About extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Toolbar title={"Giới thiệu"} />
                <Content style={{ flex: 1 }}>
                    <View style={{
                        width: '100%',
                        paddingHorizontal: 16,
                        paddingTop: 22,
                        paddingBottom: 8,
                        backgroundColor: 'whitesmoke'
                    }}>
                        <Text style={{
                            color: 'black',
                            fontSize: 15,
                            fontWeight: '500'
                        }}>THÔNG TIN VỀ ỨNG DỤNG</Text>
                    </View>
                    <View style={{ padding: 16 }}>
                        <Text style={{
                            color: 'black',
                            fontSize: 14,
                        }}>Tên ứng dụng: MSELL</Text>
                        <Text style={{
                            color: 'black',
                            fontSize: 14,
                            marginTop: 5
                        }}>Phiên bản: {DeviceInfo.getVersion()}</Text>
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 5
                        }}>
                            <Text style={{
                                color: 'black',
                                fontSize: 14
                            }}>Địa chỉ web: </Text>
                            <TouchableOpacity onPress={() => {
                                Linking.openURL('http://msell.vn')
                            }}>
                                <Text style={{
                                    fontSize: 14,
                                    color: '#07C',
                                    textDecorationLine: "underline",
                                    fontWeight: '500'
                                }}>http://msell.vn</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{
                        width: '100%',
                        paddingHorizontal: 16,
                        paddingTop: 22,
                        paddingBottom: 8,
                        backgroundColor: 'whitesmoke'
                    }}>
                        <Text style={{
                            color: 'black',
                            fontSize: 15,
                            fontWeight: '500'
                        }}>THÔNG TIN VỀ MSELL</Text>
                    </View>
                    <View style={{ padding: 16 }}>
                        <Image style={{
                            width: 50,
                            height: 50,
                            alignSelf: 'center'
                        }} source={require('../../images/icon.png')} />
                        <Text style={{
                            color: 'black',
                            fontSize: 14,
                            marginTop: 10,
                            fontWeight: 'bold',
                            alignSelf: 'stretch',
                            textAlign: 'center'
                        }}>MSELL - Bản đồ bất động sản lớn nhất Việt Nam</Text>
                        <Text style={{
                            color: 'black',
                            fontSize: 14,
                            marginTop: 25,
                            alignSelf: 'stretch',
                            textAlign: 'center'
                        }}>MSELL giúp bạn tìm kiếm mua hoặc bán nhà, kết hợp công nghệ và tập trung vào dịch vụ khách hàng để làm cho toàn bộ quá trình dễ dàng hơn.</Text>
                    </View>
                </Content>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})
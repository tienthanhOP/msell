import React, { Component } from 'react'
import {
    Text, StyleSheet, View, Alert, Modal,
    TextInput, TouchableOpacity, Linking, ActivityIndicator
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createImageProgress } from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';
import Utilities from '../../utils/Utilities';
const Image = createImageProgress(FastImage);
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';
import Validator from 'validator';
import * as Constants from '../../constants/Constants';

export default class UserInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            displayName: "",
            email: "",
            phone: "",
            avatar: "",
            cover: "",
            modalVisible: false,
            isEditAvatar: null,
            loading: true,
            isEdit: false
        }
    }

    componentWillMount() {
        this.props.getUserInfoAction()
    }

    componentWillReceiveProps(nextProps) {
        try {
            var userInfo = nextProps.userInfo.data ? nextProps.userInfo.data : null
            var loading = nextProps.userInfo.loading ? nextProps.userInfo.loading : false
            setTimeout(() => {
                this.setState({
                    loading,
                    username: userInfo.username ? userInfo.username : "",
                    displayName: userInfo.display_name ? userInfo.display_name : "",
                    email: userInfo.email ? userInfo.email : "",
                    phone: userInfo.phone ? userInfo.phone : "",
                    avatar: userInfo.avatar ? userInfo.avatar : "",
                    cover: userInfo.cover ? userInfo.cover : "",
                })
            }, 300)
        } catch (error) {
            this.setState({
                loading: false
            })
        }
    }

    setModalVisible(visible, isEditAvatar) {
        this.setState({
            modalVisible: visible,
            isEditAvatar: isEditAvatar
        });
    }

    _requirePermisson() {
        try {
            Alert.alert("Thông báo", "Ứng dụng muốn truy cập hình ảnh của bạn",
                [
                    {
                        text: 'Lúc khác', style: 'cancel'
                    },
                    {
                        text: 'Cài đặt', onPress: () => {
                            Linking.openURL('app-settings:');
                        }
                    },
                ])
        } catch (error) {

        }
    }

    _openGallery = () => {
        try {
            ImagePicker.openPicker({
                compressImageMaxWidth: 1920,
                compressImageMaxHeight: 1080,
                cropping: false,
                compressImageQuality: 0.8,
                includeBase64: true
            }).then(image => {
                try {
                    if (this.state.isEditAvatar) {
                        this.setState({
                            avatar: ('data:' + image.mime + ';base64,' + image.data),
                            modalVisible: false
                        })
                    } else {
                        this.setState({
                            cover: ('data:' + image.mime + ';base64,' + image.data),
                            modalVisible: false
                        })
                    }
                } catch (error) {
                    if (error.toString().indexOf("Cannot access images. Please allow access") > -1) {
                        this._requirePermisson()
                    }
                }
            });
        } catch (error) {

        }
    }

    _openCamera = () => {
        try {
            ImagePicker.openCamera({
                compressImageMaxWidth: 1920,
                compressImageMaxHeight: 1080,
                cropping: false,
                compressImageQuality: 0.8,
                includeBase64: true,
                mediaType: 'photo'
            }).then(image => {
                try {
                    if (this.state.isEditAvatar) {
                        this.setState({
                            avatar: ('data:' + image.mime + ';base64,' + image.data),
                            modalVisible: false
                        })
                    } else {
                        this.setState({
                            cover: ('data:' + image.mime + ';base64,' + image.data),
                            modalVisible: false
                        })
                    }
                } catch (error) {
                    if (error.toString().indexOf("Cannot access images. Please allow access") > -1) {
                        this._requirePermisson()
                    }
                }
            });
        } catch (error) {
            //   alert(error)
        }
    }

    _handleUpdate() {
        try {
            if (this.state.displayName < 4) {
                this.inputDisplayName.focus()
                Utilities.showToast("Tên hiển thị tối thiểu 4 ký tự")
                return
            }
            if (!Validator.isMobilePhone(this.state.phone)) {
                this.inputPhone.focus()
                Utilities.showToast("Số điện thoại không hợp lệ")
                return
            }
            if (!Validator.isEmail(this.state.email)) {
                this.inputEmail.focus()
                Utilities.showToast("Địa chỉ email không hợp lệ")
                return
            }

            this.props.updateUserInfoAction({
                avatar: this.state.avatar,
                cover: this.state.cover,
                display_name: this.state.displayName,
                phone: this.state.phone,
                email: this.state.email
            }, false)
        } catch (error) {
        }
    }

    render() {
        var avatar = this.state.avatar && this.state.avatar !== ""
            ? (this.state.avatar.startsWith("/") ? (Constants.IMAGES_URL + this.state.avatar) : this.state.avatar)
            : null

        var cover = this.state.cover && this.state.cover !== ""
            ? (this.state.cover.startsWith("/") ? (Constants.IMAGES_URL + this.state.cover) : this.state.cover)
            : null

        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white'
            }}>
                <View style={{
                    backgroundColor: 'white',
                    height: (Utilities.checkAndroidOS() ? 0 : getStatusBarHeight()) + 56,
                    paddingTop: (Utilities.checkAndroidOS() ? 0 : getStatusBarHeight()),
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    shadowOffset: { width: 0, height: 1 },
                    shadowRadius: 2,
                    shadowOpacity: 0.2,
                    elevation: 2,
                    flexDirection: 'row',
                    zIndex: 9999
                }}>
                    <TouchableOpacity
                        style={{ width: 40 }}
                        onPress={() => Actions.pop()}>
                        <Ionicons
                            name="ios-arrow-back"
                            size={28}
                            color="black" />
                    </TouchableOpacity>
                    <Text style={{
                        flex: 1,
                        textAlign: 'center',
                        fontSize: 20,
                        color: 'black',
                        fontWeight: '400'
                    }}>Thông tin</Text>
                    <TouchableOpacity
                        onPress={() => {
                            if (this.state.isEdit) {
                                this._handleUpdate()
                            } else {
                                this.setState({
                                    isEdit: true
                                })
                            }
                        }}
                        style={{ width: 40 }}>
                        <Text style={{
                            fontSize: 14,
                            textAlign: 'right',
                            color: '#4285F4',
                            fontWeight: '500'
                        }}>{this.state.isEdit ? 'Lưu' : 'Sửa'}</Text>
                    </TouchableOpacity>
                </View>

                {
                    this.state.loading
                        ?
                        <ActivityIndicator size="large" color="black" style={{ flex: 1 }} />
                        :
                        <KeyboardAwareScrollView style={{
                            marginBottom: getBottomSpace(),
                            backgroundColor: 'whitesmoke'
                        }}>
                            <View style={{ backgroundColor: 'white' }}>
                                {
                                    cover
                                        ?
                                        <FastImage style={{
                                            height: 180,
                                            backgroundColor: 'lightgray',
                                            alignItems: 'center'
                                        }}
                                            source={{ uri: cover }}
                                        />
                                        :
                                        <LinearGradient style={{
                                            height: 180
                                        }}
                                            colors={['rgba(255,140,0,1)', 'rgba(255,140,0,0.9)', 'rgba(255,140,0,0.7)']}
                                        />
                                }
                                {
                                    this.state.isEdit ?
                                        <TouchableOpacity
                                            onPress={() => this.setModalVisible(true, false)}
                                            style={{
                                                zIndex: 99,
                                                position: 'absolute',
                                                right: 0,
                                                top: 140,
                                                height: 40,
                                                width: 40,
                                                overflow: 'hidden',
                                                paddingTop: 12,
                                                paddingStart: 10
                                            }}>
                                            <View style={{
                                                position: 'absolute',
                                                left: 0,
                                                right: 0,
                                                top: 0,
                                                color: 'white',
                                                width: 40,
                                                height: 80,
                                                overflow: 'hidden',
                                                borderBottomLeftRadius: 40,
                                                borderTopLeftRadius: 40,
                                                backgroundColor: 'rgba(0,0,0,0.6)'
                                            }} />
                                            <Text style={{
                                                fontSize: 12,
                                                color: 'white',
                                                textAlign: 'center',
                                                fontWeight: '500',
                                                marginTop: 3
                                            }}>Sửa</Text>
                                        </TouchableOpacity>
                                        : null
                                }
                                <View style={{
                                    marginTop: -40,
                                    alignItems: 'center'
                                }}>
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        onPress={() => {
                                            if (this.state.isEdit) {
                                                this.setModalVisible(true, true)
                                            }
                                        }}
                                        style={{
                                            height: 80,
                                            width: 80,
                                            borderRadius: 40,
                                            backgroundColor: 'darkgray',
                                            shadowOffset: { width: 0, height: 0 },
                                            shadowRadius: 3,
                                            shadowOpacity: 0.3,
                                            elevation: 3,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                        {
                                            this.state.isEdit ?
                                                <View style={{
                                                    position: 'absolute',
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    height: 25,
                                                    overflow: 'hidden',
                                                    zIndex: 99
                                                }}>
                                                    <View style={{
                                                        position: 'absolute',
                                                        left: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        color: 'white',
                                                        width: 80,
                                                        height: 40,
                                                        overflow: 'hidden',
                                                        borderBottomLeftRadius: 40,
                                                        borderBottomRightRadius: 40,
                                                        backgroundColor: 'rgba(0,0,0,0.6)',
                                                        borderWidth: 3,
                                                        borderColor: 'white'
                                                    }} />
                                                    <Text style={{
                                                        fontSize: 12,
                                                        color: 'white',
                                                        textAlign: 'center',
                                                        fontWeight: '500',
                                                        marginTop: 3
                                                    }}>Sửa</Text>
                                                </View>
                                                : null
                                        }

                                        {
                                            avatar
                                                ?
                                                <View>
                                                    <FastImage
                                                        source={{ uri: avatar }}
                                                        style={{
                                                            height: 80,
                                                            width: 80,
                                                            borderRadius: 40,
                                                            backgroundColor: 'white',
                                                            borderWidth: 2,
                                                            borderColor: 'white'
                                                        }}
                                                    />
                                                </View>
                                                :
                                                <View style={{
                                                    height: 80,
                                                    width: 80,
                                                    borderRadius: 40,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    borderWidth: 2,
                                                    borderColor: 'white'
                                                }}>
                                                    <Text
                                                        style={{
                                                            color: 'white',
                                                            fontSize: 40,
                                                            textTransform: "uppercase",
                                                            fontWeight: 'bold'
                                                        }}>
                                                        {this.state.displayName && this.state.displayName.length > 0
                                                            ? this.state.displayName.slice(0, 1) : ""}
                                                    </Text>
                                                </View>
                                        }
                                    </TouchableOpacity>
                                    <Text style={{
                                        marginTop: 8,
                                        marginBottom: 16,
                                        color: 'black',
                                        fontSize: 24,
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        paddingHorizontal: 32
                                    }}>{this.state.displayName}</Text>
                                </View>
                            </View>

                            <View style={{
                                width: '100%',
                                paddingHorizontal: 16,
                                paddingTop: 15,
                                paddingBottom: 5,
                                backgroundColor: 'whitesmoke'
                            }}>
                                <Text style={{
                                    color: 'black',
                                    fontSize: 15,
                                    fontWeight: '500',
                                    textTransform: 'uppercase'
                                }}>Tên đăng nhập</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingEnd: 16,
                                height: 50,
                                paddingStart: 32,
                                backgroundColor: 'white'
                            }}>
                                <TextInput
                                    editable={false}
                                    value={this.state.username}
                                    style={{
                                        flex: 1,
                                        fontSize: 15,
                                        color: 'black'
                                    }}
                                />
                            </View>
                            <View style={{
                                width: '100%',
                                paddingHorizontal: 16,
                                paddingTop: 15,
                                paddingBottom: 5,
                                backgroundColor: 'whitesmoke'
                            }}>
                                <Text style={{
                                    color: 'black',
                                    fontSize: 15,
                                    fontWeight: '500',
                                    textTransform: 'uppercase'
                                }}>Tên hiển thị</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingEnd: 16,
                                height: 50,
                                paddingStart: 32,
                                backgroundColor: 'white'
                            }}>
                                <TextInput
                                    ref={ref => { this.inputDisplayName = ref }}
                                    editable={this.state.isEdit}
                                    value={this.state.displayName}
                                    style={{
                                        flex: 1,
                                        fontSize: 15,
                                        color: 'black'
                                    }}
                                    maxLength={40}
                                    returnKeyType="done"
                                    onChangeText={(text) => this.setState({ displayName: text })}
                                />
                                {
                                    this.state.isEdit
                                        ?
                                        <Text style={{
                                            color: 'rgba(0,0,0,0.7)',
                                            fontSize: 9,
                                            marginTop: 30
                                        }}>{this.state.displayName.length}/40</Text>
                                        :
                                        null
                                }
                            </View>
                            <View style={{
                                width: '100%',
                                paddingHorizontal: 16,
                                paddingTop: 15,
                                paddingBottom: 5,
                                backgroundColor: 'whitesmoke'
                            }}>
                                <Text style={{
                                    color: 'black',
                                    fontSize: 15,
                                    fontWeight: '500',
                                    textTransform: 'uppercase'
                                }}>Số điện thoại</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingEnd: 16,
                                height: 50,
                                paddingStart: 32,
                                backgroundColor: 'white'
                            }}>
                                <TextInput
                                    ref={ref => { this.inputPhone = ref }}
                                    editable={this.state.isEdit}
                                    value={this.state.phone}
                                    style={{
                                        flex: 1,
                                        fontSize: 15,
                                        color: 'black'
                                    }}
                                    maxLength={12}
                                    keyboardType="number-pad"
                                    returnKeyType="done"
                                    onChangeText={(text) => this.setState({ phone: text })}
                                />
                                {
                                    this.state.isEdit
                                        ?
                                        <Text style={{
                                            color: 'rgba(0,0,0,0.7)',
                                            fontSize: 9,
                                            marginTop: 30
                                        }}>{this.state.phone.length}/12</Text>
                                        :
                                        null
                                }
                            </View>
                            <View style={{
                                width: '100%',
                                paddingHorizontal: 16,
                                paddingTop: 15,
                                paddingBottom: 5,
                                backgroundColor: 'whitesmoke'
                            }}>
                                <Text style={{
                                    color: 'black',
                                    fontSize: 15,
                                    fontWeight: '500',
                                    textTransform: 'uppercase'
                                }}>Địa chỉ email</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingEnd: 16,
                                height: 50,
                                paddingStart: 32,
                                backgroundColor: 'white'
                            }}>
                                <TextInput
                                    ref={ref => { this.inputEmail = ref }}
                                    editable={this.state.isEdit}
                                    value={this.state.email}
                                    style={{
                                        flex: 1,
                                        fontSize: 15,
                                        color: 'black'
                                    }}
                                    maxLength={50}
                                    keyboardType="email-address"
                                    returnKeyType="done"
                                    onChangeText={(text) => this.setState({ email: text })}
                                />
                                {
                                    this.state.isEdit
                                        ?
                                        <Text style={{
                                            color: 'rgba(0,0,0,0.7)',
                                            fontSize: 9,
                                            marginTop: 30
                                        }}>{this.state.email.length}/50</Text>
                                        : null
                                }
                            </View>
                            {
                                this.state.isEdit
                                    ?
                                    <TouchableOpacity
                                        onPress={() => this._handleUpdate()}
                                        style={{
                                            height: 50,
                                            backgroundColor: 'red',
                                            margin: 24,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            shadowOffset: { width: 0, height: 0 },
                                            shadowOpacity: 0.3,
                                            shadowRadius: 3,
                                            shadowColor: 'rgba(0,0,0,0.8)',
                                            elevation: 3,
                                            borderRadius: 5
                                        }}>
                                        <Text style={{
                                            fontSize: 18,
                                            color: 'white',
                                            fontWeight: 'bold'
                                        }}>Cập nhật</Text>
                                    </TouchableOpacity>
                                    :
                                    null
                            }
                        </KeyboardAwareScrollView>
                }
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}>
                    <View style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.5)'
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.setModalVisible(false, null);
                            }}
                            style={{ flex: 1 }} />
                        <View style={{
                            marginBottom: getBottomSpace() + 16,
                            marginHorizontal: 16
                        }}>
                            <View style={{
                                backgroundColor: 'white',
                                borderRadius: 10
                            }}>
                                <View style={{
                                    height: 35,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderBottomWidth: 0.3,
                                    borderColor: 'rgba(0,0,0,0.2)'
                                }}>
                                    <Text style={{
                                        fontSize: 12,
                                        color: 'rgba(0,0,0,0.8)'
                                    }}>Sửa ảnh</Text>
                                </View>
                                <TouchableOpacity
                                    style={{
                                        height: 50,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderBottomWidth: 0.3,
                                        borderColor: 'rgba(0,0,0,0.2)'
                                    }}
                                    onPress={() => {
                                        this._openCamera()
                                    }}>
                                    <Text style={{
                                        fontSize: 16,
                                        color: '#4285F4'
                                    }}>Chụp ảnh</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        height: 50,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    onPress={() => {
                                        this._openGallery()
                                    }}>
                                    <Text style={{
                                        fontSize: 16,
                                        color: '#4285F4'
                                    }}>Chọn ảnh sẵn có</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                style={{
                                    marginTop: 8,
                                    backgroundColor: 'white',
                                    borderRadius: 10,
                                    height: 50,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                onPress={() => {
                                    this.setModalVisible(false, null);
                                }}>
                                <Text style={{
                                    fontSize: 18,
                                    color: '#4285F4',
                                    fontWeight: 'bold'
                                }}>Hủy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View >
        )
    }
}

const styles = StyleSheet.create({})
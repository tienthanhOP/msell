import React, { Component } from 'react'
import {
    Text, StyleSheet, View, FlatList, TouchableOpacity, Dimensions,
    Linking, Alert, ActivityIndicator
} from 'react-native'
import FastImage from 'react-native-fast-image'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Utilities from '../../utils/Utilities';
import ImagePicker from 'react-native-image-crop-picker';
import * as Constants from '../../constants/Constants';

const { width, height } = Dimensions.get('screen')



export default class SelectImages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            images: []
        }
        this._openGallery = this._openGallery.bind(this)
        this._openCamera = this._openCamera.bind(this)
    }

    componentDidMount() {
        if (this.props.images) {
            var date = new Date().getTime()
            var images = this.props.images.map(e => {
                return {
                    image_id: date + Utilities.randomCharactersNumber(5),
                    uri: e
                }
            })
            this.setState({
                images
            })
        }
        this.props.onRef(this)
    };

    componentWillUnmount() {
        this.props.onRef(undefined)
    };

    getListImages() {
        return this.state.images
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
         //   alert(error)
        }
    }

    // uploadImage(images) {
    //     this.props.uploadImage({
    //         type: CONSTANTS.TYPE_UPLOAD_PRODUCT,
    //         images
    //     })
    // }

    _openGallery = () => {
        try {
            if (this.state.images.length >= 10) {
                Utilities.showToast("Bạn chỉ có thể đăng tối đa 10 ảnh")
                return
            }

            var imagesCanChoose = 10 - this.state.images.length

            ImagePicker.openPicker({
                multiple: true,
                compressImageMaxWidth: 1920,
                compressImageMaxHeight: 1080,
                cropping: false,
                compressImageQuality: 0.8,
                includeBase64: true,
                maxFiles: imagesCanChoose,
                mediaType: 'photo'
            }).then(images => {
                try {
                    if (imagesCanChoose > 0) {
                        let data = images.slice(0, imagesCanChoose).map(image => {
                            return {
                                image_id: new Date().getTime() + "_" + Utilities.randomCharacters(6),
                                base64: ('data:' + image.mime + ';base64,' + image.data)
                            }
                        })
                        this.setState({ images: this.state.images.concat(data) })
                    } else {
                        Utilities.showToast("Bạn chỉ có thể đăng tối đa 10 ảnh")
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

    _openCamera = () => {
        try {
            if (this.state.images.length >= 10) {
                Utilities.showToast("Bạn chỉ có thể đăng tối đa 10 ảnh")
                return
            }

            ImagePicker.openCamera({
                compressImageMaxWidth: 1920,
                compressImageMaxHeight: 1080,
                cropping: false,
                compressImageQuality: 0.8,
                includeBase64: true,
                mediaType: 'photo',
            }).then(image => {
                try {
                    this.setState({
                        images: this.state.images.concat([{
                            image_id: new Date().getTime() + "_" + Utilities.randomCharacters(6),
                            base64: ('data:' + image.mime + ';base64,' + image.data)
                        }])
                    })
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

    _setAvatar(imageId) {
        try {
            var images = this.state.images

            var index = images.findIndex(e => e.image_id === imageId)

            var imageOldAvatar = images[0]
            images[0] = images[index]
            images[index] = imageOldAvatar

            this.setState({
                images: images
            })
        } catch (error) {
         //   alert(error)
        }
    }

    _removeImage(imageId) {
        try {
            var images = this.state.images
            var index = images.findIndex(e => e.image_id === imageId)
            images.splice(index, 1)
            this.setState({
                images: images
            })
        } catch (error) {
         //   alert(error)
        }
    }

    render() {
        return (
            <View>
                <Text style={{ fontSize: 10, color: 'rgba(0,0,0,0.8)' }}>Tối đa 10 ảnh({this.state.images.length}/10)</Text>
                <FlatList
                    style={{
                        marginVertical: 8
                    }}
                    scrollEnabled={false}
                    numColumns={3}
                    horizontal={false}
                    data={this.state.images}
                    extraData={this.state.images}
                    keyExtractor={(item) => item.image_id}
                    renderItem={({ item, index }) => {
                        var uriTemp = item.uri && item.uri.startsWith("/")
                            ? (Constants.IMAGES_URL + item.uri)
                            : item.uri
                        var uri = item.base64 ? item.base64 : uriTemp
                        return (
                            <View style={{
                                justifyContent: 'flex-end',
                                width: (width - 32 - 20) / 3,
                                marginHorizontal: [1, 4, 7].includes(index) ? 10 : 0,
                                marginTop: index > 2 ? 10 : 0,
                                height: 110
                            }}>
                                <View style={{
                                    backgroundColor: 'tan',
                                    width: (width - 32 - 20) / 3 - 8,
                                    borderRadius: 5,
                                    borderColor: 'tan'
                                }}>
                                    <FastImage style={{
                                        height: 80,
                                        width: (width - 32 - 20) / 3 - 8,
                                        borderWidth: 1,
                                        borderRadius: 5,
                                        borderColor: 'tan'
                                    }}
                                        source={{ uri }}
                                    />
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (index !== 0) {
                                                this._setAvatar(item.image_id)
                                            }
                                        }}
                                        style={{
                                            height: 22,
                                            width: (width - 32 - 20) / 3 - 8,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 5
                                        }}>
                                        <Text style={{
                                            fontSize: 10,
                                            color: 'white'
                                        }}>{index == 0 ? "Ảnh đại diện" : "Đặt ảnh đại diện"}</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        this._removeImage(item.image_id)
                                    }}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        width: 20,
                                        height: 20,
                                        borderRadius: 2,
                                        backgroundColor: 'red',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        zIndex: 100
                                    }}>
                                    <Ionicons name="ios-close" size={20} color={"white"} />
                                </TouchableOpacity>
                                {/* <View style={{
                                    position: 'absolute'
                                }}>
                                    <View style={{
                                        bottom: 0,
                                        left: 0,
                                        height: 80,
                                        width: (width - 32 - 20) / 3 - 8,
                                        borderRadius: 5,
                                        backgroundColor: 'rgba(0,0,0,0.5)',
                                        zIndex: 99
                                    }} />
                                    <ActivityIndicator
                                        size="small"
                                        color="white"
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            zIndex: 100
                                        }}
                                    />
                                </View> */}
                            </View>
                        )
                    }}
                />
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{
                        marginTop: 10,
                        marginBottom: 24,
                        backgroundColor: 'deepskyblue',
                        borderRadius: 3,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10,
                        flexDirection: 'row',
                        flex: 1,
                        marginEnd: 3
                    }}
                        onPress={this._openCamera}
                    >
                        <Text style={{
                            color: 'white',
                            fontWeight: '500'
                        }}>Chụp ảnh</Text>
                        <Entypo name="camera" color="white" size={14} style={{ marginStart: 8 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        marginTop: 10,
                        marginBottom: 24,
                        backgroundColor: 'orangered',
                        borderRadius: 3,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10,
                        flexDirection: 'row',
                        flex: 1,
                        marginStart: 3
                    }}
                        onPress={this._openGallery}
                    >
                        <Text style={{
                            color: 'white',
                            fontWeight: '500'
                        }}>Tải lên ảnh</Text>
                        <Entypo name="upload" color="white" size={14} style={{ marginStart: 8 }} />
                    </TouchableOpacity>
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
})

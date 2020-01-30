import React, { Component } from 'react'
import {
    Text, StyleSheet, View, TouchableOpacity,
    Dimensions, ActivityIndicator
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Utilities from '../../utils/Utilities';
import HeaderImage from './HeaderImage';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import * as Animatable from 'react-native-animatable';
import { createImageProgress } from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';
const { width } = Dimensions.get('window');
const Image = createImageProgress(FastImage);
import DeviceInfo from 'react-native-device-info';
import { Actions } from 'react-native-router-flux';
import * as Constants from '../../constants/Constants';

const Screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}

export default class ItemProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        try {
            setTimeout(() => {
                this.setState({
                    loading: false
                })
            }, 500)
        } catch (error) {

        }
    }

    renderImage(avatar) {
        try {
            if (avatar.includes("http")) {
                return (
                    <Image
                        style={styles.image}
                        source={{ uri: avatar }} />
                )
            } else {
                return null
            }
        } catch (error) {
            return null
        }
    }

    render() {
        var data = this.props.dataItem
        var propertiesItem = data.properties
        var price = "-"
        var acreage = "-"
        var beds = "-"
        var toilets = "-"
        var floor = "-"
        var address = "-"
        var timeAgoTmp = Utilities.getTimeAgo(data.date_created)
        var timeAgo = timeAgoTmp.slice(0, 1).toUpperCase() + timeAgoTmp.slice(1)
        var avatar = null

        try {
            var avatar = data.images && data.images.length > 0
                ? (data.images[0].startsWith("/") ? (Constants.IMAGES_URL + data.images[0]) : data.images[0])
                : null
        } catch (error) {
            avatar = data.images && data.images.length > 0 ? data.images[0] : null
        }

        var product_id = data.product_id
        var is_hidden = data.status && data.status == 2 ? true : false
        var pending = data.pending == null ? true : data.pending

        if (propertiesItem) {
            price = propertiesItem.price ? Utilities.formatPrice(propertiesItem.price) : "Liên hệ"
            acreage = propertiesItem.acreage ? Math.round(parseFloat(propertiesItem.acreage) * 100) / 100 : "-"
            beds = propertiesItem.beds ? propertiesItem.beds : "-"
            toilets = propertiesItem.toilets ? propertiesItem.toilets : "-"
            floor = propertiesItem.floors ? propertiesItem.floors : "-"
            address = propertiesItem.address ? propertiesItem.address : "-"
        }

        return (
            <View
                style={styles.containerItem}>
                {
                    this.state.loading
                        ?
                        <Animatable.View
                            pointerEvents="none"
                            animation="fadeIn" style={{ backgroundColor: 'white' }}>
                            <View style={{ zIndex: 1 }}>
                                <View style={{
                                    backgroundColor: 'white',
                                    height: 220
                                }}>
                                    <ActivityIndicator size={'small'} color="gray" style={{
                                        alignSelf: 'center',
                                        flex: 1
                                    }} />
                                </View>
                            </View>
                            <View style={{
                                zIndex: 2,
                                position: 'absolute',
                                flex: 1
                            }}>
                                <LinearGradient
                                    pointerEvents="none"
                                    style={styles.gradientTopItem}
                                    colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0)']}>
                                </LinearGradient>
                                <View
                                    pointerEvents="none"
                                    style={{
                                        position: 'absolute', width: Screen.width, height: 220
                                    }}>
                                    <LinearGradient
                                        pointerEvents="none"
                                        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)']}
                                        style={styles.gradientBottomItem}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flex: 1 }}>
                                                <ShimmerPlaceHolder style={{
                                                    height: 20,
                                                    width: 70,
                                                }}
                                                    autoRun={true} />
                                                <ShimmerPlaceHolder style={{
                                                    height: 20,
                                                    width: 100,
                                                    marginTop: 5
                                                }}
                                                    autoRun={true} />
                                            </View>
                                            <ShimmerPlaceHolder style={{
                                                height: 45,
                                                width: 150
                                            }}
                                                autoRun={true} />
                                        </View>
                                        <ShimmerPlaceHolder style={{
                                            height: 20,
                                            marginTop: 5,
                                            width: Screen.width - 16
                                        }}
                                            autoRun={true} />
                                    </LinearGradient>
                                </View>
                            </View>
                        </Animatable.View>
                        :
                        <Animatable.View animation="fadeIn">
                            <View style={styles.image}>
                                {
                                    this.renderImage(avatar)
                                }
                            </View>
                            <View style={{
                                position: 'absolute',
                                flex: 1,
                                width,
                                height: 220
                            }}>
                                <View
                                    style={{
                                        position: 'absolute', width: Screen.width, height: 220
                                    }}>
                                    <View style={[styles.gradientBottomItem, {
                                        backgroundColor: 'rgba(0,0,0,0.6)',
                                        top: 0,
                                        bottom: 0,
                                        left: 0,
                                        right: 0
                                    }]}>
                                        <Text style={{
                                            color: 'white',
                                            fontWeight: '400',
                                            fontSize: 13
                                        }}>✺ Thời gian đăng: {timeAgo}</Text>
                                        <View style={{
                                            marginTop: 2,
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={{
                                                color: 'white',
                                                fontWeight: '400',
                                                fontSize: 13
                                            }}>✺ Trạng thái: </Text>
                                            <View style={{
                                                backgroundColor: pending ? 'orange' : 'green',
                                                paddingHorizontal: 5,
                                                paddingVertical: 2,
                                                borderRadius: 3,
                                                borderWidth: 1,
                                                borderColor: 'white'
                                            }}>
                                                <Text style={{
                                                    color: 'white',
                                                    fontWeight: '500',
                                                    fontSize: 12
                                                }}>{pending ? "Đang duyệt tin" : "Tin đã được duyệt"}</Text>
                                            </View>
                                            {
                                                is_hidden ?
                                                    <View>
                                                        <View style={{
                                                            backgroundColor: 'red',
                                                            paddingHorizontal: 5,
                                                            paddingVertical: 2,
                                                            borderRadius: 3,
                                                            marginStart: 4,
                                                            borderWidth: 1,
                                                            borderColor: 'white'
                                                        }}>
                                                            <Text style={{
                                                                color: 'white',
                                                                fontWeight: '500',
                                                                fontSize: 12
                                                            }}>Tin đã ẩn</Text>
                                                        </View>
                                                    </View>
                                                    : null
                                            }
                                        </View>
                                        {
                                            this.props.dataItem.status_post
                                                ?
                                                <View style={{
                                                    flex: 1,
                                                    marginVertical: 16,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    borderWidth: 0.3,
                                                    borderColor: 'white',
                                                    borderRadius: 3
                                                }}>
                                                    <Animatable.Text
                                                        animation="pulse"
                                                        iterationCount="infinite"
                                                        direction="alternate"
                                                        style={{
                                                            color: 'white',
                                                            fontSize: 14,
                                                            marginBottom: 5
                                                        }}>{this.props.dataItem.status_post}</Animatable.Text>
                                                    <ActivityIndicator size='small' color="white" />
                                                </View>
                                                :
                                                <View style={{
                                                    flex: 1,
                                                    marginVertical: 16,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    borderWidth: 0.3,
                                                    borderColor: 'white',
                                                    borderRadius: 3,
                                                    zIndex: 9999
                                                }}>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            try {
                                                                Actions.detailProduct({
                                                                    data: this.props.dataItem,
                                                                    index: 0
                                                                })
                                                            } catch (error) {

                                                            }
                                                        }}
                                                        style={{
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            flex: 1
                                                        }}
                                                    >
                                                        <MaterialIcons name="pageview" size={20} color="white"
                                                            style={{
                                                                borderRadius: 5,
                                                                borderColor: 'white',
                                                                borderWidth: 1,
                                                                padding: 5,
                                                                width: 32,
                                                                height: 32
                                                            }}
                                                        />
                                                        <Text style={{
                                                            fontSize: 11,
                                                            marginTop: 3,
                                                            color: 'white'
                                                        }}>Xem tin</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            Actions.addProduct({
                                                                dataEdit: this.props.dataItem,
                                                                isUpdate: true
                                                            })
                                                        }}
                                                        style={{
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            flex: 1
                                                        }}
                                                    >
                                                        <MaterialIcons name="edit" size={20} color="white"
                                                            style={{
                                                                borderRadius: 5,
                                                                borderColor: 'white',
                                                                borderWidth: 1,
                                                                padding: 5,
                                                                width: 32,
                                                                height: 32
                                                            }}
                                                        />
                                                        <Text style={{
                                                            fontSize: 11,
                                                            marginTop: 3,
                                                            color: 'white'
                                                        }}>Sửa tin</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            this.props.onDelete(product_id)
                                                        }}
                                                        style={{
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            flex: 1
                                                        }}
                                                    >
                                                        <MaterialIcons name="delete" size={20} color="white"
                                                            style={{
                                                                borderRadius: 5,
                                                                borderColor: 'white',
                                                                borderWidth: 1,
                                                                padding: 5,
                                                                width: 32,
                                                                height: 32
                                                            }}
                                                        />
                                                        <Text style={{
                                                            fontSize: 11,
                                                            marginTop: 3,
                                                            color: 'white'
                                                        }}>Gỡ tin</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            this.props.onHidden(product_id, is_hidden)
                                                        }}
                                                        style={{
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            flex: 1
                                                        }}
                                                    >
                                                        <Entypo name={is_hidden ? "eye" : "eye-with-line"} size={20} color="white"
                                                            style={{
                                                                borderRadius: 5,
                                                                borderColor: 'white',
                                                                borderWidth: 1,
                                                                padding: 5,
                                                                width: 32,
                                                                height: 32
                                                            }}
                                                        />
                                                        <Text style={{
                                                            fontSize: 11,
                                                            marginTop: 3,
                                                            color: 'white'
                                                        }}>{is_hidden ? "Hiện thị tin" : "Ẩn tin"}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                        }
                                        <View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ flex: 1 }}>
                                                    <View style={styles.viewMoney}>
                                                        <View style={styles.iconViewMoney}>
                                                            <MaterialIcons name={"attach-money"} size={10} color={'white'} />
                                                        </View>
                                                        <View>
                                                            <Text style={styles.txtMoney}>{price}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.viewAcreage}>
                                                        <View style={styles.iconViewAcreage}>
                                                            <FontAwesome name={"home"} size={10} color={'white'} />
                                                        </View>
                                                        <Text
                                                            numberOfLines={1}
                                                            style={styles.txtAcreage}>{acreage} m²</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5 }}>
                                                        <Text style={[styles.txtMoney, { marginStart: 0 }]}>{beds}</Text>
                                                        <Text style={[styles.txtAddress, { marginStart: 0 }]}>P.Ngủ</Text>
                                                    </View>
                                                    <View style={{
                                                        borderLeftWidth: 0.5, borderColor: 'white', justifyContent: 'center',
                                                        alignItems: 'center', paddingHorizontal: 5, marginVertical: 5
                                                    }}>
                                                        <Text style={[styles.txtMoney, { marginStart: 0 }]}>{toilets}</Text>
                                                        <Text style={[styles.txtAddress, { marginStart: 0 }]}>WC</Text>
                                                    </View>
                                                    <View style={{
                                                        borderLeftWidth: 0.5, borderColor: 'white', justifyContent: 'center',
                                                        alignItems: 'center', paddingHorizontal: 5, marginVertical: 5
                                                    }}>
                                                        <Text style={[styles.txtMoney, { marginStart: 0 }]}>{floor}</Text>
                                                        <Text style={[styles.txtAddress, { marginStart: 0 }]}>Tầng</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.viewAddress}>
                                                <View style={styles.iconViewAddress}>
                                                    <Entypo name={"location"} size={10} color={'white'} />
                                                </View>
                                                <Text
                                                    numberOfLines={1}
                                                    style={styles.txtAddress}>{address}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Animatable.View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width,
        height: 220,
        backgroundColor: 'transparent'
    },
    photo: {
        height: 220,
    },
    containerItem: {
        width: '100%'
    },
    gradientBottomItem: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 8
    },
    gradientTopItem: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 50
    },
    viewMoney: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconViewMoney: {
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 2,
        backgroundColor: 'green',
        height: 15,
        width: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtMoney: {
        color: 'white',
        fontSize: 13,
        marginStart: 5,
        fontWeight: 'bold'
    },
    viewAcreage: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    iconViewAcreage: {
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 2,
        backgroundColor: 'green',
        height: 15,
        width: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtAcreage: {
        marginStart: 5,
        color: 'white',
        fontSize: 13,
        fontWeight: '500'
    },
    viewAddress: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 1
    },
    viewTimeAgo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    iconViewAddress: {
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 2,
        backgroundColor: 'green',
        height: 15,
        width: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtAddress: {
        marginStart: 5,
        color: 'white',
        fontSize: 12,
        fontWeight: '400'
    }
})
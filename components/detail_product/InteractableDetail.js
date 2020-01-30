import React, { Component } from 'react';
import {
    Animated,
    Dimensions,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Linking,
} from 'react-native';
import HeaderImage from './HeaderImage'
import ContentDetail from '../../containers/detail_product/ContentDetail'
import Ionicons from 'react-native-vector-icons/Ionicons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Utilities from '../../utils/Utilities';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import { insertProductFavourite, checkProductLikeToExist, dislikeProductByProductId } from '../../database/ProductOfFavouriteSchema'

const HEADER_EXPANDED_HEIGHT = 220;
const HEADER_TOOLBAR_HEIGHT = 56;
const PADDING_ICON = Utilities.checkAndroidOS() ? 0 : Utilities.checkIphoneX() ? 30 : 16;

const { width } = Dimensions.get("screen")

class Toolbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            like: false
        }
    }

    async componentWillReceiveProps(props) {
        try {
            let res = await checkProductLikeToExist(props.dataItem.product_id);
            if (res !== this.state.like) {
                this.setState({
                    like: res
                })
            }
        } catch (error) {

        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextState.like !== this.state.like
    // }

    render() {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <TouchableOpacity
                    onPress={() => {
                        if (this.props.hideHeaderImage) {
                            var phoneNumber = this.props.dataItem && this.props.dataItem.owner_info
                                && this.props.dataItem.owner_info.phone ? this.props.dataItem.owner_info.phone : null
                            if (phoneNumber) {
                                Linking.openURL(`tel:${phoneNumber}`)
                            } else {
                                Utilities.showToast("Ngưởi đăng tin không có số điện thoại")
                            }
                        }
                    }}
                >
                    <SimpleLineIcons name={"call-out"}
                        size={18}
                        color={'rgba(0,0,0,0.8)'} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        if (this.props.hideHeaderImage) {
                            if (this.state.like) {
                                dislikeProductByProductId(this.props.dataItem.product_id)
                                    .then(res => {
                                        if (res == true) {
                                            Utilities.showToast("Bỏ thích", "red")
                                            this.setState({ like: false })
                                            this.props.onDislikeProduct(this.props.dataItem.product_id)
                                        }
                                    }).catch((error) => {
                                    })
                            } else {
                                insertProductFavourite(this.props.dataItem).then(res => {
                                    if (res == true) {
                                        Utilities.showToast("Đã thích", "green");
                                        this.setState({ like: true })
                                        this.props.onLikeProduct(this.props.dataItem)
                                    }
                                }).catch((error) => {
                                    Utilities.log(error.message)
                                })
                            }
                        }
                    }}>
                    <MaterialIcons name={this.state.like ? "favorite" : "favorite-border"}
                        size={20}
                        color={'rgba(0,0,0,0.8)'}
                        style={{
                            paddingHorizontal: 20
                        }} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        if (this.props.hideHeaderImage) {
                            alert("Comming soon!")
                        }
                    }}>
                    <SimpleLineIcons name={"share"}
                        size={18}
                        color={'rgba(0,0,0,0.8)'} />
                </TouchableOpacity>
            </View>
        )
    }
}

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scrollY: new Animated.Value(0),
            hideHeaderImage: false,
            refresh: false
        }
        this._nextToPreview = this._nextToPreview.bind(this)
        this._index = 0
    }

    _nextToPreview() {
        try {
            var listImages = this.props.dataItem.images
                ?
                this.props.dataItem.images.map(e => {
                    return e.replace("/200x200/", "/745x510/")
                })
                :
                []

            if (listImages.length != 0) {
                Actions.previewImage({
                    listImages,
                    index: this._index
                })
            } else {
                Utilities.showToast("Bất động sản này hiện không có ảnh!")
            }
        } catch (error) {
            Utilities.showToast("Có lỗi xảy ra, vui lòng thử lại sau!")
        }
    }

    _changeIndexSlider(index) {
        this._index = index
    }

    render() {
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_TOOLBAR_HEIGHT],
            outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_TOOLBAR_HEIGHT],
            extrapolate: 'clamp'
        });
        const headerToolbarOpacity = this.state.scrollY.interpolate({
            inputRange: [HEADER_EXPANDED_HEIGHT - HEADER_TOOLBAR_HEIGHT, HEADER_EXPANDED_HEIGHT],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });
        const headerImageOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_TOOLBAR_HEIGHT - 150],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        });
        const headerOptionsOpacity = this.state.scrollY.interpolate({
            inputRange: [HEADER_EXPANDED_HEIGHT + 120, HEADER_EXPANDED_HEIGHT + 150],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });
        return (
            <View
                style={styles.container}>
                <Animated.View
                    style={[styles.header, {
                        // height: headerHeight
                    }]}>
                    <Animated.View
                        style={{
                            opacity: headerImageOpacity,
                            display: this.state.hideHeaderImage ? 'none' : null
                        }}>
                        <Animated.View
                            style={{
                                zIndex: 99,
                                opacity: this.props.minimize,
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                            }}>
                            <LinearGradient
                                style={{
                                    height: HEADER_TOOLBAR_HEIGHT,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                colors={[
                                    'rgba(255,255,255,0.6)',
                                    'rgba(255,255,255,0.3)',
                                    'rgba(255,255,255,0)'
                                ]} >

                                <TouchableOpacity
                                    onPress={() => this.props.onSnapMinimize()}>
                                    <Ionicons name={"ios-arrow-down"}
                                        size={28}
                                        color={'rgba(0, 0, 0, 0.8)'}
                                        style={{
                                            paddingTop: PADDING_ICON,
                                            paddingHorizontal: 16,
                                        }}
                                    />
                                </TouchableOpacity>
                                <View style={{ flex: 1 }} />
                                <TouchableOpacity
                                    onPress={() => this._nextToPreview()}>
                                    <MaterialCommunityIcons name="arrow-expand"
                                        size={24}
                                        color={'rgba(0, 0, 0, 0.8)'}
                                        style={{
                                            paddingTop: PADDING_ICON,
                                            paddingHorizontal: 16,
                                        }}
                                    />
                                </TouchableOpacity>

                            </LinearGradient>
                        </Animated.View>
                        <HeaderImage
                            changeIndex={(index) => this._changeIndexSlider(index)}

                            // height={headerHeight}
                            dataItem={this.props.dataItem}
                            onHideInfoInImage={() => { this.props.onHideInfoInImage() }}
                            onSnapFillScreen={() => { this.props.onSnapFillScreen() }} />
                    </Animated.View>
                </Animated.View>
                <Animated.View
                    pointerEvents={this.state.hideHeaderImage ? null : 'none'}
                    style={{
                        zIndex: 10,
                        opacity: headerToolbarOpacity,
                        position: 'absolute',
                        height: HEADER_TOOLBAR_HEIGHT,
                        backgroundColor: 'white',
                        top: 0,
                        left: 0,
                        right: 0,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 16,
                        borderBottomWidth: 0.5,
                        borderColor: 'rgba(0,0,0,0.3)',
                        paddingTop: PADDING_ICON,
                        display: this.state.hideHeaderImage ? null : 'none'
                    }}>
                    <TouchableOpacity style={{ zIndex: 3 }}
                        onPress={() => {
                            if (this.state.hideHeaderImage) {
                                this.scrollViewDetail.scrollTo({ x: 0, y: 0, animated: false })
                                this.props.onSnapMinimize()
                            }
                        }}
                    >
                        <Ionicons name={"ios-arrow-down"}
                            size={28}
                            color={'rgba(0,0,0,0.8)'} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }} />
                    <Animated.View
                        style={{
                            opacity: headerOptionsOpacity
                        }}
                    >
                        <Toolbar
                            hideHeaderImage={this.state.hideHeaderImage}
                            dataItem={this.props.dataItem}
                            onLikeProduct={(product) => {
                                this.props.addProductsFavouriteAction(product)
                                this.setState({
                                    refresh: !this.state.refresh
                                })
                            }}
                            onDislikeProduct={(product_id) => {
                                this.props.deleteProductsFavouriteAction(product_id)
                                this.setState({
                                    refresh: !this.state.refresh
                                })
                            }}
                        />
                    </Animated.View>
                </Animated.View>
                <ScrollView
                    ref={ref => this.scrollViewDetail = ref}
                    contentContainerStyle={styles.scrollContainer}
                    onScroll={
                        Animated.event(
                            [{
                                nativeEvent: {
                                    contentOffset: {
                                        y: this.state.scrollY
                                    }
                                }
                            }],
                            {
                                listener: event => {
                                    if (event.nativeEvent.contentOffset.y > (HEADER_EXPANDED_HEIGHT - HEADER_TOOLBAR_HEIGHT - 150)) {
                                        this.setState({
                                            hideHeaderImage: true
                                        })
                                    } else {
                                        this.setState({
                                            hideHeaderImage: false
                                        })
                                    }
                                }
                            })
                    }
                    scrollEventThrottle={16}>
                    <ContentDetail data={this.props.dataItem} refresh={this.state.refresh} />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContainer: {
        paddingTop: HEADER_EXPANDED_HEIGHT
    },
    header: {
        backgroundColor: 'white',
        position: 'absolute',
        width,
        top: 0,
        left: 0,
        zIndex: 9999
    },
    title: {
        marginVertical: 16,
        color: "rgba(0, 0, 0, 0.8)",
        fontWeight: "bold",
        fontSize: 24
    }
});
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
    ActivityIndicator
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
import { insertProductFavourite, checkProductLikeToExist, dislikeProductByProductId } from '../../database/ProductOfFavouriteSchema';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const HEADER_EXPANDED_HEIGHT = 220;
const HEADER_TOOLBAR_HEIGHT = Utilities.checkIphoneX() ? 86 : 56;
const PADDING_ICON = Utilities.checkAndroidOS() ? 0 : Utilities.checkIphoneX() ? 30 : 16;
const { width: SCREEN_WIDTH } = Dimensions.get("screen")

class Toolbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            like: false
        };
    }

    async componentWillReceiveProps(props) {
        try {
            let res = await checkProductLikeToExist(props.data.product_id);
            if (res !== this.state.like) {
                this.setState({
                    like: res
                })
            }
        } catch (error) {

        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.like !== this.state.like
    }

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
                            var phoneNumber = this.props.data && this.props.data.owner_info
                                && this.props.data.owner_info.phone ? this.props.data.owner_info.phone : null
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
                                dislikeProductByProductId(this.props.data.product_id)
                                    .then(res => {
                                        if (res == true) {
                                            Utilities.showToast("Bỏ thích", "red");
                                            this.setState({ like: false })
                                            this.props.onDislikeProduct(this.props.data.product_id)
                                        }
                                    }).catch()
                            } else {
                                insertProductFavourite(this.props.data)
                                    .then(res => {
                                        if (res == true) {
                                            Utilities.showToast("Đã thích", "green");
                                            this.setState({ like: true })
                                            this.props.onLikeProduct(this.props.data)
                                        }
                                    }).catch()
                            }
                        }
                    }
                    }>
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

export default class DetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            scrollY: new Animated.Value(0),
            hideHeaderImage: false,
            refresh: false
        }
        this._nextToPreview = this._nextToPreview.bind(this)

        if (this.props.index) {
            this._index = Number(this.props.index) >= 0 ? this.props.index : 0;
        } else {
            this._index = 0;
        }

    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     if (JSON.stringify(this.state) === JSON.stringify(nextState)
    //         && JSON.stringify(nextProps.data) === JSON.stringify(this.props.data)) {
    //         return false
    //     }
    //     return true
    // }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 300);
    }

    _nextToPreview() {
        try {
            var listImages = this.props.data.images
                ?
                this.props.data.images.map(e => {
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
        const headerToolbarOpacity = this.state.scrollY.interpolate({
            inputRange: [HEADER_EXPANDED_HEIGHT - HEADER_TOOLBAR_HEIGHT, HEADER_EXPANDED_HEIGHT],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });
        const headerOptionsOpacity = this.state.scrollY.interpolate({
            inputRange: [HEADER_EXPANDED_HEIGHT + 120, HEADER_EXPANDED_HEIGHT + 150],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });

        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="small" color="black" style={{ alignSelf: 'center', flex: 1 }} />
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Animated.View
                    style={{
                        display: this.state.hideHeaderImage ? null : 'none',
                        zIndex: 5,
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
                        paddingTop: PADDING_ICON
                    }}>
                    <TouchableOpacity style={{ zIndex: 3 }}
                        onPress={() => {
                            if (this.state.hideHeaderImage) {
                                Actions.pop()
                            }
                        }}
                    >
                        <Ionicons name={"ios-arrow-back"}
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
                            onLikeProduct={(product) => {
                                this.props.refreshInfoDetailProductAction()
                                this.props.deleteProductsFavouriteAction(product)
                                this.setState({ refresh: !this.state.refresh })
                            }}
                            onDislikeProduct={(product_id) => {
                                this.props.refreshInfoDetailProductAction()
                                this.props.addProductsFavouriteAction(product_id)
                                this.setState({ refresh: !this.state.refresh })
                            }}
                            hideHeaderImage={this.state.hideHeaderImage}
                            data={this.props.data}
                        />
                    </Animated.View>
                </Animated.View>
                <View
                    style={[
                        { display: this.state.hideHeaderImage ? 'none' : null },
                        Utilities.checkAndroidOS() ? {} : { zIndex: 9999 }
                    ]}
                >
                    <LinearGradient
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: HEADER_TOOLBAR_HEIGHT,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 9999
                        }}
                        colors={[
                            'rgba(255,255,255,0.6)',
                            'rgba(255,255,255,0.3)',
                            'rgba(255,255,255,0)'
                        ]} >

                        <TouchableOpacity
                            style={{
                                paddingTop: PADDING_ICON,
                                paddingHorizontal: 16
                            }}
                            onPress={() => {
                                Actions.pop()
                            }}>
                            <Ionicons name={"ios-arrow-back"}
                                size={28}
                                color={'black'} />
                        </TouchableOpacity>
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity
                            style={{
                                paddingTop: PADDING_ICON,
                                paddingHorizontal: 16
                            }}
                            onPress={() => this._nextToPreview()}
                        >
                            <MaterialCommunityIcons name="arrow-expand"
                                size={24}
                                color={'black'} />
                        </TouchableOpacity>

                    </LinearGradient>
                </View>
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
                                    if (event.nativeEvent.contentOffset.y > (HEADER_EXPANDED_HEIGHT - HEADER_TOOLBAR_HEIGHT)) {
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
                    <HeaderImage
                        itemList={true}
                        index={this.props.index}
                        changeIndex={(index) => this._changeIndexSlider(index)}
                        dataItem={this.props.data}
                        onSnapFillScreen={() => this.props.onSnapFillScreen()} />
                    <ContentDetail data={this.props.data} refresh={this.state.refresh} />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: getBottomSpace()
    },
    scrollContainer: {

    },
    header: {
        backgroundColor: 'white',
        position: 'absolute',
        width: SCREEN_WIDTH,
        top: 0,
        left: 0
    },
    title: {
        marginVertical: 16,
        color: "black",
        fontWeight: "bold",
        fontSize: 24
    }
});
import React, { Component } from 'react'
import {
    Text, Platform, View, TouchableOpacity, AsyncStorage, RefreshControl,
    Alert, Animated, FlatList, ScrollView, Dimensions, ActivityIndicator,
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MapView, { PROVIDER_GOOGLE, Polygon, Polyline } from 'react-native-maps';
import Toolbar from '../../containers/map/ToolbarMainScreen';
import { styles } from './style/CssMainScreen'
import { connect } from 'react-redux'
import MapMarker from '../../containers/map/MapMarker.js';
import ViewProductInfo from './ViewProductInfo.js';
import { Actions } from 'react-native-router-flux';
import Utilities from '../../utils/Utilities';
import * as Constants from '../../constants/Constants'
import Permissions from 'react-native-permissions'
import ItemProduct from './ItemProduct';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height

let count = 0;
let polylineDrawTemp = [];
let boundingBoxTemp = [];
let zoomLevel = 0;
let locations_id = {};
let page = 0;

class LoadingComponent extends Component {
    render() {
        if (!this.props.loading) {
            return null
        }
        return (
            <View style={{
                height: 40,
                width: 40,
                position: 'absolute',
                zIndex: 99,
                bottom: 10,
                alignSelf: 'center',
                backgroundColor: 'rgba(0,0,0,0.6)',
                borderRadius: 5
            }}>
                <ActivityIndicator size='small' color='white' style={{ flex: 1, alignSelf: 'center' }} />
            </View>
        )
    }
}

const mapStateToProps = ({ mainMap }) => {
    return {
        loading: mainMap.loading
    }
}

const LoadingComponentContainer = connect(mapStateToProps)(LoadingComponent)

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapReady: false,
            polygons: [],
            isMapTypeDefault: true,
            polylineDraw: [],
            drawing: false,
            endDrawing: false,
            scrollMap: true,
            scrollY: new Animated.Value(0),
            refreshingList: false
        }
        global.fittedToMap = null
        this.timeout = 1000
        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.timer = null;
    }

    componentWillMount() {
        page = 0
        level = -1
        cityName = null
        districtName = null
        global.fittedToMap = null

        this.animatedValue = new Animated.Value(0)
        this.value = 0;
        this.animatedValue.addListener(({ value }) => {
            this.value = value;
        })
        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
        })
        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })
    }

    componentDidMount() {
        // AsyncStorage.removeItem(CONSTANTS.HISTORY_SEARCH)
        this.setState({
            minZoomLevel: null
        })
    }

    _renderPolygonLocation(locations) {
        try {
            Utilities.log(locations)
            if (this.state.mapReady) {
                if (global.firstOpenApp) {
                    this.map.fitToCoordinates(this.props.polyFitLocationSearch)
                    global.firstOpenApp = false
                } else {
                    if (this.props.listSearch.length > 0
                        && this.props.polyFitLocationSearch.length > 0
                        && JSON.stringify(this.props.polyFitLocationSearch) !== JSON.stringify(global.fittedToMap)
                        && global.fittedToMap !== null) {

                        global.fittedToMap = this.props.polyFitLocationSearch
                        if (global.fittedToMap.length == 2) {
                            if (JSON.stringify(global.fittedToMap[0]) === JSON.stringify(global.fittedToMap[1])) {
                                this.map.animateToRegion({
                                    ...global.fittedToMap[0],
                                    latitudeDelta: 0.014,
                                    longitudeDelta: 0.014 * ASPECT_RATIO
                                })
                            } else {
                                this.map.fitToCoordinates(global.fittedToMap)
                            }
                        }
                    } else {
                        if (global.fittedToMap === null) {
                            global.fittedToMap = this.props.polyFitLocationSearch

                            if (this.props.mapBoundingBox.length > 0) {
                                this.map.fitToCoordinates(this.props.mapBoundingBox)
                            }
                        }
                    }
                }

                var listPolygons = []

                locations.map(location => {
                    location.location.map(element => {
                        listPolygons.push(
                            <Polygon
                                coordinates={element}
                                strokeColor="red"
                                strokeWidth={1} />
                        )
                    });
                });

                if (listPolygons.length > 0) {
                    return listPolygons
                } else {
                    return null
                }
            } else {
                return null
            }
        } catch (error) {
            return null
        }
    }

    _handleClickMarker = (marker) => {
        try {
            this.props.showLoadingMap(true)
            switch (zoomLevel) {
                case 0:
                    var zoomLevelTmp = 11
                    var longitudeDelta = 360 / (Math.pow(2, zoomLevelTmp))
                    zoomLevel++
                    this.map.animateToRegion({
                        ...marker.coordinates,
                        latitudeDelta: longitudeDelta,
                        longitudeDelta: longitudeDelta * ASPECT_RATIO
                    }, 1000)
                    break;
                case 1:
                    var zoomLevelTmp = 13
                    var longitudeDelta = 360 / (Math.pow(2, zoomLevelTmp))
                    zoomLevel++
                    this.map.animateToRegion({
                        ...marker.coordinates,
                        latitudeDelta: longitudeDelta,
                        longitudeDelta: longitudeDelta * ASPECT_RATIO
                    }, 1000)
                    break;
                case 2:
                    var zoomLevelTmp = 14
                    var longitudeDelta = 360 / (Math.pow(2, zoomLevelTmp))
                    zoomLevel++
                    this.map.animateToRegion({
                        ...marker.coordinates,
                        latitudeDelta: longitudeDelta,
                        longitudeDelta: longitudeDelta * ASPECT_RATIO
                    }, 1000)
                    break;
                default:
                    if (global.markerSelected) {
                        global.markerSelectedOld = global.markerSelected
                        global.markerSelected = marker
                    } else {
                        global.markerSelectedOld = null
                        global.markerSelected = marker
                    }

                    if (marker.hasOwnProperty('list')) {
                        this.props.pushDataToDetail(marker, true)
                        this.productView.showDetail(true, true)
                    } else {
                        this.props.pushDataToDetail(marker, false)
                        this.productView.showDetail(true, false)
                    }
                    break;
            }
            this.props.showLoadingMap(false)
        } catch (error) {
            //   alert(error)
        }
    }

    _handleRegionChange(place) {
        try {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }

            this.timeout = setTimeout(async () => {
                let zoomTemp = (Math.round(Math.log(360 / place.longitudeDelta) / Math.LN2))

                AsyncStorage.setItem(Constants.LAST_REGION, JSON.stringify(place))
                this.props.showLoadingMap(true)
                zoomLevel = 0;

                if (zoomTemp >= 14) {
                    zoomLevel = 3;
                } else if (zoomTemp >= 13) {
                    zoomLevel = 2;
                } else if (zoomTemp >= 11) {
                    zoomLevel = 1;
                } else {
                    zoomLevel = 0;
                }

                var box = await this.map.getMapBoundaries();

                boundingBoxTemp = [
                    {
                        longitude: box.northEast.longitude,
                        latitude: box.northEast.latitude
                    },
                    {
                        longitude: box.southWest.longitude,
                        latitude: box.northEast.latitude
                    },
                    {
                        longitude: box.southWest.longitude,
                        latitude: box.southWest.latitude
                    },
                    {
                        longitude: box.northEast.longitude,
                        latitude: box.southWest.latitude
                    }
                ]

                if (this.value < 90) {
                    this._findProducts(true, true, null, null, null);
                } else {
                    page = 0
                    this._findProducts(true, false, 0, 5, page)
                }
            }, Platform.OS === 'android' ? 1500 : 1000)
        } catch (error) {
            //  alert(error)
        }
    }

    _fomatPolygon(polygon) {
        try {
            var polyTemp = polygon.concat(polygon[0])
            var polygonFomated = "";
            polyTemp.forEach((value, index) => {
                polygonFomated += value.longitude + " " + value.latitude;
                if (index != polyTemp.length - 1) polygonFomated += "|";
            });
            return polygonFomated;
        } catch (error) {
        }
    }

    _findProducts(isDraw, groupPoint, skip, limit, page) {
        try {
            if (page == null) {
                this.props.showLoadingMap(true)
            }

            var viewport = this._fomatPolygon(boundingBoxTemp)

            if (global.type_of_post) {
                global.dataFilter.type_of_post = global.type_of_post

                AsyncStorage.setItem(Constants.DATA_FILTER, JSON.stringify(global.dataFilter))
            }

            var dataFilter = {
                ...global.dataFilter
            }

            if (dataFilter.min_price) {
                dataFilter.min_price = parseInt(dataFilter.min_price)
            }

            if (dataFilter.max_price) {
                dataFilter.max_price = parseInt(dataFilter.max_price)
            }

            if (dataFilter.category) {
                if (dataFilter.category === "all") {
                    delete dataFilter.category
                }
            }

            var citys_id = []
            var districts_id = []
            var wards_id = []
            var streets_id = []
            var project_id = []

            this.props.listSearch.forEach(element => {
                switch (element.level) {
                    case 1:
                        citys_id.push(element.code)
                        break
                    case 2:
                        districts_id.push(element.code)
                        break
                    case 3:
                        wards_id.push(element.code)
                        break
                    case 4:
                        streets_id.push(element.code)
                        break
                    case 5:
                        project_id.push(element.code)
                        break
                    default:
                        break
                }
            });

            locations_id = {
                citys_id,
                districts_id,
                wards_id,
                streets_id,
                project_id
            }

            this.props.getProducts(
                zoomLevel,// zoomlevel
                viewport,// viewport
                dataFilter.category ? dataFilter.category : null,// category
                citys_id,// citys_id
                districts_id,// districts_id
                wards_id,// wards_id
                streets_id,// streets_id
                project_id,// project_id
                dataFilter.type_of_post ? dataFilter.type_of_post : 1,// type_of_post
                dataFilter.min_price ? dataFilter.min_price : null,// min_price
                dataFilter.max_price ? dataFilter.max_price : null,// max_price
                dataFilter.min_beds ? dataFilter.min_beds : null,// min_beds
                dataFilter.max_beds ? dataFilter.max_beds : null,// max_beds
                dataFilter.min_floors ? dataFilter.min_floors : null,// min_floors
                dataFilter.max_floors ? dataFilter.max_floors : null,// max_floors
                dataFilter.min_acreage ? dataFilter.min_acreage : null,// min_acreage
                dataFilter.max_acreage ? dataFilter.max_acreage : null,// max_acreage
                dataFilter.min_toilets ? dataFilter.min_toilets : null,// min_toilets
                dataFilter.max_toilets ? dataFilter.max_toilets : null,// max_toilets
                groupPoint,// group
                this.state.polylineDraw.length <= 0 || isDraw === false ? null : true,// is_draw
                this.state.polylineDraw.length <= 0 ? null : this._fomatPolygon(this.state.polylineDraw),// poly_draw
                Number.isInteger(limit) ? limit : null,// limit
                Number.isInteger(skip) ? skip : null,// skip,
                boundingBoxTemp, //boundingBox
                page//page loadmore
            )

        } catch (error) {
            this.props.showLoadingMap(false)
            //  alert(error)
        }
    }

    _openFilter = () => {
        try {
            var is_draw = false
            var poly_draw = null
            var viewport = this._fomatPolygon(boundingBoxTemp)

            if (this.state.polylineDraw.length > 0) {
                is_draw = true
                var poly_draw = this._fomatPolygon(this.state.polylineDraw)
            }

            Actions.filterMap({
                isGroup: this.value < 90,
                zoomlevel: zoomLevel,
                viewport,
                is_draw,
                poly_draw,
                locations_id,
                boundingBox: boundingBoxTemp
            })
        } catch (error) {
            // alert(error)
        }

    }

    _openSaveFilter = () => {
        Actions.saveFilter({
            mapBoundingBox: boundingBoxTemp,
            listSearch: this.props.listSearch
        })
    }

    _renderOption = () => {
        return <View >
            <TouchableOpacity style={[styles.btnOptionInMap, { bottom: 130 }]} onPress={() => this.setState({ isMapTypeDefault: !this.state.isMapTypeDefault })}>
                <MaterialCommunityIcons name={!this.state.isMapTypeDefault ? "earth" : "map"} size={18} color="rgba(0,0,0,0.8)" />
                <Text style={{ color: 'rgba(0,0,0,0.8)', fontSize: 9 }}>{!this.state.isMapTypeDefault ? "Bản đồ" : "Vệ tinh"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnOptionInMap, { bottom: 80 }]}
                onPress={() => {
                    count = 0;
                    polylineDrawTemp = [];
                    AsyncStorage.removeItem(Constants.POLY_DRAW)
                    this.props.resetPolyDrawInMap()
                    if (this.state.drawing) {
                        this._findProducts(false, true, null, null, null)
                    }
                    this.setState({
                        drawing: !this.state.drawing,
                        polylineDraw: polylineDrawTemp,
                        endDrawing: false,
                        scrollMap: this.state.drawing
                    })
                }}>
                <FontAwesome name={this.state.drawing ? "close" : "hand-o-up"} size={18} color="rgba(0,0,0,0.8)" />
                <Text style={{ color: 'rgba(0,0,0,0.8)', fontSize: 9 }}>{this.state.drawing ? "Huỷ" : "Vẽ tay"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnOptionInMap, { bottom: 30 }]}
                onPress={() => {
                    try {
                        Permissions.check('location').then(response => {
                            // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
                            switch (response) {
                                case "authorized":
                                    if (Utilities.checkAndroidOS()) {
                                        navigator.geolocation.getCurrentPosition(
                                            (position) => {
                                                try {
                                                    const region = {
                                                        latitude: position.coords.latitude,
                                                        longitude: position.coords.longitude,
                                                        latitudeDelta: 0.01,
                                                        longitudeDelta: 0.01 * ASPECT_RATIO
                                                    };
                                                    this.map.animateToRegion(region)
                                                } catch{ }
                                            },
                                            (error) => {
                                                if (error.code == 2 && Utilities.checkAndroidOS()) {
                                                    LocationServicesDialogBox.checkLocationServicesIsEnabled({
                                                        message: "Để tiếp tục, hãy bật vị trí thiết bị bằng cách sử dụng vị trí của Google",
                                                        ok: "ĐỒNG Ý",
                                                        cancel: "KHÔNG, CẢM ƠN",
                                                        enableHighAccuracy: false,
                                                        showDialog: true,
                                                        openLocationServices: true,
                                                        preventOutSideTouch: false,
                                                        preventBackClick: false,
                                                        providerListener: false
                                                    }).then(function (success) {
                                                    }).catch((error) => {
                                                        Utilities.showToast("Có lỗi xảy ra vui lòng thử lại sau", null, null)
                                                    });
                                                }
                                            }
                                        );
                                    } else {
                                        navigator.geolocation.getCurrentPosition(
                                            (position) => {
                                                const region = {
                                                    latitude: position.coords.latitude,
                                                    longitude: position.coords.longitude,
                                                    latitudeDelta: 0.01,
                                                    longitudeDelta: 0.01 * ASPECT_RATIO
                                                };
                                                this.map.animateToRegion(region)
                                            },
                                            (error) => { }
                                        );
                                    }
                                    break
                                case "denied":
                                    Utilities.showToast("Bạn vui lòng cấp quyền truy cập 'Vị trí' để sử dụng tính năng này")
                                    Alert.alert("Thông báo", "Bạn vui lòng cấp quyền truy cập 'Vị trí' để sử dụng tính năng này",
                                        [
                                            {
                                                text: 'Mở cài đặt',
                                                onPress: () => {
                                                    Permissions.canOpenSettings().then(() => {
                                                        Permissions.openSettings()
                                                    }
                                                    ).catch(() => Utilities.showToast("Có lỗi xảy ra vui lòng thử lại sau", null, null))
                                                }
                                            },
                                            {
                                                text: 'Huỷ',
                                                style: 'cancel'
                                            }
                                        ],
                                        { cancelable: false }
                                    )
                                    break
                                case "restricted":
                                    Utilities.showToast("Quyền truy cập 'Vị trí' bị hạn chế", null, null)
                                    break
                                case "undetermined":
                                    if (Platform.OS === "ios") {
                                        navigator.geolocation.requestAuthorization()
                                    } else {
                                        Permissions.request('location', { type: 'always' })
                                    }
                                    // Utilities.showToast("Bạn vui lòng cấp quyền truy cập 'Vị trí' để sử dụng tính năng này")
                                    break
                            }

                        })
                    } catch (error) {
                        Utilities.showToast(error.message)
                    }
                }} >
                <MaterialCommunityIcons name="near-me" size={18} color='rgba(0,0,0,0.8)' />
                <Text style={{ color: 'rgba(0,0,0,0.8)', fontSize: 9 }}>Gần đây</Text>
            </TouchableOpacity>
        </View >
    }

    flipMap() {
        if (this.value >= 90) {
            this.props.disableViewListProduct(true)
            Animated.spring(this.animatedValue, {
                toValue: 0,
                friction: 8,
                tension: 10
            }).start();
            setTimeout(() => {
                this._findProducts(true, true, null, null, null)
                this.props.cleanListProductAction()
            }, 700)
        } else {
            this.productView._hide()
            this.scrollViewList.scrollTo(0)
            this.props.disableViewListProduct(false)
            Animated.spring(this.animatedValue, {
                toValue: 180,
                friction: 8,
                tension: 10
            }).start();
            setTimeout(() => {
                page = 0
                this._findProducts(true, false, 0, 5, page)
            }, 700)
        }
    }

    isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom
    }

    handleLoadMore() {
        try {
            if (this.props.listProducts && this.props.pageList == page + 1) {
                ++page;
                this._findProducts(true, false, page * 5, 5, page)
            }
        } catch (error) {

        }
    }

    _renderFooterList() {
        return (
            <ActivityIndicator size='small' color='red' style={{ marginVertical: 10 }} />
        )
    }

    _onRefresh = () => {
        page = 0
        this._findProducts(true, false, 0, 5, page)
        this.setState({ refreshingList: true });
        setTimeout(() => {
            this.setState({ refreshingList: false });
        }, 3000)
    }

    render() {
        const frontAnimatedStyle = {
            transform: [
                { rotateY: this.frontInterpolate }
            ]
        }
        const backAnimatedStyle = {
            transform: [
                { rotateY: this.backInterpolate }
            ]
        }

        return (
            <View style={{ flex: 1 }}>
                <View style={{
                    zIndex: 999
                }}>
                    <Toolbar
                        openFilter={this._openFilter}
                        openSaveFilter={this._openSaveFilter}
                        onRefreshMap={() => this._findProducts(true, true, null, null, null)}
                        onRefreshList={() => this._findProducts(true, false, 0, 5, 0)}
                        onFlipMap={() => this.flipMap()} />
                </View>
                <LoadingComponentContainer isMapTypeDefault={this.state.isMapTypeDefault} />
                <View style={styles.container}>
                    <View>
                        <Animated.View
                            style={[{
                                backfaceVisibility: 'hidden',
                            }, frontAnimatedStyle]}
                        >
                            <MapView
                                onTouchEnd={() => {
                                    this.state.drawing && !this.state.endDrawing ? (
                                        AsyncStorage.setItem(Constants.POLY_DRAW, JSON.stringify(polylineDrawTemp)),
                                        this.setState({
                                            polylineDraw: polylineDrawTemp,
                                            endDrawing: true,
                                            scrollMap: true
                                        }),
                                        this._findProducts(true, true, null, null, null)
                                    ) : null
                                }}
                                ref={(ref) => { this.map = ref }}
                                mapType={this.state.isMapTypeDefault ? "standard" : "hybrid"}
                                style={styles.map}
                                provider={Utilities.checkAndroidOS() ? PROVIDER_GOOGLE : null}
                                initialRegion={{
                                    latitude: 20.895155,
                                    longitude: 105.083676,
                                    latitudeDelta: 2.9,
                                    longitudeDelta: 2.9 * ASPECT_RATIO,
                                }}
                                showsMyLocationButton={false}
                                userLocationAnnotationTitle=""
                                showsUserLocation={true}
                                maxZoomLevel={20}
                                minZoomLevel={this.state.minZoomLevel}
                                onMapReady={async () => {
                                    try {
                                        if (global.firstOpenApp) {
                                            global.dataFilter["type_of_post"] = global.type_of_post

                                            this.setState({
                                                minZoomLevel: Utilities.checkAndroidOS() ? 7 : 6,
                                                mapReady: true
                                            })

                                            this.props.eventClickItemSearchLocation(
                                                JSON.parse(global.itemLocation.locations),
                                                global.itemLocation.name,
                                                1,
                                                global.itemLocation.code
                                            )
                                        } else {
                                            var dataFilterTemp = await AsyncStorage.getItem(Constants.DATA_FILTER)
                                            var polyDrawTemp = await AsyncStorage.getItem(Constants.POLY_DRAW)

                                            if (dataFilterTemp) {
                                                global.dataFilter = JSON.parse(dataFilterTemp)

                                                if (!global.dataFilter.hasOwnProperty("type_of_post")) {
                                                    global.dataFilter["type_of_post"] = 1
                                                }
                                            } else {
                                                global.dataFilter["type_of_post"] = 1
                                            }

                                            if (polyDrawTemp) {
                                                this.setState({
                                                    polylineDraw: JSON.parse(polyDrawTemp),
                                                    minZoomLevel: Utilities.checkAndroidOS() ? 7 : 6,
                                                    mapReady: true,
                                                    drawing: true,
                                                    endDrawing: true
                                                })
                                            } else {
                                                this.setState({
                                                    minZoomLevel: Utilities.checkAndroidOS() ? 7 : 6,
                                                    mapReady: true
                                                })
                                            }
                                        }
                                    } catch (error) {
                                    }
                                }}
                                moveOnMarkerPress={false}
                                scrollEnabled={this.state.scrollMap}
                                onPanDrag={e => {
                                    if (this.state.mapReady) {
                                        if (this.state.drawing && !this.state.endDrawing) {
                                            count++;

                                            if (count % 5 == 0) {
                                                polylineDrawTemp = [...polylineDrawTemp, e.nativeEvent.coordinate];
                                                this.setState({
                                                    polylineDraw: polylineDrawTemp
                                                })
                                                return;
                                            }
                                        }
                                    }
                                }}
                                onRegionChangeComplete={e => {
                                    if (this.state.mapReady) {
                                        this._handleRegionChange(e)
                                    }
                                }}
                            >
                                {
                                    this.state.mapReady && this.state.drawing && this.state.endDrawing ?
                                        <Polygon
                                            fillColor={this.state.isMapTypeDefault ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)"}
                                            coordinates={this.state.polylineDraw}
                                            strokeColor="red"
                                            strokeWidth={1}
                                        />
                                        :
                                        <Polyline
                                            coordinates={this.state.polylineDraw}
                                            strokeColor="red"
                                            strokeWidth={1}
                                        />
                                }

                                {this._renderPolygonLocation(this.props.listSearch)}

                                {
                                    this.state.mapReady && this.state.drawing ?
                                        (
                                            this.state.endDrawing ?
                                                this.props.dataMarkerDraw.map(marker => (
                                                    <MapMarker marker={marker}
                                                        coordinate={marker.coordinates}
                                                        price={marker.properties && marker.properties.price
                                                            ? marker.properties.price : -1}
                                                        _handleClickMarker={this._handleClickMarker}
                                                        isMapTypeDefault={this.state.isMapTypeDefault} />
                                                ))
                                                :
                                                null
                                        )
                                        :
                                        (
                                            this.state.mapReady && this.props.dataMarker ?
                                                this.props.dataMarker.map((marker, index) => (
                                                    <MapMarker marker={marker}
                                                        coordinate={marker.coordinates}
                                                        _handleClickMarker={this._handleClickMarker}
                                                        isMapTypeDefault={this.state.isMapTypeDefault} />
                                                ))
                                                : null
                                        )
                                }

                            </MapView>

                            {
                                this.state.drawing ?
                                    <View style={styles.viewNoteDraw}>
                                        <Text style={styles.txtNoteDraw}>Vẽ khu vực bạn muốn tìm</Text>
                                    </View>
                                    : null
                            }
                            {this._renderOption()}

                        </Animated.View>
                        <Animated.View
                            pointerEvents={this.props.disableViewProduct ? 'none' : null}
                            style={[backAnimatedStyle, {
                                backfaceVisibility: 'hidden',
                                position: "absolute",
                                top: 0,
                                height: "100%",
                                width: Dimensions.get('window').width,
                                backgroundColor: 'white'
                            }]}>
                            <ScrollView
                                ref={ref => this.scrollViewList = ref}
                                scrollEventThrottle={16}
                                refreshControl={
                                    <RefreshControl refreshing={this.state.refreshingList} onRefresh={this._onRefresh} />
                                }
                                onScroll={Animated.event(
                                    [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
                                )}
                                onMomentumScrollEnd={({ nativeEvent }) => {
                                    if (this.isCloseToBottom(nativeEvent)) {
                                        this.handleLoadMore()
                                    }
                                }}
                            >
                                <FlatList
                                    removeClippedSubviews={true}
                                    initialNumToRender={5}
                                    windowSize={6}
                                    scrollEnabled={false}
                                    ListFooterComponent={this.props.endList ? null : this._renderFooterList}
                                    data={this.props.listProducts}
                                    extraData={this.props}
                                    keyExtractor={(item) => item.product_id}
                                    renderItem={({ item, index }) => (
                                        <ItemProduct dataItem={item} />
                                    )} />
                            </ScrollView>
                        </Animated.View>
                    </View>
                </View>

                <ViewProductInfo passRefUpward={ref => (this.productView = ref)} />

            </View>

        )
    }
}
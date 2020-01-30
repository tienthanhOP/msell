import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Animated,
    Dimensions,
    AsyncStorage,
    StatusBar
} from "react-native"
import * as Constants from '../constants/Constants'
import axios from 'axios'
import { insertCitys } from '../database/CitysSchema'
import { insertDistricts } from '../database/DistrictsSchema'
import { insertWards } from '../database/WardsSchema'
import { insertStreets } from '../database/StreetsSchema'
import { insertCategories } from '../database/CategoriesSchema'
import { insertProperties } from '../database/PropertiesSchema'
const { width } = Dimensions.get("window")
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
import App from '../App';
import Introduce from "./Introduce";
import Utilities from "../utils/Utilities";
import { getBottomSpace } from 'react-native-iphone-x-helper';

class Progress extends Component {
    constructor(props) {
        super(props)
        this.state = {
            percent: 0,
            downloaded: 0
        }
        this.sizeTotal = 0
        this.countFileDownload = 0
        this.countFileDownloaded = 0
    }


    async componentDidMount() {
        try {
            const sizeCitys = 324299;
            const sizeDistricts = 4253380;
            const sizeWards = 1372107;
            const sizeStreets = 1464105;
            const sizeCategories = 3506;
            const sizeProperties = 941;
            let header = {
                "Cache-Control": "no-cache"
            };
            var responseVersion = await fetch(Constants.VERSION_URL)
            var updateCitys = false
            var updateDistricts = false
            var updateWards = false
            var updateStreets = false
            var updateCategories = false
            var updateProperties = false

            var currentVersion = await AsyncStorage.getItem(Constants.VERSION_CURRENT)

            if (responseVersion.status == 200) {
                var version = await responseVersion.json()

                if (!currentVersion) {
                    currentVersion = {
                        version_citys: 0,
                        version_districts: 0,
                        version_wards: 0,
                        version_streets: 0,
                        version_categories: 0,
                        version_properties: 0
                    }
                } else {
                    currentVersion = JSON.parse(currentVersion)
                }

                if (version.version_citys > currentVersion.version_citys) {
                    this.sizeTotal += sizeCitys
                    updateCitys = true
                    this.countFileDownload++
                }
                if (version.version_districts > currentVersion.version_districts) {
                    this.sizeTotal += sizeDistricts
                    updateDistricts = true
                    this.countFileDownload++
                }
                if (version.version_wards > currentVersion.version_wards) {
                    this.sizeTotal += sizeWards
                    updateWards = true
                    this.countFileDownload++
                }
                if (version.version_streets > currentVersion.version_streets) {
                    this.sizeTotal += sizeStreets
                    updateStreets = true
                    this.countFileDownload++
                }
                if (version.version_categories > currentVersion.version_categories) {
                    this.sizeTotal += sizeCategories
                    updateCategories = true
                    this.countFileDownload++
                }
                if (version.version_properties > currentVersion.version_properties) {
                    this.sizeTotal += sizeProperties
                    updateProperties = true
                    this.countFileDownload++
                }

                let sizeCitysLoaded = 0;
                let sizeDistrictsLoaded = 0;
                let sizeWardsLoaded = 0;
                let sizeStreetsLoaded = 0;
                let sizeCategoriesLoaded = 0;
                let sizePropertiesLoaded = 0;

                if (!updateCitys && !updateDistricts && !updateWards && !updateStreets && !updateCategories && !updateProperties) {
                    this.setState({
                        percent: 100
                    })

                    this.nextToMainScreen(true)
                } else {
                    if (updateCitys) {
                        axios.get(Constants.CITYS_URL, {
                            headers: header,
                            onDownloadProgress: (progressEvent) => {
                                sizeCitysLoaded = progressEvent.target._response.length
                                this.updateProgress(sizeCitysLoaded, sizeDistrictsLoaded, sizeWardsLoaded,
                                    sizeStreetsLoaded, sizeCategoriesLoaded, sizePropertiesLoaded)
                            }
                        }).then(async (result) => {
                            if (result.status == 200) {
                                var insertSuccess = await insertCitys(result.data)
                                if (insertSuccess) {
                                    currentVersion.version_citys = version.version_citys
                                    AsyncStorage.setItem(Constants.VERSION_CURRENT, JSON.stringify(currentVersion))
                                }
                            }
                            sizeCitysLoaded = sizeCitys
                            this.updateProgress(sizeCitysLoaded, sizeDistrictsLoaded, sizeWardsLoaded,
                                sizeStreetsLoaded, sizeCategoriesLoaded, sizePropertiesLoaded)

                            this.nextToMainScreen(false)
                        })
                    }
                    if (updateDistricts) {
                        axios.get(Constants.DISTRICTS_URL, {
                            headers: header,
                            onDownloadProgress: (progressEvent) => {
                                sizeDistrictsLoaded = progressEvent.target._response.length
                                this.updateProgress(sizeCitysLoaded, sizeDistrictsLoaded, sizeWardsLoaded,
                                    sizeStreetsLoaded, sizeCategoriesLoaded, sizePropertiesLoaded)
                            }
                        }).then(async (result) => {
                            if (result.status == 200) {
                                var insertSuccess = await insertDistricts(result.data)
                                if (insertSuccess) {
                                    currentVersion.version_districts = version.version_districts
                                    AsyncStorage.setItem(Constants.VERSION_CURRENT, JSON.stringify(currentVersion))
                                }
                            }
                            sizeDistrictsLoaded = sizeDistricts
                            this.updateProgress(sizeCitysLoaded, sizeDistrictsLoaded, sizeWardsLoaded,
                                sizeStreetsLoaded, sizeCategoriesLoaded, sizePropertiesLoaded)

                            this.nextToMainScreen(false)
                        })
                    }
                    if (updateWards) {
                        axios.get(Constants.WARDS_URL, {
                            headers: header,
                            onDownloadProgress: (progressEvent) => {
                                sizeWardsLoaded = progressEvent.target._response.length
                                this.updateProgress(sizeCitysLoaded, sizeDistrictsLoaded, sizeWardsLoaded,
                                    sizeStreetsLoaded, sizeCategoriesLoaded, sizePropertiesLoaded)
                            }
                        }).then(async (result) => {
                            if (result.status == 200) {
                                var insertSuccess = await insertWards(result.data)
                                if (insertSuccess) {
                                    currentVersion.version_wards = version.version_wards
                                    AsyncStorage.setItem(Constants.VERSION_CURRENT, JSON.stringify(currentVersion))
                                }
                            }
                            sizeWardsLoaded = sizeWards
                            this.updateProgress(sizeCitysLoaded, sizeDistrictsLoaded, sizeWardsLoaded,
                                sizeStreetsLoaded, sizeCategoriesLoaded, sizePropertiesLoaded)

                            this.nextToMainScreen(false)
                        })
                    }
                    if (updateStreets) {
                        axios.get(Constants.STREETS_URL, {
                            headers: header,
                            onDownloadProgress: (progressEvent) => {
                                sizeStreetsLoaded = progressEvent.target._response.length
                                this.updateProgress(sizeCitysLoaded, sizeDistrictsLoaded, sizeWardsLoaded,
                                    sizeStreetsLoaded, sizeCategoriesLoaded, sizePropertiesLoaded)
                            }
                        }).then(async (result) => {
                            if (result.status == 200) {
                                var insertSuccess = await insertStreets(result.data)
                                if (insertSuccess) {
                                    currentVersion.version_streets = version.version_streets
                                    AsyncStorage.setItem(Constants.VERSION_CURRENT, JSON.stringify(currentVersion))
                                }
                            }
                            sizeStreetsLoaded = sizeStreets
                            this.updateProgress(sizeCitysLoaded, sizeDistrictsLoaded, sizeWardsLoaded,
                                sizeStreetsLoaded, sizeCategoriesLoaded, sizePropertiesLoaded)

                            this.nextToMainScreen(false)
                        })
                    }
                    if (updateCategories) {
                        axios.get(Constants.CATEGORIES_URL, {
                            headers: header,
                            onDownloadProgress: (progressEvent) => {
                                sizeCategoriesLoaded = progressEvent.target._response.length
                                this.updateProgress(sizeCitysLoaded, sizeDistrictsLoaded, sizeWardsLoaded,
                                    sizeStreetsLoaded, sizeCategoriesLoaded, sizePropertiesLoaded)
                            }
                        }).then(async (result) => {
                            if (result.status == 200) {
                                var insertSuccess = await insertCategories(result.data)
                                if (insertSuccess) {
                                    currentVersion.version_categories = version.version_categories
                                    AsyncStorage.setItem(Constants.VERSION_CURRENT, JSON.stringify(currentVersion))
                                }
                            }
                            sizeCategoriesLoaded = sizeCategories
                            this.updateProgress(sizeCitysLoaded, sizeDistrictsLoaded, sizeWardsLoaded,
                                sizeStreetsLoaded, sizeCategoriesLoaded, sizePropertiesLoaded)

                            this.nextToMainScreen(false)
                        })
                    }
                    if (updateProperties) {
                        axios.get(Constants.PROPERTIES_URL, {
                            headers: header,
                            onDownloadProgress: (progressEvent) => {
                                sizePropertiesLoaded = progressEvent.target._response.length
                                this.updateProgress(sizeCitysLoaded, sizeDistrictsLoaded, sizeWardsLoaded,
                                    sizeStreetsLoaded, sizeCategoriesLoaded, sizePropertiesLoaded)
                            }
                        }).then(async (result) => {
                            if (result.status == 200) {
                                var insertSuccess = await insertProperties(result.data)
                                if (insertSuccess) {
                                    currentVersion.version_properties = version.version_properties
                                    AsyncStorage.setItem(Constants.VERSION_CURRENT, JSON.stringify(currentVersion))
                                }
                            }
                            sizePropertiesLoaded = sizeProperties
                            this.updateProgress(sizeCitysLoaded, sizeDistrictsLoaded, sizeWardsLoaded,
                                sizeStreetsLoaded, sizeCategoriesLoaded, sizePropertiesLoaded)

                            this.nextToMainScreen(false)
                        })
                    }
                }
            }

        } catch (error) {
         //   alert(error)
        }
    }

    nextToMainScreen(isNotUpdate) {
        try {
            if (isNotUpdate) {
                setTimeout(() => {
                    this.props.contextSplash.nextView();
                }, 1500);

            } else {
                this.countFileDownloaded++
                if (this.countFileDownload == this.countFileDownloaded) {
                    setTimeout(() => {
                        this.props.contextSplash.nextView();
                    }, 1500);
                }
            }

        } catch (error) {
         //   alert(error)
        }

    }

    updateProgress(sizeCitysLoaded, sizeDistrictsLoaded, sizeWardsLoaded,
        sizeStreetsLoaded, sizeCategoriesLoaded, sizePropertiesLoaded) {
        try {
            var sizeTotalLoaded = sizeCitysLoaded + sizeDistrictsLoaded + sizeWardsLoaded
                + sizeStreetsLoaded + sizeCategoriesLoaded + sizePropertiesLoaded

            var percent = Math.floor((sizeTotalLoaded / this.sizeTotal) * 100)

            this.setState({
                percent,
                downloaded: sizeTotalLoaded
            })
        } catch (error) {

        }
    }

    render() {
        var widthProgress = this.state.percent * ((width - 32) / 100)
        var isMaxProgress = widthProgress == (width - 32)
        var txtLoading = this.sizeTotal == 0
            ? "Kiểm tra dữ liệu..."
            : "Khởi tạo dữ liệu...("
            + (this.state.downloaded / (1024 * 1024)).toFixed(2)
            + "/" + (this.sizeTotal / (1024 * 1024)).toFixed(2) + "MB)";

        return (
            <View style={{
                position: "absolute",
                bottom: 20 + getBottomSpace(),
                right: 0,
                left: 0
            }}>
                <Text style={{
                    color: '#006680',
                    fontSize: 11,
                    textAlign: 'center'
                }}>{txtLoading}</Text>

                <View style={{
                    marginTop: 10,
                    width: width - 32,
                    flexDirection: 'row',
                    alignSelf: 'center'
                }}>
                    <View style={{
                        backgroundColor: "rgba(255,165,0,1)",
                        height: 6,
                        borderRadius: 3,
                        borderTopRightRadius: isMaxProgress ? 3 : 0,
                        borderBottomRightRadius: isMaxProgress ? 3 : 0,
                        width: widthProgress
                    }} />

                    <View style={{
                        backgroundColor: "rgba(255,165,0,0.3)",
                        height: 6,
                        flex: 1,
                        borderTopRightRadius: 3,
                        borderBottomRightRadius: 3,
                        borderTopLeftRadius: widthProgress == 0 ? 3 : 0,
                        borderBottomLeftRadius: widthProgress == 0 ? 3 : 0
                    }} />
                </View>
            </View>
        )
    }
}

export default class Splash extends Component {
    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0.5);
        this.state = {
            nextMain: false,
            renderView: null
        }
    }

    async componentDidMount() {
        AsyncStorage.getItem("FirstOpenApp", (err, result) => {
            if (err) {
             //   alert(err)
            } else {
                if (result == null) {
                    this.setState({
                        renderView: "introduce"
                    })
                } else {
                    this.setState({
                        renderView: "main"
                    })
                }
            }
        });

        Animated.spring(this.animatedValue, {
            toValue: 1,
            friction: 4,
            delay: 1000
        }).start();
    }


    nextView() {
        this.setState({
            nextMain: true
        })
    }

    render() {
        const logoStyle = {
            transform: [{ scale: this.animatedValue }]
        };

        switch (this.state.renderView) {
            case "introduce":
                if (this.state.nextMain) return <Introduce />
            case "main":
                if (this.state.nextMain) return <App />
            default:
                return (
                    <View
                        style={styles.container}>
                        <StatusBar backgroundColor={"orange"} />
                        <Animated.View style={logoStyle}>
                            <Animated.Image
                                source={require("../images/icon.png")}
                                style={[
                                    {
                                        width: 150,
                                        height: 150
                                    }
                                ]}
                            />
                        </Animated.View>
                        <Progress contextSplash={this} />
                    </View>
                )
                break;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    }
});
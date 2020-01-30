import React, { Component } from 'react';
import {
    View, StyleSheet, Text, Dimensions, TouchableOpacity,
    Modal, TextInput
} from 'react-native';
import { Picker } from "native-base";
import Ionicons from 'react-native-vector-icons/Ionicons'
import Utilities from '../../utils/Utilities.js';
import { getAllCitys } from '../../database/CitysSchema'
import { getAllDistrictsInCityByCode } from '../../database/DistrictsSchema';
import { getAllWardsInDistrictByCode } from '../../database/WardsSchema';
import { getAllStreetsInDistrictByCode } from '../../database/StreetsSchema';
import MapView, { PROVIDER_GOOGLE, Polygon, Marker } from 'react-native-maps';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import InputSearchProjects from '../../containers/add_product/InputSearchProjects';
import LinearGradient from 'react-native-linear-gradient';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const Screen = {
    width: Dimensions.get('window').width
}

export default class DropDownLocation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isMapReady: false,
            valueTypeCity: null,
            arrValueTypeCitys: [],
            valueTypeDistrict: null,
            arrValueTypeDistricts: [],
            valueTypeWards: null,
            arrValueTypeWards: [],
            valueTypeStreets: null,
            arrValueTypeStreets: [],
            location: [],
            modalVisible: false,
            markerOnMap: null,
            address: "",
            addressDetail: "",
            countTxtAddressDetail: 0,
            showInputAddressDetail: true
        }

        this.cityName = ""
        this.districtName = ""
        this.wardsName = ""
        this.streetName = ""

        this.citys = []
        this.districts = []
        this.wards = []
        this.streets = []

        this.regionZoomIn = null
        this.location = {
            city_id: null,
            district_id: null,
            wards_id: null,
            street_id: null,
            project_id: null,
            coordinate: null
        }
        this.followProject = false
    }

    async _getCitys() {
        try {
            let arrValueTypeCitys = await getAllCitys();
            this.citys = arrValueTypeCitys
            return arrValueTypeCitys.map(element => {
                return <Picker.Item
                    key={element.code}
                    label={element.name}
                    value={element.code}
                />
            })
        } catch (error) {
         //   alert(error)
        }
    }

    async _getDistricts(code) {
        try {
            let arrValueTypeDistricts = await getAllDistrictsInCityByCode(code);
            this.districts = arrValueTypeDistricts
            return arrValueTypeDistricts.map(element => {
                return <Picker.Item
                    key={element.code}
                    label={element.name}
                    value={element.code}
                />
            });
        } catch (error) {
         //   alert(error)
        }
    }

    async _getWards(code) {
        try {
            let arrValueTypeWards = await getAllWardsInDistrictByCode(code);
            this.wards = arrValueTypeWards
            return arrValueTypeWards.map((element) => {
                return <Picker.Item
                    key={element.code}
                    label={element.name}
                    value={element.code}
                />
            });
        } catch (error) {
         //   alert(error)
        }
    }

    async _getStreets(code) {
        try {
            let arrValueTypeStreetsTemp = await getAllStreetsInDistrictByCode(code);
            let arrValueTypeStreets = JSON.parse(arrValueTypeStreetsTemp.streets)
            this.streets = arrValueTypeStreets

            return arrValueTypeStreets.map((element) => {
                return <Picker.Item
                    key={element.code}
                    label={element.name}
                    value={element.code}
                />
            });
        } catch (error) {
         //   alert(error)
        }
    }

    async componentDidMount() {
        try {
            var arrValueTypeCitys = await this._getCitys();
            var locations_id = this.props.locations_id
            var address = this.props.address
            var addressDetail = ""

            if (address) {
                var arrAddress = address.split(",")
                if (arrAddress.length > 3 && locations_id) {
                    if (locations_id.city_id && locations_id.district_id && locations_id.wards_id) {
                        if (!locations_id.project_id) {
                            addressDetail = arrAddress.slice(0, arrAddress.length - (locations_id.street_id ? 4 : 3)).toString().trim()
                        }
                    }
                }
            }

            this.location.coordinate = this.props.coordinates ? this.props.coordinates : null

            if (locations_id && locations_id.city_id) {
                var location = []
                let city = this.citys.find(e => e.code === locations_id.city_id)

                if (city) {
                    this.cityName = city.name
                    let locationCity = city && city.locations ? JSON.parse(city.locations) : null

                    if (locationCity) {
                        location.push(locationCity)
                    }

                    var arrValueTypeDistricts = await this._getDistricts(locations_id.city_id)

                    if (locations_id.district_id) {
                        this.props.getProjectsByLocationIdAction(locations_id.city_id, locations_id.district_id)

                        let district = this.districts.find(e => e.code === locations_id.district_id)

                        if (district) {
                            this.districtName = district.name
                            let locationDistrict = district && district.locations ? JSON.parse(district.locations) : null

                            if (locationDistrict) {
                                location.push(locationDistrict)
                            }

                            if (locationDistrict && Array.isArray(locationDistrict)) {
                                this.state.isMapReady && this.map.fitToCoordinates(
                                    this._getPolygonFitToMap(locationDistrict),
                                    {
                                        edgePadding: { bottom: 3, left: 3, right: 3, top: 3 },
                                        animated: true
                                    })
                            }

                            var arrValueTypeWards = await this._getWards(locations_id.district_id)
                            var arrValueTypeStreets = await this._getStreets(locations_id.district_id)

                            var valueTypeWards = null
                            var valueTypeStreets = null

                            if (locations_id.wards_id) {
                                let wards = this.wards.find(e => e.code === locations_id.wards_id)

                                this.wardsName = wards.name

                                if (!this.state.markerOnMap) {
                                    let zoomLevel = 15
                                    let longitudeDelta = 360 / (Math.pow(2, zoomLevel))
                                    this.regionZoomIn = JSON.parse(wards.locations)
                                    this.state.isMapReady && this.map.animateToRegion({
                                        ...this.regionZoomIn,
                                        latitudeDelta: longitudeDelta,
                                        longitudeDelta: longitudeDelta
                                    })
                                }

                                valueTypeWards = locations_id.wards_id
                            }

                            if (locations_id.street_id) {
                                let streets = this.streets.find(e => e.code === locations_id.street_id)
                                this.streetName = streets.name
                                valueTypeStreets = streets.code
                            }
                            this.setState({
                                valueTypeCity: locations_id.city_id,
                                arrValueTypeCitys,
                                valueTypeDistrict: locations_id.district_id,
                                arrValueTypeDistricts,
                                valueTypeWards,
                                arrValueTypeWards,
                                valueTypeStreets,
                                arrValueTypeStreets,
                                location,
                                markerOnMap: this.location.coordinate,
                                address: this.props.address,
                                addressDetail,
                                countTxtAddressDetail: addressDetail.length
                            })
                            this._setLocationId(locations_id.city_id,
                                locations_id.district_id,
                                valueTypeWards ? valueTypeWards : "",
                                valueTypeStreets ? valueTypeStreets : "")
                        } else {
                            this.setState({
                                valueTypeCity: locations_id.city_id,
                                arrValueTypeCitys,
                                valueTypeDistrict: locations_id.district_id,
                                arrValueTypeDistricts,
                                location,
                                markerOnMap: this.location.coordinate,
                                address: this.props.address ? this.props.address : "",
                                addressDetail,
                                countTxtAddressDetail: addressDetail.length
                            })
                            this._setLocationId(locations_id.city_id, locations_id.district_id, "", "")
                        }
                    } else {
                        this.setState({
                            valueTypeCity: locations_id.city_id,
                            arrValueTypeCitys,
                            location,
                            markerOnMap: this.location.coordinate,
                            address: this.props.address ? this.props.address : "",
                            addressDetail,
                            countTxtAddressDetail: addressDetail.length
                        })
                        this._setLocationId(locations_id.city_id, "", "", "")
                    }
                } else {
                    this.setState({
                        valueTypeCity: locations_id.city_id,
                        arrValueTypeCitys,
                        markerOnMap: this.location.coordinate,
                        address: this.props.address ? this.props.address : "",
                        addressDetail,
                        countTxtAddressDetail: addressDetail.length
                    })
                    this._setLocationId(locations_id.city_id, "", "", "")
                }
            } else {
                this.setState({
                    valueTypeCity: null,
                    arrValueTypeCitys,
                    markerOnMap: this.location.coordinate,
                    address: this.props.address ? this.props.address : "",
                    addressDetail,
                    countTxtAddressDetail: addressDetail.length
                })
            }
        } catch (error) {
         //   alert(error)
        }
    }

    _getPolygonFitToMap(location) {
        try {
            var maxLatitude = null
            var maxLongitude = null
            var minLatitude = null
            var minLongitude = null

            location.map(element => {
                element.map(element2 => {
                    element2.map(element3 => {
                        if (maxLatitude === null) {
                            maxLatitude = element3.latitude
                        } else if (maxLatitude < element3.latitude) {
                            maxLatitude = element3.latitude
                        }

                        if (maxLongitude === null) {
                            maxLongitude = element3.longitude
                        } else if (maxLongitude < element3.longitude) {
                            maxLongitude = element3.longitude
                        }

                        if (minLatitude === null) {
                            minLatitude = element3.latitude
                        } else if (minLatitude > element3.latitude) {
                            minLatitude = element3.latitude
                        }

                        if (minLongitude === null) {
                            minLongitude = element3.longitude
                        } else if (minLongitude > element3.longitude) {
                            minLongitude = element3.longitude
                        }
                    })
                })
            })

            var polyFit = []
            if (maxLatitude !== null && maxLongitude !== null
                && minLatitude !== null && minLongitude !== null) {
                polyFit = [
                    {
                        latitude: maxLatitude,
                        longitude: maxLongitude
                    },
                    {
                        latitude: minLatitude,
                        longitude: minLongitude
                    }
                ]
            }
            return polyFit
        } catch (error) {
        }
    }

    _renderPolygonLocation(locations) {
        try {
            if (locations.length > 0) {
                var location = locations[locations.length - 1]

                var listPolygons = []
                if (Array.isArray(location)) {
                    location.map(element => {
                        element.map(element2 => {
                            listPolygons.push(
                                <Polygon
                                    coordinates={element2}
                                    strokeColor="red"
                                    strokeWidth={1} />
                            )
                        })
                    })
                    return listPolygons
                }
                return null
            }
            return null
        } catch (error) {
         //   alert(error)
        }
    }

    _setNameAddress(cityName, districtName, wardsName, streetName, addressName) {
        try {
            if (this.followProject) {
                return this.state.address
            }

            this.cityName = cityName === "" ? null : (cityName ? cityName : this.cityName)
            this.districtName = districtName === "" ? null : (districtName ? districtName : this.districtName)
            this.wardsName = wardsName === "" ? null : (wardsName ? wardsName : this.wardsName)
            this.streetName = streetName === "" ? null : (streetName ? streetName : this.streetName)

            let address = (addressName !== "" ? (addressName ? addressName + ", " : "") : "")
                + (this.streetName ? (this.streetName + ", ") : "")
                + (this.wardsName ? (this.wardsName + ", ") : "")
                + (this.districtName ? (this.districtName + ", ") : "")
                + this.cityName

            address = address && address !== "" && address !== "null" ? address : null

            this.props.onRecieverValueProduct(address)
            return address
        } catch (error) {
         //   alert(error)
        }
    }

    _setNameAddressWithProject(projectName, project) {
        try {
            if (projectName !== "Dự án khác" && projectName !== "") {
                this.location.coordinate = project.locations
                this.location.project_id = project.project_id
                this.followProject = true
                let address = (projectName + ", ")
                    + (this.districtName ? (this.districtName + ", ") : "")
                    + this.cityName

                this.props.onRecieverValueProduct(address)
                if (project.locations) {
                    let zoomLevel = 15
                    let longitudeDelta = 360 / (Math.pow(2, zoomLevel))
                    this.map.animateToRegion({
                        latitude: parseFloat(project.locations.latitude),
                        longitude: parseFloat(project.locations.longitude),
                        latitudeDelta: longitudeDelta,
                        longitudeDelta: longitudeDelta
                    })
                }

                this.setState({
                    address,
                    markerOnMap: {
                        latitude: parseFloat(project.locations.latitude),
                        longitude: parseFloat(project.locations.longitude)
                    },
                    showInputAddressDetail: false
                })
            } else {
                this.followProject = false
                this.setState({
                    address: this._setNameAddress(null, null, null, null, null),
                    // markerOnMap: project.locations,
                    showInputAddressDetail: true,
                    addressDetail: ""
                })
            }
        } catch (error) {
         //   alert(error)
        }
    }

    _setLocationId(cityId, districtId, wardsId, streetId) {
        try {
            this.location.city_id = cityId === "" ? null : (cityId ? cityId : this.location.city_id)
            this.location.district_id = districtId === "" ? null : (districtId ? districtId : this.location.district_id)
            this.location.wards_id = wardsId === "" ? null : (wardsId ? wardsId : this.location.wards_id)
            this.location.street_id = streetId === "" ? null : (streetId ? streetId : this.location.street_id)
            this.location.coordinate = this.state.markerOnMap

            this.props.onRecieverValueLocation(this.location)
        } catch (error) {
         //   alert(error)
        }
    }

    async onValueChangeValueCity(valueTypeCity) {
        alert(1)
        try {
            if (valueTypeCity) {
                this.location.project_id = null
                this.followProject = false
                let arrValueTypeDistricts = await this._getDistricts(valueTypeCity)
                let city = this.citys.find(e => e.code === valueTypeCity)

                this._setLocationId(city.code, "", "", "")
                let address = this._setNameAddress(city.name, "", "", "", this.state.addressDetail)

                let locationCity = city && city.locations ? JSON.parse(city.locations) : null
                if (locationCity && Array.isArray(locationCity)) {
                    this.map.fitToCoordinates(this._getPolygonFitToMap(locationCity), {
                        edgePadding: { bottom: 3, left: 3, right: 3, top: 3 },
                        animated: true
                    })

                    this.setState({
                        valueTypeCity,
                        valueTypeDistrict: null,
                        arrValueTypeDistricts,
                        valueTypeWards: null,
                        arrValueTypeWards: [],
                        valueTypeStreets: null,
                        arrValueTypeStreets: [],
                        location: [locationCity],
                        address,
                        markerOnMap: null
                    })
                } else {
                    this.setState({
                        valueTypeCity,
                        valueTypeDistrict: null,
                        arrValueTypeDistricts,
                        valueTypeWards: null,
                        arrValueTypeWards: [],
                        valueTypeStreets: null,
                        arrValueTypeStreets: [],
                        address,
                        markerOnMap: null
                    })
                }
            } else {
                this._setLocationId("", "", "", "")
                let address = this._setNameAddress("", "", "", "", this.state.addressDetail)

                this.setState({
                    valueTypeCity: null,
                    valueTypeDistrict: null,
                    arrValueTypeDistricts: [],
                    valueTypeWards: null,
                    arrValueTypeWards: [],
                    valueTypeStreets: null,
                    arrValueTypeStreets: [],
                    address,
                    markerOnMap: null,
                    location: []
                })
            }
        } catch (error) {
         //   alert(error)
        }
    }

    async onValueChangeValueDistrict(valueTypeDistrict) {
        alert(2)
        try {
            if (valueTypeDistrict) {
                this.location.project_id = null
                this.followProject = false
                let arrValueTypeWards = await this._getWards(valueTypeDistrict)
                let arrValueTypeStreets = await this._getStreets(valueTypeDistrict)
                let district = this.districts.find(e => e.code === valueTypeDistrict)

                this.props.getProjectsByLocationIdAction(this.location.city_id, district.code)
                this._setLocationId(null, district.code, "", "")
                let address = this._setNameAddress(null, district.name, "", "", this.state.addressDetail)

                let locationDistrict = district && district.locations ? JSON.parse(district.locations) : null
                if (locationDistrict && Array.isArray(locationDistrict)) {
                    this.map.fitToCoordinates(this._getPolygonFitToMap(locationDistrict), {
                        edgePadding: { bottom: 3, left: 3, right: 3, top: 3 },
                        animated: true
                    })
                    this.setState({
                        valueTypeDistrict,
                        valueTypeWards: null,
                        arrValueTypeWards: arrValueTypeWards ? arrValueTypeWards : [],
                        valueTypeStreets: null,
                        arrValueTypeStreets: arrValueTypeStreets ? arrValueTypeStreets : [],
                        location: this.state.location.concat([locationDistrict]),
                        address,
                        markerOnMap: null
                    })
                }
                else {
                    this.setState({
                        valueTypeDistrict,
                        valueTypeWards: null,
                        arrValueTypeWards: arrValueTypeWards ? arrValueTypeWards : [],
                        valueTypeStreets: null,
                        arrValueTypeStreets: arrValueTypeStreets ? arrValueTypeStreets : [],
                        address,
                        markerOnMap: null
                    })
                }
            } else {
                if (this.state.location.length > 1) {
                    this._setLocationId(null, "", "", "")
                    let address = this._setNameAddress(null, "", "", "", this.state.addressDetail)
                    this.map.fitToCoordinates(this._getPolygonFitToMap(this.state.location[this.state.location.length - 2]), {
                        edgePadding: { bottom: 3, left: 3, right: 3, top: 3 },
                        animated: true
                    })

                    this.setState({
                        valueTypeDistrict,
                        valueTypeWards: null,
                        arrValueTypeWards: [],
                        valueTypeStreets: null,
                        arrValueTypeStreets: [],
                        address,
                        markerOnMap: null,
                        location: this.state.location.slice(0, this.state.location.length - 1)
                    })
                }
            }
        } catch (error) {
         //   alert(error)
        }
    }

    onValueChangeValueWards(valueTypeWards) {
        try {
            if (valueTypeWards) {
                let wards = this.wards.find(e => e.code === valueTypeWards)

                if (!this.state.markerOnMap) {
                    let zoomLevel = 15
                    let longitudeDelta = 360 / (Math.pow(2, zoomLevel))
                    this.regionZoomIn = JSON.parse(wards.locations)
                    this.map.animateToRegion({
                        ...this.regionZoomIn,
                        latitudeDelta: longitudeDelta,
                        longitudeDelta: longitudeDelta
                    })
                }

                this._setLocationId(null, null, wards.code, null)
                let address = this._setNameAddress(null, null, wards.name, null, this.state.addressDetail)

                this.setState({
                    valueTypeWards,
                    address
                })
            } else {
                this.map.fitToCoordinates(this._getPolygonFitToMap(this.state.location[this.state.location.length - 1]), {
                    edgePadding: { bottom: 3, left: 3, right: 3, top: 3 },
                    animated: true
                })

                this._setLocationId(null, null, "", null)
                let address = this._setNameAddress(null, null, "", null, this.state.addressDetail)

                this.setState({
                    valueTypeWards: null,
                    address
                })
            }
        } catch (error) {
         //   alert(error)
        }
    }

    onValueChangeValueStreets(valueTypeStreets) {
        try {
            if (valueTypeStreets) {
                let streets = this.streets.find(e => e.code === valueTypeStreets)

                this._setLocationId(null, null, null, streets.code)
                let address = this._setNameAddress(null, null, null, streets.name, this.state.addressDetail)

                this.setState({
                    valueTypeStreets,
                    address
                })
            } else {
                this._setLocationId(null, null, null, "")
                let address = this._setNameAddress(null, null, null, "", this.state.addressDetail)

                this.setState({
                    valueTypeStreets: null,
                    address
                })
            }
        } catch (error) {
         //   alert(error)
        }
    }

    setModalVisible(visible) {
        try {
            this.setState({ modalVisible: visible });
        } catch (error) {
         //   alert(error)
        }
    }

    _onChangeAddressDetail(text) {
        try {
            if (text && text !== "") {
                let address = this._setNameAddress(null, null, null, null, text)
                this.setState({
                    address,
                    addressDetail: text,
                    countTxtAddressDetail: text.length
                })
            } else {
                this.setState({
                    addressDetail: text,
                    countTxtAddressDetail: text.length
                })
            }
        } catch (error) {
         //   alert(error)
        }
    }

    _pickMarkerInMap(coordinate) {
        try {
            if (Utilities.isPointInPoly(coordinate, this.state.location[this.state.location.length - 1])) {
                this.location.coordinate = coordinate
                this.setState({
                    markerOnMap: coordinate
                })
            }
        } catch (error) {
         //   alert(error)
        }
    }

    render() {
        // alert(JSON.stringify(this.state.markerOnMap))
        return (
            <View style={styles.container}>
                <View style={{
                    height: 40,
                    borderWidth: 1.1,
                    borderColor: 'rgba(200, 200, 218, 1)',
                    borderRadius: 3,
                    justifyContent: 'center',
                    padding: 0,
                    margin: 0
                }}>
                    <Picker
                        modalStyle={styles.modalPicker}
                        headerStyle={styles.headerPicker}
                        itemStyle={styles.itemModal}
                        headerBackButtonTextStyle={styles.headerBackModal}
                        headerTitleStyle={styles.headerTitleModal}
                        iosHeader="Chọn"
                        headerBackButtonText="Trở lại"
                        iosIcon={<Ionicons name="ios-arrow-down" size={24} color="rgba(0,0,0,0.8)" />}
                        placeholder="Chọn Tỉnh/Thành phố(*)"
                        placeholderIconColor={"rgba(0,0,0,0.5)"}
                        placeholderStyle={{ color: "rgba(0,0,0,0.8)", fontSize: 14 }}
                        mode="dialog"
                        textStyle={styles.textPicker}
                        itemTextStyle={styles.textPicker}
                        style={[styles.picker, { width: Screen.width - (Utilities.checkAndroidOS() ? 40 : 48) }]}
                        selectedValue={this.state.valueTypeCity}
                        onValueChange={this.onValueChangeValueCity.bind(this)} >
                        <Picker.Item label="Chọn Tỉnh/Thành phố(*)" value={null} />
                        {this.state.arrValueTypeCitys}
                    </Picker>
                </View>
                {
                    this.state.arrValueTypeDistricts.length > 0
                        ?
                        <View style={{
                            marginTop: 8,
                            height: 40,
                            borderWidth: 1.1,
                            borderColor: 'rgba(200, 200, 218, 1)',
                            borderRadius: 3,
                            justifyContent: 'center',
                            padding: 0,
                            margin: 0
                        }}>
                            <Picker
                                modalStyle={styles.modalPicker}
                                headerStyle={styles.headerPicker}
                                itemStyle={styles.itemModal}
                                headerBackButtonTextStyle={styles.headerBackModal}
                                headerTitleStyle={styles.headerTitleModal}
                                iosHeader="Chọn"
                                headerBackButtonText="Trở lại"
                                iosIcon={<Ionicons name="ios-arrow-down" size={24} color="rgba(0,0,0,0.8)" />}
                                placeholder="Chọn Quận/Huyện(*)"
                                placeholderIconColor={"rgba(0,0,0,0.5)"}
                                placeholderStyle={{ color: "rgba(0,0,0,0.8)", fontSize: 14 }}
                                mode="dialog"
                                textStyle={styles.textPicker}
                                itemTextStyle={styles.textPicker}
                                style={[styles.picker, { width: Screen.width - (Utilities.checkAndroidOS() ? 40 : 49) }]}
                                selectedValue={this.state.valueTypeDistrict}
                                onValueChange={this.onValueChangeValueDistrict.bind(this)} >
                                <Picker.Item label="Chọn Quận/Huyện(*)" value={null} />
                                {this.state.arrValueTypeDistricts}
                            </Picker>
                        </View>
                        :
                        null
                }
                {
                    this.state.arrValueTypeWards.length > 0
                        ?
                        <View style={{
                            marginTop: 8,
                            height: 40,
                            borderWidth: 1.1,
                            borderColor: 'rgba(200, 200, 218, 1)',
                            borderRadius: 3,
                            justifyContent: 'center',
                            padding: 0,
                            margin: 0
                        }}>
                            <Picker
                                modalStyle={styles.modalPicker}
                                headerStyle={styles.headerPicker}
                                itemStyle={styles.itemModal}
                                headerBackButtonTextStyle={styles.headerBackModal}
                                headerTitleStyle={styles.headerTitleModal}
                                iosHeader="Chọn"
                                headerBackButtonText="Trở lại"
                                iosIcon={<Ionicons name="ios-arrow-down" size={24} color="rgba(0,0,0,0.8)" />}
                                placeholder="Chọn Phường/Xã(*)"
                                placeholderIconColor={"rgba(0,0,0,0.5)"}
                                placeholderStyle={{ color: "rgba(0,0,0,0.8)", fontSize: 14 }}
                                mode="dialog"
                                textStyle={styles.textPicker}
                                itemTextStyle={styles.textPicker}
                                style={[styles.picker, { width: Screen.width - (Utilities.checkAndroidOS() ? 40 : 49) }]}
                                selectedValue={this.state.valueTypeWards}
                                onValueChange={this.onValueChangeValueWards.bind(this)} >
                                <Picker.Item label="Chọn Phường/Xã(*)" value={null} />
                                {this.state.arrValueTypeWards}
                            </Picker>
                        </View>
                        :
                        null
                }
                {
                    this.state.arrValueTypeStreets.length > 0
                        ?
                        <View style={{
                            marginTop: 8,
                            height: 40,
                            borderWidth: 1.1,
                            borderColor: 'rgba(200, 200, 218, 1)',
                            borderRadius: 3,
                            justifyContent: 'center',
                            padding: 0,
                            margin: 0
                        }}>
                            <Picker
                                modalStyle={styles.modalPicker}
                                headerStyle={styles.headerPicker}
                                itemStyle={styles.itemModal}
                                headerBackButtonTextStyle={styles.headerBackModal}
                                headerTitleStyle={styles.headerTitleModal}
                                iosHeader="Chọn"
                                headerBackButtonText="Trở lại"
                                iosIcon={<Ionicons name="ios-arrow-down" size={24} color="rgba(0,0,0,0.8)" />}
                                placeholder="Chọn Đường/Phố"
                                placeholderIconColor={"rgba(0,0,0,0.5)"}
                                placeholderStyle={{ color: "rgba(0,0,0,0.8)", fontSize: 14 }}
                                mode="dialog"
                                textStyle={styles.textPicker}
                                itemTextStyle={styles.textPicker}
                                style={[styles.picker, { width: Screen.width - (Utilities.checkAndroidOS() ? 40 : 49) }]}
                                selectedValue={this.state.valueTypeStreets}
                                onValueChange={this.onValueChangeValueStreets.bind(this)} >
                                <Picker.Item label="Chọn Đường/Phố" value={null} />
                                {this.state.arrValueTypeStreets}
                            </Picker>
                        </View>
                        :
                        null
                }
                {
                    this.state.arrValueTypeWards.length > 0
                        ? <InputSearchProjects onChangeTextShowAddress={(nameProject, location) => {
                            this._setNameAddressWithProject(nameProject, location)
                        }}
                            project_id={this.props.locations_id.project_id}
                        />
                        : null
                }
                <View style={{
                    marginTop: 8,
                    borderRadius: 3
                }}>
                    <MapView
                        ref={(ref) => { this.map = ref }}
                        style={{
                            height: 200,
                            width: Screen.width - 32,
                            borderRadius: 3
                        }}
                        provider={Utilities.checkAndroidOS() ? PROVIDER_GOOGLE : null}
                        initialRegion={{
                            latitude: 20.895155,
                            longitude: 105.083676,
                            latitudeDelta: 2.9,
                            longitudeDelta: 2.9,
                        }}
                        userLocationAnnotationTitle=""
                        showsUserLocation={false}
                        onMapReady={() => {
                            try {
                                this.state.location.length > 0 && this.map.fitToCoordinates(this._getPolygonFitToMap(this.state.location[this.state.location.length - 1]), {
                                    edgePadding: { bottom: 3, left: 3, right: 3, top: 3 },
                                    animated: true
                                })
                                this.setState({ isMapReady: true })
                            } catch (error) {
                            }
                        }}
                        moveOnMarkerPress={false}
                        scrollEnabled={false}
                        onRegionChangeComplete={e => { }}
                    >
                        {this.state.isMapReady && this.state.markerOnMap && <Marker coordinate={this.state.markerOnMap} />}
                        {this.state.isMapReady && this._renderPolygonLocation(this.state.location)}
                    </MapView>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            if (!this.state.valueTypeCity) {
                                Utilities.showToast("Vui lòng chọn Tỉnh/Thành phố")
                            } else if (!this.state.valueTypeDistrict) {
                                Utilities.showToast("Vui lòng chọn Quận/Huyện")
                            } else if (!this.state.valueTypeWards) {
                                Utilities.showToast("Vui lòng chọn Phường/Xã")
                            } else {
                                this.setModalVisible(true)
                            }
                        }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            borderRadius: 3
                        }}>
                        <View style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            padding: 10,
                            borderRadius: 3
                        }}>
                            <Text style={{
                                color: 'white',
                                fontSize: 14,
                                paddingEnd: 8
                            }}>{this.state.markerOnMap ? 'Chọn lại vị trí' : 'Cắm vị trí trên bản đồ'}</Text>
                            <FontAwesome name="hand-o-down" size={14} color='white' />
                        </View>
                    </TouchableOpacity>
                </View>
                {
                    this.state.showInputAddressDetail
                        ?
                        <LinearGradient
                            style={{
                                backgroundColor: 'aliceblue',
                                borderRadius: 5,
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 8
                            }}
                            locations={[0, 0.15, 0.15]}
                            colors={['rgba(200, 200, 218, 0.25)', 'rgba(200, 200, 218, 0.005)', 'aliceblue']}
                        >
                            <TextInput
                                value={this.state.addressDetail}
                                style={{
                                    flex: 1,
                                    padding: 10
                                }}
                                autoCorrect={false}
                                returnKeyType="done"
                                maxLength={100}
                                placeholder="Số nhà, Ngõ, Ngách(Ví dụ: Số nhà 1, Ngõ 2, Ngách 3)"
                                onChangeText={(text) => this._onChangeAddressDetail(text)} />
                            <Text style={{
                                position: 'absolute',
                                right: 2,
                                bottom: 2,
                                fontSize: 8,
                                color: 'rgba(0,0,0,0.5)'
                            }}>{this.state.countTxtAddressDetail}/100</Text>
                        </LinearGradient>
                        :
                        null
                }
                {
                    this.state.address && this.state.address !== "" ?
                        <View>
                            <Text style={{
                                marginTop: 16,
                                fontSize: 14,
                                fontStyle: 'italic',
                                textDecorationLine: 'underline',
                                fontWeight: '500',
                                color: 'rgba(0,0,0,0.8)'
                            }}>Địa chỉ hiển thị: </Text>
                            <Text style={{
                                marginTop: 10,
                                fontSize: 14,
                                color: 'rgba(0,0,0,0.8)'
                            }}>- {this.state.address}</Text>
                        </View>
                        :
                        null
                }
                <Modal
                    animationType="fade"
                    visible={this.state.modalVisible}>
                    <View style={{
                        flex: 1,
                        paddingBottom: 16,
                        paddingTop: Utilities.checkAndroidOS() ? 16 : 32,
                        paddingHorizontal: 16,
                        backgroundColor: 'rgba(0,0,0,0.5)'
                    }}>
                        <View style={{
                            backgroundColor: 'white',
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                            shadowOffset: { width: 0, height: 0 },
                            shadowRadius: 3,
                            shadowOpacity: 0.5,
                            elevation: 5
                        }}>
                            <View style={{
                                backgroundColor: 'orange',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                borderTopStartRadius: 5,
                                borderTopEndRadius: 5
                            }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}
                                    style={{
                                        position: 'absolute',
                                        left: 0,
                                        paddingHorizontal: 12
                                    }}
                                >
                                    <Ionicons name="ios-arrow-back" color="white" size={24} />
                                </TouchableOpacity>
                                <Text style={{
                                    fontSize: 15,
                                    color: 'white',
                                    fontWeight: '500',
                                    padding: 10
                                }}>Nhấn hoặc giữ để chọn vị trí</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <MapView
                                    style={{
                                        flex: 1,
                                        width: Screen.width - 32
                                    }}
                                    ref={(ref) => { this.mapZoom = ref }}
                                    provider={Utilities.checkAndroidOS() ? PROVIDER_GOOGLE : null}
                                    initialRegion={(this.state.markerOnMap
                                        ?
                                        {
                                            ...this.state.markerOnMap,
                                            latitudeDelta: 360 / (Math.pow(2, 15)),
                                            longitudeDelta: 360 / (Math.pow(2, 15)),
                                        }
                                        :
                                        {
                                            ...this.regionZoomIn,
                                            latitudeDelta: 360 / (Math.pow(2, 15)),
                                            longitudeDelta: 360 / (Math.pow(2, 15)),
                                        })}
                                    userLocationAnnotationTitle=""
                                    showsUserLocation={false}
                                    moveOnMarkerPress={false}
                                    onPress={(location) => this._pickMarkerInMap(location.nativeEvent.coordinate)}
                                    onLongPress={(location) => this._pickMarkerInMap(location.nativeEvent.coordinate)}
                                >
                                    {this.state.isMapReady && this.state.markerOnMap && <Marker coordinate={this.state.markerOnMap} />}
                                    {this.state.isMapReady && this._renderPolygonLocation(this.state.location)}
                                </MapView>
                                <View style={{
                                    position: 'absolute',
                                    backgroundColor: 'rgba(0,0,0,0.4)',
                                    width: '100%',
                                    padding: 2,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 10
                                    }}>Bạn chỉ có thể cắm điểm trong khu vực bạn đã chọn</Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    backgroundColor: 'orange',
                                    borderBottomStartRadius: 5,
                                    borderBottomEndRadius: 5
                                }}>
                                <TouchableOpacity
                                    style={{
                                        padding: 10,
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 14,
                                        fontWeight: '500',
                                    }}>ĐỒNG Ý</Text>
                                </TouchableOpacity>
                                <View style={{ width: 0.5, backgroundColor: 'white' }}
                                />
                                <TouchableOpacity
                                    style={{
                                        padding: 10,
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    onPress={() => {
                                        this.setState({ markerOnMap: null })
                                    }}>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 14,
                                        fontWeight: '500'
                                    }}>LÀM MỚI</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }

    onValueChange = (value) => {
        this.setState({ value })
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        marginBottom: 24
    },
    modalPicker: {
        backgroundColor: "white",
        paddingBottom: getBottomSpace()
    },
    headerPicker: {
        backgroundColor: "white"
    },
    headerBackModal: {
        color: "rgba(0,0,0,0.8)"
    },
    headerTitleModal: {
        color: "rgba(0,0,0,0.8)"
    },
    itemModal: {
        fontSize: 14,
        marginLeft: 0,
        paddingLeft: 16
    },
    textPicker: {
        fontSize: 14,
        color: "rgba(0,0,0,0.8)",
    },
    picker: {
        fontSize: 14,
        color: "rgba(0,0,0,0.8)"
    }
});

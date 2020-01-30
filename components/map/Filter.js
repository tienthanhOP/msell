import React, { Component } from 'react'
import {
    Text, StyleSheet, View, TouchableOpacity, TextInput,
    ActivityIndicator, AsyncStorage
} from 'react-native'
import ToolbarFilter from './ToolbarFilter';
import DualSilder from './DualSilder';
import DropDownCategories from './DropdownCategories';
import { Actions } from 'react-native-router-flux';
import { Content, Picker } from 'native-base';
import Utilities from '../../utils/Utilities';
import * as Constants from '../../constants/Constants'
import DualInput from './DualInput';

export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSell: global.dataFilter.type_of_post == null || global.dataFilter.type_of_post == 1
                ? true : false,
            firstLoading: true,
            reset: false
        }
        this._onReset = this._onReset.bind(this);
        this._changeTypeOfPost = this._changeTypeOfPost.bind(this);
        global.dataFilterTemp = {}
    }

    componentWillMount() {
        global.dataFilterTemp = {
            ...global.dataFilter
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                firstLoading: false
            })
        }, 500)
    }

    _onReset = () => {
        try {
            global.dataFilterTemp = {}
            AsyncStorage.removeItem(Constants.DATA_FILTER)
            this.setState({
                reset: !this.state.reset,
                isSell: true
            })

            this.dropDownCategories.onReset(1)
            this.acreage.onReset()
            this.price.onReset()
            this.baths.onReset()
            this.beds.onReset()
            this.foors.onReset()
        } catch (error) {
            //  alert(error)
        }
    }

    _handleFilter = () => {
        try {
            var dataFilter = {
                ...global.dataFilterTemp
            }

            if (dataFilter.category) {
                if (dataFilter.category === "all") {
                    delete dataFilter.category
                }
            }

            dataFilter.type_of_post = this.state.isSell ? 1 : 2

            global.dataFilter = dataFilter

            AsyncStorage.setItem(Constants.DATA_FILTER, JSON.stringify(global.dataFilter))

            this.props.showCountNumber()
            this.props.showLoadingMap(true)

            setTimeout(() => {
                this.props.getProducts(
                    this.props.zoomlevel,// zoomlevel
                    this.props.viewport,// viewport
                    dataFilter.category ? dataFilter.category : null,// category
                    this.props.locations_id.citys_id ? this.props.locations_id.citys_id : null,// citys_id
                    this.props.locations_id.districts_id ? this.props.locations_id.districts_id : null,// districts_id
                    this.props.locations_id.wards_id ? this.props.locations_id.wards_id : null,// wards_id
                    this.props.locations_id.streets_id ? this.props.locations_id.streets_id : null,// wards_id
                    this.props.locations_id.project_id ? this.props.locations_id.project_id : null,// wards_id
                    dataFilter.type_of_post,
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
                    this.props.isGroup === false ? this.props.isGroup : null,// group
                    this.props.is_draw,// is_draw
                    this.props.poly_draw,// poly_draw
                    this.props.isGroup === false ? 5 : null,// limit
                    this.props.isGroup === false ? 0 : null,// skip
                    this.props.boundingBox,
                    0//page
                )
            }, 200)


            Actions.pop()
        } catch (error) {
            alert(error)
        }
    }

    _changeTypeOfPost(isSell) {
        global.dataFilterTemp.type_of_post = isSell ? 1 : 2
        this.dropDownCategories.onReset(isSell ? 1 : 2)
        if (isSell !== this.state.isSell) {
            this.setState({
                isSell
            })
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <ToolbarFilter onReset={this._onReset} />
                {
                    this.state.firstLoading ?
                        <ActivityIndicator size="large" style={{ flex: 1, alignSelf: 'center' }} color={'green'} />
                        :
                        <Content style={{ flex: 1 }}>
                            <Text style={{
                                fontSize: 13,
                                marginStart: 16,
                                color: 'rgba(0,0,0,0.8)',
                                flex: 1,
                                marginTop: 20
                            }}>Hình thức</Text>

                            <View style={{
                                flexDirection: 'row',
                                marginTop: 5,
                                marginHorizontal: 16
                            }}>
                                <TouchableOpacity
                                    style={{
                                        height: 45,
                                        flex: 1,
                                        borderColor: this.state.isSell ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.3)',
                                        borderWidth: this.state.isSell ? 1.5 : 0.5,
                                        borderEndWidth: this.state.isSell ? 1.5 : 0,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    onPress={() => this._changeTypeOfPost(true)}
                                >
                                    <Text style={{
                                        color: 'rgba(0,0,0,0.8)',
                                        fontSize: 15
                                    }}>Bán</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        height: 45,
                                        flex: 1,
                                        borderColor: !this.state.isSell ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.3)',
                                        borderWidth: this.state.isSell ? 0.5 : 1.5,
                                        borderStartWidth: this.state.isSell ? 0 : 1.5,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    onPress={() => this._changeTypeOfPost(false)}
                                >
                                    <Text style={{
                                        color: 'rgba(0,0,0,0.8)',
                                        fontSize: 15
                                    }}>Cho thuê</Text>
                                </TouchableOpacity>
                            </View>

                            <DropDownCategories title={"Loại đất"}
                                onRef={ref => (this.dropDownCategories = ref)} />

                            <DualInput unit={"triệu"} title={"Giá"} keyWord={"price"}
                                onRef={ref => (this.price = ref)} />
                            <DualInput unit={"m²"} title={"Diện tích"} keyWord={"acreage"}
                                onRef={ref => (this.acreage = ref)} />

                            <DualSilder maxValue={6} minValue={0} unit={"tầng"} title={"Số tầng"} keyWord={"floors"}
                                onRef={ref => (this.foors = ref)} />
                            <DualSilder maxValue={6} minValue={0} unit={"phòng"} title={"Số phòng ngủ"} keyWord={"beds"}
                                onRef={ref => (this.beds = ref)} />
                            <DualSilder maxValue={6} minValue={0} unit={"phòng"} title={"Số phòng vệ sinh"} keyWord={"toilets"}
                                onRef={ref => (this.baths = ref)} />
                            <View style={{ height: 20 }} />
                        </Content>
                }
                <View style={{
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    backgroundColor: 'white',
                    shadowOffset: { width: 0, height: -1 },
                    shadowRadius: 2,
                    shadowOpacity: 0.2,
                    elevation: 2,
                }}>
                    <TouchableOpacity style={{
                        backgroundColor: 'red',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 50,
                        borderRadius: 5
                    }}
                        onPress={this._handleFilter}
                    >
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: 'white'
                        }}>ÁP DỤNG</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

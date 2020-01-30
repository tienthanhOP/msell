import React, { Component } from 'react'
import {
    Text, View, Switch, TouchableOpacity,
    ActivityIndicator, 
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Utilities from '../../utils/Utilities'
import MapView from 'react-native-maps';
import { Actions } from 'react-native-router-flux';

export class SaveFilter extends Component {
    state = {
        firstLoading: true,
        switchNotiApp: false,
        switchNotiEmail: false,
        viewFilter: []
    }

    async componentDidMount() {
        try {
            var dataFilter = global.dataFilter
            var viewFilterTemp = []
            var arrKeysFilter = Object.keys(dataFilter)

            var strLocations = []
            this.props.listSearch.forEach(element => {
                strLocations.push(element.name)
            });

            if (strLocations.length > 0) {
                viewFilterTemp.push(
                    <Text style={{
                        marginBottom: 4,
                        fontSize: 14,
                        color: 'black'
                    }}>Khu vực: {strLocations.toString()}</Text>
                )
            } else {
                viewFilterTemp.push(
                    <Text style={{
                        marginBottom: 4,
                        fontSize: 14,
                        color: 'black'
                    }}>Khu vực: Bất kỳ</Text>
                )
            }


            if (arrKeysFilter.length > 0) {
                if (dataFilter.hasOwnProperty("category")) {
                    if (dataFilter.hasOwnProperty("sub_category")) {
                        if (dataFilter["category"] !== "all") {
                            var nameCat = Utilities.getNameCategory(dataFilter["category"])
                            if (nameCat !== "") {
                                viewFilterTemp.push(
                                    <Text style={{
                                        marginBottom: 4,
                                        fontSize: 14,
                                        color: 'black'
                                    }}>Loại đất: {nameCat}
                                    </Text>
                                )
                            }
                        } else {
                            viewFilterTemp.push(
                                <Text style={{
                                    marginBottom: 4,
                                    fontSize: 14,
                                    color: 'black'
                                }}>Loại đất: Bất kỳ
                                </Text>
                            )
                        }
                    }
                }

                if (dataFilter.hasOwnProperty("min_acreage") || dataFilter.hasOwnProperty("max_acreage")) {
                    var min = dataFilter.hasOwnProperty("min_acreage") ? dataFilter["min_acreage"] : ""
                    var max = dataFilter.hasOwnProperty("max_acreage") ? dataFilter["max_acreage"] : ""
                    viewFilterTemp.push(
                        <Text style={{
                            fontSize: 13,
                            color: 'rgba(0,0,0,0.7)',
                            marginVertical: 1
                        }}>{Utilities._handlePropertyFilter(min, max, "m²")}</Text>
                    )
                }

                if (dataFilter.hasOwnProperty("min_floors") || dataFilter.hasOwnProperty("max_foors")) {
                    var min = dataFilter.hasOwnProperty("min_floors") ? dataFilter["min_floors"] : ""
                    var max = dataFilter.hasOwnProperty("max_foors") ? dataFilter["max_foors"] : ""
                    viewFilterTemp.push(
                        <Text style={{
                            fontSize: 13,
                            color: 'rgba(0,0,0,0.7)',
                            marginVertical: 1
                        }}>{Utilities._handlePropertyFilter(min, max, "tầng")}</Text>
                    )
                }

                if (dataFilter.hasOwnProperty("min_price") || dataFilter.hasOwnProperty("max_price")) {
                    var min = dataFilter.hasOwnProperty("min_price") ? dataFilter["min_price"] : ""
                    var max = dataFilter.hasOwnProperty("max_price") ? dataFilter["max_price"] : ""
                    viewFilterTemp.push(
                        <Text style={{
                            fontSize: 13,
                            color: 'rgba(0,0,0,0.7)',
                            marginVertical: 1
                        }}>{Utilities._handlePrice(min, max)}</Text>
                    )
                }

                if (dataFilter.hasOwnProperty("min_beds") || dataFilter.hasOwnProperty("max_beds")) {
                    var min = dataFilter.hasOwnProperty("min_beds") ? dataFilter["min_beds"] : ""
                    var max = dataFilter.hasOwnProperty("max_beds") ? dataFilter["max_beds"] : ""
                    viewFilterTemp.push(
                        <Text style={{
                            fontSize: 13,
                            color: 'rgba(0,0,0,0.7)',
                            marginVertical: 1
                        }}>{Utilities._handlePropertyFilter(min, max, "phòng ngủ")}</Text>
                    )
                }

                if (dataFilter.hasOwnProperty("min_toilets") || dataFilter.hasOwnProperty("max_toilets")) {
                    var min = dataFilter.hasOwnProperty("min_toilets") ? dataFilter["min_toilets"] : ""
                    var max = dataFilter.hasOwnProperty("max_toilets") ? dataFilter["max_toilets"] : ""
                    viewFilterTemp.push(
                        <Text style={{
                            fontSize: 13,
                            color: 'rgba(0,0,0,0.7)',
                            marginVertical: 1
                        }}>{Utilities._handlePropertyFilter(min, max, "phòng vệ sinh")}</Text>
                    )
                }
            } else {
                viewFilterTemp.push(
                    <Text style={{
                        fontSize: 13,
                        color: 'rgba(0,0,0,0.7)',
                        marginVertical: 1
                    }}>Tất cả các tin bất động sản được rao bán</Text>
                )
            }

            this.setState({
                firstLoading: false,
                viewFilter: viewFilterTemp
            })
        } catch (error) {
          //  alert(error)
        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
                padding: 16,
                paddingTop: Utilities.checkAndroidOS ? 20 : 30,
                backgroundColor: 'white'
            }}>
                <MaterialIcons name={"clear"} size={30} color={"black"}
                    onPress={() => Actions.pop()} />
                <Text style={{
                    fontSize: 18,
                    paddingHorizontal: 24,
                    marginTop: 8,
                    textAlign: 'center'
                }}>Lưu tiêu chí lọc của bạn để nhận thông báo khi danh sách cập nhật</Text>
                <View style={{
                    borderRadius: 5,
                    marginVertical: 40,
                    shadowOffset: { width: 0, height: 0 },
                    shadowRadius: 5,
                    shadowOpacity: 0.5,
                    elevation: 5,
                    backgroundColor: 'white',
                    flexDirection: 'row'
                }}>
                    <MapView
                        ref={ref => this.map = ref}
                        style={{
                            height: '100%', width: 100, minHeight: 100,
                            borderRadius: 5,
                        }}
                        loadingEnabled={true}
                        initialRegion={{
                            latitude: 21.0294498,
                            longitude: 105.8544441,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005
                        }}
                        rotateEnabled={false}
                        zoomEnabled={false}
                        pitchEnabled={false}
                        scrollEnabled={false}
                        onMapReady={() => this.map.fitToCoordinates(this.props.mapBoundingBox)}
                    />
                    <View style={{
                        flex: 1,
                        padding: 10,
                        justifyContent: 'center'
                    }}>
                        {
                            this.state.firstLoading ?
                                <ActivityIndicator size="large" color="red" />
                                :
                                <View>
                                    {this.state.viewFilter}
                                </View>
                        }
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        flex: 1,
                        opacity: 0.9,
                        fontSize: 15
                    }}>Gửi thông báo tới ứng dụng</Text>
                    <Switch value={this.state.switchNotiApp}
                        onValueChange={(value) => this.setState({ switchNotiApp: value })}
                    />
                </View>
                <View style={{
                    height: 0.5,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    marginVertical: 16
                }} />
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        flex: 1,
                        opacity: 0.9,
                        fontSize: 15
                    }}>Gửi thông báo tới email</Text>
                    <Switch value={this.state.switchNotiEmail}
                        onValueChange={(value) => this.setState({ switchNotiEmail: value })}
                    />
                </View>
                <TouchableOpacity style={{
                    marginTop: 30,
                    height: 50,
                    backgroundColor: 'red',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 3,
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                    right: 16
                }}
                    onPress={() => {
                        alert('Comming soon')
                    }}
                >
                    <Text style={{
                        color: 'white',
                        fontSize: 15,
                        textTransform: 'uppercase',
                        fontWeight: 'bold'
                    }}>Lưu</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default SaveFilter

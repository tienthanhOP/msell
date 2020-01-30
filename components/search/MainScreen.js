import React, { Component } from 'react'
import {
    Text, StyleSheet, View, TouchableOpacity,
    Platform, TextInput, FlatList, AsyncStorage, ActivityIndicator, Alert
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Actions } from 'react-native-router-flux'
import * as CONSTANTS from '../../constants/Constants'
import Utilities from '../../utils/Utilities.js'
import { Content } from 'native-base'
import { getLocationCityByCode } from '../../database/CitysSchema'
import { getLocationDistrictsByCode } from '../../database/DistrictsSchema'
import { getLocationWardsByCode } from '../../database/WardsSchema'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

class ItemSearch extends Component {
    constructor(props) {
        super(props)
    }

    async getLocation(level, code) {
        switch (level) {
            case 1:
                var result = await getLocationCityByCode(code)

                if (result) {
                    return JSON.parse(result.locations);
                }

                return null
            case 2:
            case 4:
                var result = await getLocationDistrictsByCode(code)

                if (result) {
                    return JSON.parse(result.locations);
                }

                return null
            case 3:
                var result = await getLocationWardsByCode(code)
                if (result) {
                    return JSON.parse(result.locations);
                }

                return null
            default:
                return null;
        }
    }

    render() {
        var item = this.props.dataItem

        var name = ""
        var path = ""

        if (this.props.isProject) {
            name = item.name
            path = item.address
        } else {
            var nameTemp = item.path ? item.path : item.name
            var arrName = nameTemp.split(",")
            if (arrName.length === 1) {
                name = arrName[0]
            } else {
                name = arrName[0].trim()
                path = nameTemp.replace(name + ",", '').trim()
            }
        }

        return (
            <TouchableOpacity style={{
                marginStart: 46,
                marginEnd: 16,
                paddingVertical: 8,
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 0.3,
                borderColor: 'rgba(0,0,0,0.1)'
            }}
                onPress={async () => {
                    try {
                        var arrHistorySearch = [];

                        var historySearch = await AsyncStorage.getItem(CONSTANTS.HISTORY_SEARCH)
                        if (historySearch) {
                            var arrTemp = JSON.parse(historySearch)
                            if (Array.isArray(arrTemp)) {
                                arrHistorySearch = arrTemp

                                var indexItemInArr = arrHistorySearch.findIndex(element =>
                                    element.code === item.code
                                )

                                if (indexItemInArr > -1) {
                                    arrHistorySearch.splice(indexItemInArr, 1)
                                    arrHistorySearch.unshift(item)
                                } else {
                                    arrHistorySearch.unshift(item)
                                }
                            } else {
                                arrHistorySearch.unshift(item)
                            }

                            AsyncStorage.setItem(CONSTANTS.HISTORY_SEARCH, JSON.stringify(arrHistorySearch.slice(0, 3)))
                        } else {
                            arrHistorySearch.push(item)
                            AsyncStorage.setItem(CONSTANTS.HISTORY_SEARCH, JSON.stringify(arrHistorySearch))
                        }
                        global.fittedToMap = []
                        if (this.props.isProject || item.level == 5) {
                            this.props.onClick(item.locations, item.name, item.level, item.project_id)
                        } else {
                            var code = item.level != 4 ? item.code : item.parent_code
                            this.props.onClick(await this.getLocation(item.level, code), item.name, item.level, item.code)
                        }
                        Actions.pop()
                    } catch (error) {

                    }
                }}
            >
                {
                    this.props.isProject || item.level == 5
                        ?
                        <MaterialCommunityIcons name={"city"} size={14} color={'black'} />
                        :
                        (
                            item.level && item.level == 4
                                ?
                                <MaterialCommunityIcons name={"road-variant"} size={14} color={'black'} />
                                :
                                <Entypo name={"location"} size={14} color={'black'} />
                        )
                }
                <View style={{ marginStart: 6 }}>
                    <Text style={{
                        fontSize: 14,
                        color: 'black'
                    }}>{name}</Text>
                    {
                        path !== "" ?
                            <Text style={{
                                fontSize: 11,
                                color: 'black',
                                opacity: 0.8
                            }}>{path}</Text>
                            : null
                    }
                    {
                        this.props.levelSearch == -1 ? null
                            :
                            (this.props.levelSearch == item.level ? null
                                :
                                <Text style={{
                                    color: 'rgba(0,0,0,0.6)',
                                    fontSize: 10
                                }}>Khác cấp đơn vị hành chính. <Text style={{
                                    color: 'red',
                                    fontSize: 10
                                }}>Xoá và chạy tìm kiếm này</Text></Text>
                            )
                    }
                </View>
            </TouchableOpacity>
        )
    }
}

export default class MainScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstLoading: true,
            textSearch: "",
            historySearch: []
        }
        this._handleSearch = this._handleSearch.bind(this)
        this.timeout = null
    }

    componentDidMount() {
        try {
            setTimeout(async () => {
                var dataHistorySearch = JSON.parse(await AsyncStorage.getItem(CONSTANTS.HISTORY_SEARCH))
                if (Array.isArray(dataHistorySearch)) {
                    this.setState({
                        firstLoading: false,
                        historySearch: dataHistorySearch
                    })
                } else {
                    this.setState({
                        firstLoading: false,
                        historySearch: []
                    })
                }
            }, 500)
        } catch (error) {
            this.setState({
                firstLoading: false,
                historySearch: []
            })
        }
    }

    _handleSearch(text) {
        try {
            if (text === "") {
                if (this.timeout) {
                    clearTimeout(this.timeout)
                }

                this.props.cleanSearchMapAction()
                this.setState({
                    textSearch: text
                })
            } else {
                if (this.timeout) {
                    clearTimeout(this.timeout)
                }

                this.timeout = setTimeout(() => {
                    this.props.searchMapAction(Utilities.xoa_dau(text.toLowerCase()))
                }, 500)

                this.setState({
                    textSearch: text
                })
            }

        } catch (error) {
        }
    }

    render() {
        return (
            <View
                style={{
                    backgroundColor: 'white',
                    flex: 1
                }}>
                <View style={styles.toolbar}>
                    <View style={{
                        flexDirection: 'row',
                        flex: 1,
                        alignItems: 'center'
                    }}
                    >
                        <TouchableOpacity style={{
                            height: 45,
                            justifyContent: 'center'
                        }}
                            onPress={() => Actions.pop()} >
                            <Ionicons name={"md-arrow-back"} size={24} color={'black'}
                                style={{
                                    paddingStart: 16,
                                    width: 35
                                }} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ flex: 1 }}
                            activeOpacity={1}
                            onPress={() => this.inputSearch.focus()}>
                            <FlatList
                                horizontal
                                data={this.props.listSearch}
                                extraData={this.props.listSearch}
                                keyExtractor={(index) => index}
                                ListFooterComponent={
                                    <View
                                        style={{
                                            justifyContent: 'center',
                                            height: '100%'
                                        }}>
                                        <TextInput
                                            ref={ref => this.inputSearch = ref}
                                            style={{
                                                paddingStart: 5,
                                                fontSize: 14,
                                            }}
                                            autoFocus={true}
                                            returnKeyType={'done'}
                                            value={this.state.textSearch}
                                            placeholder="Tìm kiếm..."
                                            placeholderTextColor='rgba(0,0,0,0.5)'
                                            onChangeText={(text) => this._handleSearch(text)}
                                        />
                                    </View>}
                                renderItem={({ item }) =>
                                    <View style={{
                                        flexDirection: 'row',
                                        backgroundColor: '#d9d9d9',
                                        borderRadius: 11,
                                        height: 22,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                        marginStart: 5
                                    }}>
                                        <Text style={{
                                            fontSize: 11,
                                            paddingStart: 3,
                                            color: 'rgba(0,0,0,0.8)'
                                        }}>{item.name}</Text>

                                        <TouchableOpacity style={{
                                            height: 16,
                                            width: 16,
                                            borderRadius: 8,
                                            backgroundColor: 'white',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginHorizontal: 3
                                        }}
                                            onPress={() => this.props.eventDeleteSearchLocation(item.code)}>
                                            <MaterialIcons name={"clear"} size={14} color={'#d9d9d9'} />
                                        </TouchableOpacity>
                                    </View>
                                } />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={{
                        height: 20,
                        width: 20,
                        borderRadius: 10,
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 16
                    }}
                        onPress={() => {
                            this.props.cleanSearchMapAction()
                            this.setState({
                                textSearch: ""
                            })
                        }}
                    >
                        <MaterialIcons name={"clear"} size={16} color={"white"} />
                    </TouchableOpacity>
                </View>
                {
                    this.state.firstLoading ?
                        <ActivityIndicator size='large' color='red' style={{ flex: 1, alignSelf: 'center' }} />
                        :
                        <Content>
                            {
                                this.state.historySearch.length > 0 && this.state.textSearch.trim() === ""
                                    ?
                                    <View>
                                        <View style={{
                                            flexDirection: 'row',
                                            paddingHorizontal: 16,
                                            paddingTop: 16,
                                            paddingBottom: 5,
                                            alignItems: 'center'
                                        }}>
                                            <MaterialIcons name={"history"} size={24} color={"black"} style={{ width: 30 }} />
                                            <Text style={{
                                                fontSize: 14,
                                                color: 'black',
                                                fontWeight: '500'
                                            }}>TÌM KIẾM GÂN ĐÂY</Text>
                                        </View>
                                        <FlatList
                                            scrollEnabled={false}
                                            ListFooterComponent={
                                                <TouchableOpacity style={{
                                                    marginStart: 46,
                                                    marginEnd: 16,
                                                    paddingVertical: 8,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                                    onPress={() => {
                                                        Alert.alert(
                                                            'Thông báo',
                                                            'Bạn muốn xoá những tìm kiếm gần đây?',
                                                            [
                                                                {
                                                                    text: 'Huỷ',
                                                                    style: 'cancel'
                                                                },
                                                                {
                                                                    text: 'Đồng ý',
                                                                    onPress: () => {
                                                                        AsyncStorage.removeItem(CONSTANTS.HISTORY_SEARCH)
                                                                        this.setState({
                                                                            historySearch: []
                                                                        })
                                                                    }
                                                                },
                                                            ],
                                                            { cancelable: false },
                                                        );
                                                    }}
                                                >
                                                    <Ionicons name={"ios-trash"} size={12}
                                                        style={{ color: 'black', opacity: 0.8 }} />

                                                    <View style={{ marginStart: 6 }}>
                                                        <Text style={{
                                                            fontSize: 12,
                                                            color: 'black',
                                                            opacity: 0.8
                                                        }}>Xoá những tìm kiếm gần đây</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                            data={this.state.historySearch}
                                            keyExtractor={(index) => index}
                                            extraData={this.state.historySearch}
                                            renderItem={({ item }) =>
                                                <ItemSearch
                                                    dataItem={item}
                                                    levelSearch={this.props.levelSearch}
                                                    onClick={(location, name, level, location_id) =>
                                                        this.props.eventClickItemSearchLocation(location, name, level, location_id)} />
                                            }
                                        />
                                    </View>
                                    :
                                    null
                            }
                            {
                                this.state.textSearch.trim() !== "" && this.props.searchSuccess
                                    ? <View>
                                        <FlatList
                                            ListEmptyComponent={
                                                <View style={{
                                                    marginStart: 46,
                                                    marginEnd: 16,
                                                    paddingVertical: 8,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    borderBottomWidth: 0.3,
                                                    borderColor: 'rgba(0,0,0,0.1)'
                                                }}>
                                                    <AntDesign name={"warning"} size={14} color={'black'} />

                                                    <View style={{ marginStart: 6 }}>
                                                        <Text style={{
                                                            fontSize: 14,
                                                            color: 'black'
                                                        }}>Không tìm thấy khu vực nào</Text>
                                                    </View>
                                                </View>
                                            }
                                            ListHeaderComponent={
                                                <View style={{
                                                    flexDirection: 'row',
                                                    paddingHorizontal: 16,
                                                    paddingTop: 16,
                                                    paddingBottom: 5,
                                                    alignItems: 'center'
                                                }}>
                                                    <Ionicons name={"ios-search"} size={24} color={'black'} style={{ width: 30 }} />
                                                    <Text style={{
                                                        fontSize: 14,
                                                        color: 'black',
                                                        fontWeight: '500'
                                                    }}>KHU VỰC</Text>
                                                </View>
                                            }
                                            scrollEnabled={false}
                                            data={this.props.addressSearch}
                                            extraData={this.props.addressSearch}
                                            keyExtractor={(item) => item.id}
                                            renderItem={({ item }) =>
                                                <ItemSearch
                                                    dataItem={item}
                                                    levelSearch={this.props.levelSearch}
                                                    onClick={(location, name, level, location_id) =>
                                                        this.props.eventClickItemSearchLocation(location, name, level, location_id)} />
                                            }
                                        />
                                        <FlatList
                                            ListEmptyComponent={
                                                <View style={{
                                                    marginStart: 46,
                                                    marginEnd: 16,
                                                    paddingVertical: 8,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    borderBottomWidth: 0.3,
                                                    borderColor: 'rgba(0,0,0,0.1)'
                                                }}>
                                                    <AntDesign name={"warning"} size={14} color={'black'} />

                                                    <View style={{ marginStart: 6 }}>
                                                        <Text style={{
                                                            fontSize: 14,
                                                            color: 'black'
                                                        }}>Không tìm thấy dự án nào</Text>
                                                    </View>
                                                </View>
                                            }
                                            ListHeaderComponent={
                                                <View style={{
                                                    flexDirection: 'row',
                                                    paddingHorizontal: 16,
                                                    paddingTop: 16,
                                                    paddingBottom: 5,
                                                    alignItems: 'center'
                                                }}>
                                                    <Ionicons name={"ios-search"} size={24} color={'black'} style={{ width: 30 }} />
                                                    <Text style={{
                                                        fontSize: 14,
                                                        color: 'black',
                                                        fontWeight: '500'
                                                    }}>DỰ ÁN</Text>
                                                </View>
                                            }
                                            scrollEnabled={false}
                                            data={this.props.projectsSearch}
                                            extraData={this.props.projectsSearch}
                                            keyExtractor={(item) => item.id}
                                            renderItem={({ item }) =>
                                                <ItemSearch
                                                    isProject={true}
                                                    dataItem={item}
                                                    levelSearch={this.props.levelSearch}
                                                    onClick={(location, name, level, location_id) =>
                                                        this.props.eventClickItemSearchLocation(location, name, level, location_id)} />
                                            }
                                        />
                                    </View>
                                    :
                                    null
                            }

                        </Content>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    toolbar: {
        paddingTop: (Utilities.checkAndroidOS() ? 0 : getStatusBarHeight()),
        backgroundColor: 'white',
        height: 56 + (Utilities.checkAndroidOS() ? 0 : getStatusBarHeight()),
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: "transparent",
        // paddingTop: Platform.OS === 'ios' ? 15 : 0,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 1,
        shadowOpacity: 0.1,
        elevation: 2
    },
})

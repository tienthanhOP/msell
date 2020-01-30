import React, { Component } from 'react'
import {
    Text, View, Platform, StatusBar,
    TouchableOpacity, Dimensions, FlatList
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from './style/CssToolbarMainScreen'
import { Actions } from 'react-native-router-flux';
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import Utilities from '../../utils/Utilities';

export default class ToolbarMainScreen extends Component {
    render() {
        return (
            <View style={{
                backgroundColor: 'white',
                paddingTop: Utilities.checkAndroidOS() ? 0 : getStatusBarHeight(),
                shadowOffset: { width: 0, height: 1 },
                shadowRadius: 2,
                shadowOpacity: 0.2,
                elevation: 2,
                // zIndex: 999
            }}>
                <StatusBar backgroundColor={"#e6e6e6"} barStyle="dark-content" />
                <View style={styles.viewContentContainer}>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            flex: 1
                        }}
                        activeOpacity={1}
                        onPress={() => Actions.search()}>
                        <Ionicons name={"ios-search"} size={20} color={'rgba(0,0,0,0.5)'}
                            style={{
                                paddingStart: 16,
                                width: 35
                            }} />
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={this.props.listSearch}
                            extraData={this.props.listSearch}
                            keyExtractor={(item) => item.code}
                            ListFooterComponent={
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center'
                                    }}>
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            paddingStart: 5,
                                            color: 'rgba(0,0,0,0.8)',
                                            fontSize: this.props.listSearch.length == 0 ? 14 : 10
                                        }}>{this.props.listSearch.length == 0
                                            ? "Tìm kiếm..." : "Khu vực khác"}</Text>
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
                                        // }}>{this.props.nameLocationSearch}</Text>
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
                                        onPress={() => {
                                            this.props.eventDeleteSearchLocation(item.code)
                                            if (this.props.listSearch.length == 0) {
                                                this.props.onRefreshMap()
                                            }
                                        }}>
                                        <MaterialIcons name={"clear"} size={14} color={'#d9d9d9'} />
                                    </TouchableOpacity>
                                </View>
                            } />
                    </TouchableOpacity>

                    <View style={{
                        height: 30,
                        // marginTop: Platform.OS === 'ios' ? 40 : 10,
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        width: 0.3,
                    }} />

                    <TouchableOpacity style={{ width: 90, justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => {
                            this.props.onFlipMap()
                        }}>
                        <Text style={{
                            fontSize: 14,
                            color: 'rgba(0,0,0,0.8)'
                        }}>{this.props.disableViewProduct ? "Danh sách" : "Bản đồ"}</Text>
                    </TouchableOpacity>
                </View>

                <View style={{
                    backgroundColor: 'white',
                    height: 40,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    borderTopWidth: 0.3,
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    borderTopColor: 'rgba(0,0,0,0.1)'
                }}>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 0.5,
                            borderRadius: 2,
                            borderColor: 'rgba(0,0,0,0.2)',
                            height: 27,
                            flexDirection: 'row',
                            paddingHorizontal: 10
                        }}
                        onPress={() => this.props.openFilter()}>
                        <Text style={{
                            color: 'rgba(0,0,0,0.8)',
                            fontSize: 12
                        }}>Bộ lọc</Text>
                        {
                            this.props.countNumber > 0 ?
                                <View style={{
                                    marginStart: 3,
                                    borderRadius: 7,
                                    height: 14,
                                    width: 14,
                                    backgroundColor: 'rgba(0,0,0,0.8)',
                                    justifyContent: 'center',
                                }}>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 8,
                                        textAlign: 'center'
                                    }}>{this.props.countNumber}</Text>
                                </View>
                                : null
                        }
                    </TouchableOpacity>

                    {/* <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 2,
                            height: 25,
                            backgroundColor: "rgba(217, 30, 24, 1)"
                        }}
                        onPress={() => this.props.openSaveFilter()}>
                        <Text style={{
                            paddingHorizontal: 10,
                            color: 'white',
                            fontSize: 12,
                            textAlign: 'center'
                        }}>Lưu bộ lọc</Text>
                    </TouchableOpacity>
                     */}
                </View>
            </View>
        )
    }
}

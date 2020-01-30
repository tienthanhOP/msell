import React, { Component, PureComponent } from 'react'
import {
    Text, StyleSheet, View, Dimensions, TouchableOpacity,
    FlatList, TextInput, AsyncStorage
} from 'react-native'
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Balloon1 from './svg/Balloon1_Introduce';
import Balloon2 from './svg/Balloon2_Introduce';
import Balloon3 from './svg/Balloon3_Introduce';
import Balloon4 from './svg/Balloon4_Introduce';
import Logo_With_Text from './svg/Logo_With_Text';
import Logo2_Introduce from './svg/Logo2_Introduce';
import FastImage from 'react-native-fast-image';
import Img1_Introduce from './svg/Img1_Introduce';
import { getAllCitys } from '../database/CitysSchema'
import Utilities from '../utils/Utilities';
import App from '../App';

const { width, height } = Dimensions.get('screen')

class SelectLocation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            textSearch: "",
            dataCitys: [],
            dataSearch: [],
            showListLocation: false
        }
    }

    async componentDidMount() {
        var dataCitys = await getAllCitys();

        this.setState({
            dataSearch: dataCitys,
            dataCitys
        })
    }

    _handleSearch(text) {
        var dataSearch = this.state.dataCitys.filter(e =>
            (Utilities.xoa_dau(e.name.toLowerCase())).startsWith(Utilities.xoa_dau(text.toLowerCase())))

        this.setState({
            textSearch: text,
            dataSearch: dataSearch,
            showListLocation: true
        })
    }

    render() {
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: width - 80
            }}>
                <View
                    style={{
                        height: 40,
                        width: width - 80,
                        backgroundColor: 'white',
                        paddingStart: 16,
                        borderRadius: 5,
                        shadowOffset: { width: 0, height: 0 },
                        shadowRadius: 2,
                        shadowOpacity: 0.2,
                        elevation: 3,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                    <TextInput style={{
                        fontSize: 16,
                        flex: 1
                    }}
                        value={this.state.textSearch}
                        placeholder="Tìm khu vực bạn ở..."
                        returnKeyType="done"
                        onChangeText={(text) => this._handleSearch(text)}
                    />
                    <TouchableOpacity
                        style={{
                            borderStartWidth: 1,
                            borderColor: 'rgba(0,0,0,0.1)',
                            paddingStart: 10,
                            paddingEnd: 7
                        }}
                        onPress={() => { this.setState({ showListLocation: !this.state.showListLocation }) }}
                        activeOpacity={0.5}>
                        <MaterialIcons
                            name={this.state.showListLocation ? "arrow-drop-up" : "arrow-drop-down"}
                            color="black"
                            size={28}
                            style={{ marginEnd: 5 }}
                        />
                    </TouchableOpacity>
                </View>
                {
                    this.state.showListLocation
                        ?
                        <View style={{
                            backgroundColor: 'white',
                            maxHeight: 150,
                            position: 'absolute',
                            top: 41,
                            left: 0,
                            right: 0,
                            borderRadius: 5,
                            shadowOffset: { width: 0, height: 0 },
                            shadowRadius: 2,
                            shadowOpacity: 0.2,
                            elevation: 3,
                            paddingHorizontal: 2,
                            zIndex: 999
                        }}
                        >
                            <FlatList
                                style={{ flexGrow: 0 }}
                                data={this.state.dataSearch}
                                keyExtractor={(item) => item.code}
                                extraData={this.state.dataSearch}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                global.itemLocation = item
                                                this.setState({
                                                    showListLocation: false,
                                                    textSearch: item.name
                                                })
                                            }}
                                            style={{
                                                height: 40,
                                                flex: 1,
                                                marginHorizontal: 16,
                                                borderBottomWidth: 0.5,
                                                borderColor: 'rgba(0,0,0,0.2)',
                                                justifyContent: 'center'
                                            }}>
                                            <Text style={{
                                                color: 'black',
                                                fontSize: 14
                                            }}>{item.name ? item.name : ""}</Text>
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                        </View>
                        :
                        null
                }
                <SelectPostType />
            </View>
        )
    }
}

class SelectPostType extends Component {
    constructor(props) {
        super(props)
        this.state = {
            location: null,
            indexType: 1
        }
        global.type_of_post = 1
    }

    render() {
        return (
            <View style={{
                marginTop: 20,
            }}>
                <View style={{
                    marginBottom: 10,
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            global.type_of_post = 1
                            this.setState({
                                indexType: 1
                            })
                        }}
                        activeOpacity={0.5}
                        style={{
                            position: 'absolute',
                            height: 45,
                            width: 143,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                            shadowOffset: { width: 2, height: 3 },
                            shadowRadius: 2,
                            shadowOpacity: 0.2,
                            elevation: 3,
                            marginTop: 5,
                            borderWidth: this.state.indexType == 1 ? 2 : 0,
                            borderColor: '#E91322',
                            zIndex: 2
                        }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold'
                        }}>MUA NHÀ</Text>
                    </TouchableOpacity>
                    <Balloon3 />
                </View>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <Balloon4 />
                    <TouchableOpacity
                        onPress={() => {
                            global.type_of_post = 2
                            this.setState({
                                indexType: 2
                            })
                        }}
                        activeOpacity={0.5}
                        style={{
                            position: 'absolute',
                            right: 0,
                            height: 45,
                            width: 144,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                            shadowOffset: { width: 2, height: 3 },
                            shadowRadius: 2,
                            shadowOpacity: 0.2,
                            elevation: 3,
                            marginTop: 5,
                            borderWidth: this.state.indexType == 2 ? 2 : 0,
                            borderColor: '#E91322',
                            zIndex: 2
                        }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold'
                        }}>THUÊ NHÀ</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default class Introduce extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            location: null,
            indexType: 1,
            showScreenMain: false
        }
        global.firstOpenApp = true
    }

    render() {
        if (this.state.showScreenMain) return <App />

        return (
            <Swiper
                loadMinimal
                loop={false}
                activeDotColor='red'
                dotStyle={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    marginBottom: -10
                }}
                activeDotStyle={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    marginBottom: -10
                }}>
                <LinearGradient
                    colors={['#CBF6FC', '#E8FFFF', '#E8F9F9', '#FFFFFF']}
                    style={{
                        flex: 1
                    }}>
                    <View
                        pointerEvents="none"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 50
                        }}>
                        <View style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Logo_With_Text />
                        </View>
                        <View style={{
                            marginTop: 25,
                            alignSelf: 'flex-end',
                            marginEnd: 32
                        }}>
                            <Balloon1 />
                        </View>
                        <View>
                            <FastImage
                                style={{
                                    width: 330,
                                    height: 230
                                }}
                                source={require('../images/slogan_introduce.png')}
                            />
                        </View>
                        <View style={{
                            alignSelf: 'flex-start',
                            marginStart: 64
                        }}>
                            <Balloon2 />
                        </View>
                    </View>
                    <View
                        pointerEvents="none"
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: -30
                        }}>
                        <FastImage style={{ height: width, width: width }}
                            source={require('../images/map_introduce.png')} />
                    </View>
                </LinearGradient>
                <LinearGradient
                    colors={['#CBF6FC', '#E8FFFF', '#E8F9F9', '#FFFFFF']}
                    style={{
                        flex: 1,
                        alignItems: 'center'
                    }}>
                    <View
                        pointerEvents="none"
                        style={{
                            position: 'absolute',
                            right: 32,
                            top: 95
                        }}>
                        <Balloon1 />
                    </View>
                    <View
                        pointerEvents="none"
                        style={{
                            position: 'absolute',
                            left: 32,
                            top: 50
                        }}>
                        <Balloon2 />
                    </View>
                    <View
                        pointerEvents="none"
                        style={{
                            marginTop: 50,
                            marginBottom: 50
                        }}>
                        <Logo2_Introduce />
                    </View>
                    <SelectLocation />
                    {/* <SelectPostType /> */}
                    <FastImage
                        pointerEvents="none"
                        style={{
                            height: 300,
                            width: 300,
                            position: 'absolute',
                            bottom: 0,
                            zIndex: 2
                        }}
                        source={require('../images/img_introduce.png')} />
                    <View style={{
                        position: 'absolute',
                        right: 0,
                        bottom: -20
                    }}>
                        <Img1_Introduce />
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            if (!global.itemLocation) {
                                Utilities.showToast("Xin vui lòng chọn khu vực")
                            } else {
                                AsyncStorage.setItem("FirstOpenApp",
                                    JSON.stringify({ "value": "true" }), (err, result) => {
                                    });
                                this.setState({
                                    showScreenMain: true
                                })
                            }
                        }}
                        style={{
                            position: 'absolute',
                            bottom: 24,
                            right: 0,
                            backgroundColor: 'red',
                            height: 40,
                            width: 80,
                            borderBottomStartRadius: 20,
                            borderTopStartRadius: 20,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            shadowOffset: { width: -1, height: 3 },
                            shadowRadius: 2,
                            shadowOpacity: 0.2,
                            elevation: 3,
                            zIndex: 999
                        }}>
                        <Text style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 14
                        }}>Xong</Text>
                        <Ionicons name="ios-done-all" size={32} color={"white"}
                            style={{
                                marginLeft: 5,
                                alignSelf: 'center',
                                textAlign: 'center',
                                marginTop: 3
                            }}
                        />
                    </TouchableOpacity>
                </LinearGradient>
            </Swiper>
        )
    }
}

const styles = StyleSheet.create({})
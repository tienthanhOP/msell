import React, { Component } from 'react'
import {
    Text, View, Dimensions, FlatList,
    Animated, ActivityIndicator
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './style/CssDetail'
import Utilities from '../../utils/Utilities.js';
import ItemProduct from '../../containers/map/ItemProduct'
import InteractableDetail from '../../containers/detail_product/InteractableDetail'

const Screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 50
}


export default class Detail extends Component {
    state = {
        activeSections: [0, 1, 2],
        animatedInfo: new Animated.Value(1),
        animetedMinimize: new Animated.Value(0)
    };

    componentDidMount() {

    }

    _handleHideInfoInImage = () => {
        if (!this.props.hideInfoInImage) {
            this.props.onHideInfoInImage(true)
        }
    }

    render() {
        var dataItem = this.props.data.dataDetail ? this.props.data.dataDetail : null
        var propertiesItem = null

        if (!dataItem) {
            return (
                <ActivityIndicator color="red" style={{ flex: 1 }} />
            )
        } else {
            propertiesItem = this.props.data.dataDetail.properties
        }

        var price = propertiesItem && propertiesItem.price ? Utilities.formatPrice(propertiesItem.price) : "Liên hệ";
        var acreage = propertiesItem && propertiesItem.acreage ? Math.round(parseFloat(propertiesItem.acreage) * 100) / 100 : "-";
        var beds = propertiesItem && propertiesItem.beds ? propertiesItem.beds : "-";
        var toilets = propertiesItem && propertiesItem.toilets ? propertiesItem.toilets : "-";
        var floor = propertiesItem && propertiesItem.floors ? propertiesItem.floors : "-";
        var address = propertiesItem && propertiesItem.address ? propertiesItem.address : "-";

        Animated.parallel([
            Animated.timing(this.state.animetedMinimize,
                {
                    toValue: this.props.hideInfoInImage ? 1 : 0,
                    duration: 100
                }),
            Animated.timing(this.state.animatedInfo,
                {
                    toValue: this.props.hideInfoInImage ? 0 : 1,
                    duration: 100
                })
        ]).start()

        return (
            <View style={[styles.panel, {
                backgroundColor: this.props.data.isList ? 'transparent' : 'white',
            }]}>
                {
                    this.props.data.isList
                        ?
                        <View style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                            <View style={{
                                height: Utilities.checkAndroidOS() ? 85 : 100,
                                width: "100%",
                                backgroundColor: 'rgba(0,0,0,0.3)'
                            }}>
                                <View style={{
                                    flex: 1,
                                    height: 4,
                                    width: 50,
                                    position: 'absolute',
                                    bottom: 15,
                                    borderRadius: 2,
                                    alignSelf: 'center',
                                    backgroundColor: 'white'
                                }} />
                            </View>
                            <View style={{
                                height: 2,
                                width: "100%",
                                backgroundColor: 'rgba(0,0,0,0.3)'
                            }} />

                            <FlatList
                                style={{
                                    height: Screen.height - (Utilities.checkAndroidOS() ? 110 : 100)
                                }}
                                data={this.props.data.dataDetail.list}
                                extraData={this.props.data.dataDetail.list}
                                keyExtractor={(item) => item.product_id}
                                ItemSeparatorComponent={() => <View style={{
                                    height: 1,
                                    width: '100%',
                                    backgroundColor: 'rgba(0,0,0,0.3)'
                                }} />}
                                renderItem={({ item }) => (
                                    <ItemProduct dataItem={item} />
                                )}
                            />

                            <View style={{ height: Utilities.checkAndroidOS() ? 10 : 0 }} />
                        </View>
                        :
                        <View style={styles.panel}>
                            <InteractableDetail dataItem={dataItem}
                                data={this.props.data}
                                onHideInfoInImage={() => this._handleHideInfoInImage()}
                                onSnapFillScreen={() => this.props.onSnapFillScreen()}
                                onSnapMinimize={() => this.props.onSnapMinimize()}
                                minimize={this.state.animetedMinimize} />

                            <View style={{
                                zIndex: 2,
                                position: 'absolute',
                                flex: 1
                            }}>
                                <Animated.View
                                    pointerEvents="none"
                                    style={{
                                        position: 'absolute',
                                        width: Screen.width,
                                        height: 220,
                                        opacity: this.state.animatedInfo
                                    }}>

                                    <LinearGradient
                                        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)']}
                                        style={styles.gradientBottomImg}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flex: 1 }}>
                                                <View style={styles.viewMoney}>
                                                    <View style={styles.iconViewMoney}>
                                                        <FontAwesome name={"money"} size={12} color={'white'} />
                                                    </View>
                                                    <View>
                                                        <Text style={styles.txtMoney}>{price}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.viewAcreage}>
                                                    <View style={styles.iconViewAcreage}>
                                                        <FontAwesome name={"home"} size={12} color={'white'} />
                                                    </View>
                                                    <Text
                                                        numberOfLines={1}
                                                        style={styles.txtAcreage}>{acreage} m²</Text>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5 }}>
                                                    <Text style={[styles.txtMoney, { marginStart: 0 }]}>{beds}</Text>
                                                    <Text style={[styles.txtCountRoom, { marginStart: 0 }]}>P.Ngủ</Text>
                                                </View>
                                                <View style={{
                                                    borderLeftWidth: 0.5, borderColor: 'white', justifyContent: 'center',
                                                    alignItems: 'center', paddingHorizontal: 5, marginVertical: 5
                                                }}>
                                                    <Text style={[styles.txtMoney, { marginStart: 0 }]}>{toilets}</Text>
                                                    <Text style={[styles.txtCountRoom, { marginStart: 0 }]}>WC</Text>
                                                </View>
                                                <View style={{
                                                    borderLeftWidth: 0.5, borderColor: 'white', justifyContent: 'center',
                                                    alignItems: 'center', paddingHorizontal: 5, marginVertical: 5
                                                }}>
                                                    <Text style={[styles.txtMoney, { marginStart: 0 }]}>{floor}</Text>
                                                    <Text style={[styles.txtCountRoom, { marginStart: 0 }]}>Tầng</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.viewAddress}>
                                            <View style={styles.iconViewAddress}>
                                                <Entypo name={"location"} size={12} color={'white'} />
                                            </View>
                                            <Text
                                                numberOfLines={1}
                                                style={styles.txtAddress}>{address}</Text>
                                        </View>
                                    </LinearGradient>

                                </Animated.View>
                            </View>
                            {/* <Animated.View style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                opacity: this.state.animetedMinimize,
                                zIndex: 2
                            }}>
                                <LinearGradient
                                    style={{
                                        flex: 1,
                                        height: HEADER_TOOLBAR_HEIGHT,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingTop: Utilities.checkAndroidOS() ? 0 : 16,
                                        paddingHorizontal: 16
                                    }}
                                    colors={['rgba(255,255,255,0.6)', 'rgba(255,255,255,0.3)', 'rgba(255,255,255,0)']} >

                                    <TouchableOpacity style={{ zIndex: 3 }}
                                        onPress={() => {
                                            this.props.onSnapMinimize()
                                        }}>
                                        <Ionicons name={"ios-arrow-down"}
                                            size={28}
                                            color={'white'} />
                                    </TouchableOpacity>
                                    <View style={{ flex: 1 }} />
                                    <TouchableOpacity style={{
                                        zIndex: 3,
                                        alignSelf: 'flex-end'
                                    }}>
                                        <MaterialCommunityIcons name="arrow-expand"
                                            size={24}
                                            color={'white'} />
                                    </TouchableOpacity>

                                </LinearGradient>
                            </Animated.View> */}

                        </View>
                }
            </View>
        )
    }
}
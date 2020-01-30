import React, { Component } from 'react'
import {
    Text, StyleSheet, View,
    Dimensions, ActivityIndicator
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Utilities from '../../utils/Utilities';
import HeaderImage from '../detail_product/HeaderImage';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import * as Animatable from 'react-native-animatable';

const Screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}

export default class ItemProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            price: "-",
            acreage: "-",
            beds: "-",
            toilets: "-",
            floor: "-",
            address: "-"
        }
    }

    componentDidMount() {
        var data = this.props.dataItem
        var propertiesItem = data.properties

        var price = "-"
        var acreage = "-"
        var beds = "-"
        var toilets = "-"
        var floor = "-"
        var address = "-"

        if (propertiesItem) {
            price = propertiesItem.price ? Utilities.formatPrice(propertiesItem.price) : "Liên hệ"
            acreage = propertiesItem.acreage
                && Number.isInteger(propertiesItem.acreage) ? Math.round(parseFloat(propertiesItem.acreage) * 100) / 100 : "-"
            beds = propertiesItem.beds ? propertiesItem.beds : "-"
            toilets = propertiesItem.toilets ? propertiesItem.toilets : "-"
            floor = propertiesItem.floors ? propertiesItem.floors : "-"
            address = propertiesItem.address ? propertiesItem.address : "-";
        }

        setTimeout(() => {
            this.setState({
                loading: false,
                price,
                acreage,
                beds,
                toilets,
                floor,
                address
            })
        }, 1000)
    }

 

    render() {
        return (
            <View
                style={styles.containerItem}>
                {
                    this.state.loading
                        ?
                        <Animatable.View animation="fadeIn" style={{ backgroundColor: 'white' }}>
                            <View style={{ zIndex: 1 }}>
                                <View style={{
                                    backgroundColor: 'white',
                                    height: 220
                                }}>
                                    <ActivityIndicator size={'small'} color="gray" style={{
                                        alignSelf: 'center',
                                        flex: 1
                                    }} />
                                </View>
                            </View>
                            <View style={{
                                zIndex: 2,
                                position: 'absolute',
                                flex: 1
                            }}>
                                <LinearGradient
                                    pointerEvents="none"
                                    style={styles.gradientTopItem}
                                    colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0)']}>
                                </LinearGradient>
                                <View
                                    pointerEvents="none"
                                    style={{
                                        position: 'absolute', width: Screen.width, height: 220
                                    }}>
                                    <LinearGradient
                                        pointerEvents="none"
                                        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)']}
                                        style={styles.gradientBottomItem}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flex: 1 }}>
                                                <ShimmerPlaceHolder style={{
                                                    height: 20,
                                                    width: 70,
                                                }}
                                                    autoRun={true} />
                                                <ShimmerPlaceHolder style={{
                                                    height: 20,
                                                    width: 100,
                                                    marginTop: 5
                                                }}
                                                    autoRun={true} />
                                            </View>
                                            <ShimmerPlaceHolder style={{
                                                height: 45,
                                                width: 150
                                            }}
                                                autoRun={true} />
                                        </View>
                                        <ShimmerPlaceHolder style={{
                                            height: 20,
                                            marginTop: 5,
                                            width: Screen.width - 16
                                        }}
                                            autoRun={true} />
                                    </LinearGradient>
                                </View>
                            </View>
                        </Animatable.View >
                        :
                        <Animatable.View animation="fadeIn">
                            <View style={{ zIndex: 1 }}>
                                <HeaderImage dataItem={this.props.dataItem}
                          
                                    itemList={true} />
                            </View>
                            <View style={{
                                zIndex: 2,
                                position: 'absolute',
                                flex: 1
                            }}>
                                <LinearGradient
                                    pointerEvents="none"
                                    style={styles.gradientTopItem}
                                    colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0)']}>
                                </LinearGradient>
                                <View
                                    pointerEvents="none"
                                    style={{
                                        position: 'absolute', width: Screen.width, height: 220
                                    }}>
                                    <LinearGradient
                                        pointerEvents="none"
                                        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)']}
                                        style={styles.gradientBottomItem}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flex: 1 }}>
                                                <View style={styles.viewMoney}>
                                                    <View style={styles.iconViewMoney}>
                                                        <FontAwesome name={"money"} size={12} color={'white'} />
                                                    </View>
                                                    <View>
                                                        <Text style={styles.txtMoney}>{this.state.price}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.viewAcreage}>
                                                    <View style={styles.iconViewAcreage}>
                                                        <FontAwesome name={"home"} size={12} color={'white'} />
                                                    </View>
                                                    <Text
                                                        numberOfLines={1}
                                                        style={styles.txtAcreage}>{this.state.acreage} m²</Text>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5 }}>
                                                    <Text style={[styles.txtMoney, { marginStart: 0 }]}>{this.state.beds}</Text>
                                                    <Text style={[styles.txtAddress, { marginStart: 0 }]}>P.Ngủ</Text>
                                                </View>
                                                <View style={{
                                                    borderLeftWidth: 0.5, borderColor: 'white', justifyContent: 'center',
                                                    alignItems: 'center', paddingHorizontal: 5, marginVertical: 5
                                                }}>
                                                    <Text style={[styles.txtMoney, { marginStart: 0 }]}>{this.state.toilets}</Text>
                                                    <Text style={[styles.txtAddress, { marginStart: 0 }]}>WC</Text>
                                                </View>
                                                <View style={{
                                                    borderLeftWidth: 0.5, borderColor: 'white', justifyContent: 'center',
                                                    alignItems: 'center', paddingHorizontal: 5, marginVertical: 5
                                                }}>
                                                    <Text style={[styles.txtMoney, { marginStart: 0 }]}>{this.state.floor}</Text>
                                                    <Text style={[styles.txtAddress, { marginStart: 0 }]}>Tầng</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.viewAddress}>
                                            <View style={styles.iconViewAddress}>
                                                <Entypo name={"location"} size={12} color={'white'} />
                                            </View>
                                            <Text
                                                numberOfLines={1}
                                                style={styles.txtAddress}>{this.state.address}</Text>
                                        </View>
                                    </LinearGradient>
                                </View>
                            </View>
                        </Animatable.View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    photo: {
        height: 220,
    },
    containerItem: {
        width: '100%',
        height: 220,
        marginBottom: 0.5
    },
    gradientBottomItem: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 8,
        paddingTop: 15
    },
    gradientTopItem: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 50
    },
    viewMoney: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconViewMoney: {
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 4,
        backgroundColor: 'green',
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtMoney: {
        color: 'white',
        fontSize: 16,
        marginStart: 5,
        fontWeight: 'bold'
    },
    viewAcreage: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    iconViewAcreage: {
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 4,
        backgroundColor: 'green',
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtAcreage: {
        marginStart: 5,
        color: 'white',
        fontSize: 13,
        fontWeight: '600'
    },
    viewAddress: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    iconViewAddress: {
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 4,
        backgroundColor: 'green',
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtAddress: {
        marginStart: 5,
        color: 'white',
        fontSize: 12,
        fontWeight: '400'
    }
})
import React, { Component } from 'react'
import {
    Text, View, Dimensions, TouchableOpacity, FlatList, ActivityIndicator, Linking
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { Content } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import { styles } from './style/CssDetail'
import Utilities from '../../utils/Utilities.js';
import Accordion from 'react-native-collapsible/Accordion';
import CalenderDetail from './CalenderDetail.js';
import { getAllProperties, } from '../../database/PropertiesSchema'
import { insertProductFavourite, checkProductLikeToExist, dislikeProductByProductId } from '../../database/ProductOfFavouriteSchema'

const Screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 50
}

const SECTIONS = [
    {
        title: 'CHI TIẾT',
        content: 'detail'
    },
    {
        title: 'MÔ TẢ',
        content: 'description'
    },
    {
        title: 'LIÊN HỆ',
        content: 'contact'
    }
];

export default class DetailScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeSections: [0, 1, 2],
            like: false,
            mapReady: false
        }
        this.listProperties = []
        this.oldProp = null
    }

    _renderHeader = (item, index, isActive) => {
        try {
            return (
                <View style={styles.header}>
                    <Text style={styles.headerText}>{item.title}</Text>
                    <Ionicons name={isActive ? "ios-arrow-down" : "ios-arrow-forward"} size={24} color={'rgba(0,0,0,0.8)'} />
                </View>
            );
        } catch (error) {

        }
    };

    _renderContent(section, dataItem) {
        try {
            switch (section.content) {
                case 'detail': {
                    var dataProperties = [];
                    var arrProperties = Object.keys(dataItem.properties);
                    for (let index = 0; index < arrProperties.length; index++) {
                        const element = arrProperties[index];
                        if (element === "address") {
                            continue
                        }

                        var property = this.listProperties.find(e => e.key == element)

                        if (property) {
                            if (dataItem.properties[element] !== "0" && dataItem.properties[element] != 0) {
                                dataProperties.push({
                                    name: property.name,
                                    value: dataItem.properties[element]
                                })
                            }
                        }
                    }

                    return (
                        <View style={styles.content}>
                            <Text style={{
                                fontSize: 14,
                                fontWeight: '500',
                                color: 'rgba(0,0,0,0.8)'
                            }}>{dataItem.title}</Text>
                            <View style={{
                                height: 0.5, flex: 1, opacity: 0.3, marginTop: 10
                            }} />
                            <Text style={{
                                fontSize: 14,
                                marginTop: 10,
                                color: 'rgba(0,0,0,0.8)'
                            }}>
                                {dataItem.properties && dataItem.properties.address
                                    ? dataItem.properties.address : "-"}</Text>
                            <View style={{
                                height: 0.5, flex: 1, opacity: 0.3, marginTop: 10
                            }} />
                            <FlatList
                                style={{ marginTop: 10 }}
                                data={dataProperties}
                                extraData={dataProperties}
                                keyExtractor={(index) => index}
                                renderItem={({ item }) => (
                                    <View style={{
                                        flexDirection: (item.value.toString().length < 50) ? 'row' : 'column',
                                        marginBottom: 3,
                                        minWidth: 100
                                    }}>
                                        <Text style={{
                                            flex: 1,
                                            color: 'rgba(0,0,0,0.8)'
                                        }}>• {item.name.trim()}</Text>
                                        <Text style={{ color: 'rgba(0,0,0,0.8)' }}>{item.name === "Hình thức" ? (item.value == 1 ? "Bán" : "Thuê") : item.value}</Text>
                                    </View>
                                )}
                            />
                        </View>
                    )
                }
                case 'description':
                    return (
                        <View style={styles.content}>
                            <Text style={{ color: 'rgba(0,0,0,0.8)' }}>{dataItem.description}</Text>
                        </View>
                    )
                case 'contact':
                    var info = dataItem.owner_info;
                    return (
                        <View style={styles.content}>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: 'rgba(0,0,0,0.8)' }}>Thông tin người đăng tin</Text>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <Text style={{ flex: 1, marginTop: 3, color: 'rgba(0,0,0,0.8)' }}>• Tên liên lạc</Text>
                                <Text style={{ color: 'rgba(0,0,0,0.8)' }}>{info.contact_name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={{ flex: 1, color: 'rgba(0,0,0,0.8)' }}>• Số điện thoại</Text>
                                <Text style={{ color: 'rgba(0,0,0,0.8)' }}>{info.phone}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={{ flex: 1, color: 'rgba(0,0,0,0.8)' }}>• Địa chỉ email</Text>
                                <Text style={{ color: 'rgba(0,0,0,0.8)' }}>{info.email ? info.email : '-'}</Text>
                            </View>
                            <View style={{
                                height: 0.5, flex: 1, opacity: 0.3, marginTop: 10
                            }} />
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                                    onPress={() => {
                                        if (info.phone) {
                                            Linking.openURL(`sms:${info.phone}`)
                                        } else {
                                            Utilities.showToast("Ngưởi đăng tin không có số điện thoại")
                                        }
                                    }}>
                                    <AntDesign name="message1" size={24} color='rgba(0,0,0,0.8)' />
                                    <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.5)', opacity: 0.8, marginTop: 2 }}>Gửi tin nhắn</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                                    onPress={() => {
                                        if (info.email) {
                                            Linking.openURL("mailto:"
                                                + info.email + "?subject=" + "&body=")
                                        } else {
                                            Utilities.showToast("Ngưởi đăng tin không có địa chỉ email")
                                        }
                                    }}>
                                    <AntDesign name="mail" size={24} color='rgba(0,0,0,0.8)' />
                                    <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.5)', opacity: 0.8, marginTop: 2 }}>Gửi email</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                                    onPress={() => {
                                        if (info.phone) {
                                            Linking.openURL(`tel:${info.phone}`)
                                        } else {
                                            Utilities.showToast("Ngưởi đăng tin không có số điện thoại")
                                        }
                                    }}>
                                    <AntDesign name="phone" size={24} color='rgba(0,0,0,0.8)' />
                                    <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.5)', opacity: 0.8, marginTop: 2 }}>Gọi điện</Text>
                                </TouchableOpacity>
                            </View>
                        </View >
                    )
                default:
                    return (
                        null
                    );
            }
        } catch (error) {
            // alert(error)
        }
    };

    _updateSections = activeSections => {
        this.setState({ activeSections });
    };

    async componentWillMount() {
        this.listProperties = await getAllProperties()
    }

    async componentWillReceiveProps(props) {
        try {
            let res = await checkProductLikeToExist(props.data.product_id);
            if (res !== this.state.like) {
                this.setState({
                    like: res
                })
            }
            if (JSON.stringify(props) !== this.oldProp) {
                this.oldProp = JSON.stringify(props)
                if (this.state.mapReady && props.data && props.data.coordinates) {
                    this.map.animateToRegion({
                        ...props.data.coordinates,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005
                    })
                }
            }
        } catch (error) {

        }
    }

    async componentDidMount() {
        try {
            if (JSON.stringify(this.props) !== this.oldProp) {
                this.oldProp = JSON.stringify(this.props)
                let res = await checkProductLikeToExist(this.props.data.product_id);
                if (res !== this.state.like) {
                    this.setState({
                        like: res
                    })
                }
                if (this.state.mapReady && this.props.data && this.props.data.coordinates) {
                    this.map.animateToRegion({
                        ...this.props.data.coordinates,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005
                    })
                }
            }
        } catch (error) {

        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.state.like !== nextState.like
    // }

    render() {
        var dataItem = this.props.data ? this.props.data : null;
        var propertiesItem = null

        Utilities.log(dataItem)

        if (!dataItem) {
            return (
                <ActivityIndicator color="red" style={{ flex: 1 }} />
            )
        } else {
            propertiesItem = dataItem.properties

            if (propertiesItem) {
                Object.keys(propertiesItem).map(e => {
                    if (!propertiesItem[e])
                        delete propertiesItem[e]
                })
            }
        }

        var typeOfPost = propertiesItem && propertiesItem.type_of_post == 1 ? "Bán" : "Thuê";
        var price = propertiesItem && propertiesItem.price ? Utilities.formatPrice(propertiesItem.price) : "Liên hệ";
        var acreage = propertiesItem && propertiesItem.acreage ? Math.round(parseFloat(propertiesItem.acreage) * 100) / 100 : "-";
        var address = propertiesItem && propertiesItem.address ? propertiesItem.address : "-";

        var phoneNumber = dataItem.owner_info && dataItem.owner_info.phone ? dataItem.owner_info.phone : null;

        return (
            <Content
                style={{
                    backgroundColor: 'white',
                    paddingBottom: 100
                }}>
                <View style={{ marginVertical: 20 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{
                                color: 'rgba(0,0,0,0.8)',
                                fontSize: 14,
                                fontWeight: '500'
                            }}>{price}</Text>
                            <Text style={{ fontSize: 11, color: 'rgba(0,0,0,0.5)', opacity: 0.8 }}>Giá</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{
                                color: 'rgba(0,0,0,0.8)',
                                fontSize: 14,
                                fontWeight: '500'
                            }}>{acreage} (m²)</Text>
                            <Text style={{ fontSize: 11, color: 'rgba(0,0,0,0.5)', opacity: 0.8 }}>Diện tích</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{
                                color: 'rgba(0,0,0,0.8)',
                                fontSize: 14,
                                fontWeight: '500',
                                textAlign: 'center'
                            }}>{typeOfPost}</Text>
                            <Text style={{ fontSize: 11, color: 'rgba(0,0,0,0.5)', opacity: 0.8 }}>Hình thức</Text>
                        </View>
                    </View>
                    <Text style={{
                        fontSize: 12, color: 'rgba(0,0,0,0.8)', marginTop: 20,
                        marginHorizontal: 16, alignSelf: 'center',
                        fontWeight: '500', textAlign: 'center'
                    }}>{address}</Text>
                </View>
                <View style={{ height: 1, flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }} />
                <View style={styles.viewFastOptions}>
                    <TouchableOpacity style={styles.btnFastOptions}
                        onPress={() => {
                            if (phoneNumber) {
                                Linking.openURL(`tel:${phoneNumber}`)
                            } else {
                                Utilities.showToast("Ngưởi đăng tin không có số điện thoại")
                            }
                        }} >
                        <SimpleLineIcons name={"call-out"} size={18} color={'rgba(0,0,0,0.8)'} />
                        <Text style={styles.txtFastOptions}>Liên hệ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnFastOptions}
                        onPress={() => {
                            try {
                                if (this.state.like) {
                                    dislikeProductByProductId(this.props.data.product_id)
                                        .then(res => {
                                            if (res == true) {
                                                Utilities.showToast("Bỏ thích", "red")
                                                this.setState({ like: false })
                                                this.props.refreshInfoDetailProductAction()
                                                this.props.deleteProductsFavouriteAction(this.props.data.product_id)
                                            }
                                        }).catch()
                                } else {
                                    insertProductFavourite(this.props.data).then(res => {
                                        if (res == true) {
                                            Utilities.showToast("Đã thích", "green");
                                            this.setState({ like: true })
                                            this.props.refreshInfoDetailProductAction()
                                            this.props.addProductsFavouriteAction(this.props.data)
                                        }
                                    }).catch()
                                }

                            } catch (error) {
                            }

                        }}>
                        <MaterialIcons name={this.state.like ? "favorite" : "favorite-border"} size={20} color={this.state.like ? "red" : 'rgba(0,0,0,0.8)'} />
                        <Text style={styles.txtFastOptions}>Yêu thích</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnFastOptions}
                        onPress={() => alert("Comming soon!")}>
                        <SimpleLineIcons name={"share"} size={18} color={'rgba(0,0,0,0.8)'} />
                        <Text style={styles.txtFastOptions}>Chia sẻ</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 25 }}>
                    <TouchableOpacity style={styles.btnExpandMap}
                        onPress={() => Actions.zoomMapInDetail({ coordinates: dataItem.coordinates })}>
                        <MaterialCommunityIcons name="arrow-expand" size={24} color="rgba(0,0,0,0.8)" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnDirectionsMap}
                        onPress={() => Actions.zoomMapInDetail({ coordinates: dataItem.coordinates })}>
                        <MaterialIcons name="directions" size={14} color="rgba(0,0,0,0.8)" />
                        <Text style={{
                            color: 'rgba(0,0,0,0.8)',
                            fontSize: 13,
                            marginStart: 3
                        }}>Chỉ đường</Text>
                    </TouchableOpacity>
                    {
                        dataItem.coordinates ?
                            <MapView
                                ref={ref => { this.map = ref }}
                                style={{ height: 150, width: Screen.width }}
                                loadingEnabled={true}
                                initialRegion={{
                                    ...dataItem.coordinates,
                                    latitudeDelta: 0.005,
                                    longitudeDelta: 0.005
                                }}
                                rotateEnabled={false}
                                zoomEnabled={false}
                                pitchEnabled={false}
                                scrollEnabled={false}
                                onMapReady={() => {
                                    this.setState({
                                        mapReady: true
                                    })
                                }}
                            >
                                {
                                    this.state.mapReady ?
                                        <Marker coordinate={dataItem.coordinates} />
                                        : null
                                }
                            </MapView>
                            : null
                    }
                </View>
                <Accordion
                    expandMultiple
                    underlayColor={"white"}
                    activeSections={this.state.activeSections}
                    sections={SECTIONS}
                    renderHeader={this._renderHeader}
                    renderContent={(section) => this._renderContent(section, dataItem)}
                    onChange={this._updateSections}
                />
                {
                    dataItem.source
                        ?
                        <Text style={{
                            fontSize: 10,
                            textAlign: 'right',
                            fontStyle: 'italic',
                            paddingRight: 16
                        }}>Nguồn: '{dataItem.source}'</Text>
                        :
                        null
                }
                {/* <CalenderDetail /> */}
                {/* <View style={{ height: 16 }} /> */}
            </Content>
        )
    }
}
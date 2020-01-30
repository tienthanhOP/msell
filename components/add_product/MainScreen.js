import React, { Component } from 'react'
import {
    Text, StyleSheet, View, TouchableOpacity, ActivityIndicator, AsyncStorage
} from 'react-native'
import Toolbar from './ToolbarMainScreen'
import Utilities from '../../utils/Utilities';
import TextInputCustom from './TextInputCustom';
import DropDownLocation from '../../containers/add_product/DropDownLocation';
import DropDownCategories from './DropDownCategories';
import SelectImages from '../../containers/add_product/UploadImages';
import Properties from './Properties';
import validator from 'validator';
import { Actions } from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import * as CONSTANTS from '../../constants/Constants';
import * as Animatable from 'react-native-animatable';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const minLengthInputs = {
    title: 30,
    description: 50
}

const maxLengthInputs = {
    title: 100,
    description: 3000
}

const keys = {
    title: "title",
    description: "description",
    location: "location",
    address: "address",
    category: "category",
    type_of_post: "type_of_post",
    acreage: "acreage",
    price: "price",
    properties: "properties",
    images: "images",
    contact_name: "contact_name",
    phone: "phone",
    email: "email"
}

export default class MainScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
        }
        this.data = {}
    }

    componentWillMount() {
        if (this.props.isUpdate) {
            var data = this.props.dataEdit
            data.location = {
                city_id: data.city_id,
                district_id: data.district_id,
                wards_id: data.wards_id,
                street_id: data.street_id,
                project_id: data.project_id,
                coordinate: data.coordinates
            }
            data.type_of_post = data.properties.type_of_post
            data.category = data.properties.category
            data.address = data.properties.address
            data.acreage = data.properties.acreage
            data.price = data.properties.price

            this.data = data
        }
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 500);
    }

    onRecieverValueProduct(key, value) {
        try {
            switch (key) {
                case 'properties':
                    this.data['properties'] = {
                        ...this.data['properties'],
                        ...value
                    }
                    break;
                default:
                    this.data[key] = value
                    break;
            }
        } catch (error) {
            //   alert(error)
        }
    }

    async checkValidate() {
        try {
            var data = this.data
            //title
            if (data.hasOwnProperty(keys.title)) {
                if (data.title.length < minLengthInputs.title) {
                    this.inputTitle.reciverError("Tiêu đề tối thiểu 30 ký tự!")
                    this.scrollView.scrollIntoView(this.title)
                    return
                }
            } else {
                this.inputTitle.reciverError("Bạn chưa nhập tiêu đề!")
                this.scrollView.scrollIntoView(this.title)
                return
            }
            //description
            if (data.hasOwnProperty(keys.description)) {
                if (data.description.length < minLengthInputs.description) {
                    this.inputDescription.reciverError("Mô tả tối thiểu 50 ký tự!")
                    this.scrollView.scrollIntoView(this.description)
                    return
                }
            } else {
                this.inputDescription.reciverError("Bạn chưa nhập mô tả!")
                this.scrollView.scrollIntoView(this.description)
                return
            }
            //location
            if (data.hasOwnProperty(keys.location)) {
                if (!data.location.city_id) {
                    Utilities.showToast("Bạn chưa chọn Tỉnh/Thành Phố")
                    this.scrollView.scrollIntoView(this.address)
                    return
                }
                if (!data.location.district_id) {
                    Utilities.showToast("Bạn chưa chọn Quận/Huyện")
                    this.scrollView.scrollIntoView(this.address)
                    return
                }
                if (!data.location.wards_id) {
                    Utilities.showToast("Bạn chưa chọn Xã/Phường")
                    this.scrollView.scrollIntoView(this.address)
                    return
                }
                if (!data.location.coordinate) {
                    Utilities.showToast("Bạn chưa cắm vị trí trên bản đồ")
                    this.scrollView.scrollIntoView(this.address)
                    return
                }
            } else {
                Utilities.showToast("Bạn chưa chọn Tỉnh/Thành Phố")
                this.scrollView.scrollIntoView(this.address)
                return
            }

            if (!data.hasOwnProperty(keys.category) || data.category === null) {
                Utilities.showToast("Bạn chưa chọn loại đất")
                this.scrollView.scrollIntoView(this.category)
                return
            }

            if (this.selectImage.getListImages().length == 0) {
                Utilities.showToast("Bạn chưa chọn hình ảnh")
                this.scrollView.scrollIntoView(this.images)
                return
            }

            var dataFormatted = {
                post_code: new Date().getTime() + Utilities.randomCharactersNumber(3),
                title: data.title,
                description: data.description,
                properties: {
                    type_of_post: data.type_of_post,
                    category: data.category,
                    price: data.price,
                    acreage: data.acreage,
                    direction: data.properties && data.properties.direction ? data.properties.direction : null,
                    direction_balcony: data.properties && data.properties.direction_balcony ? data.properties.direction_balcony : null,
                    floors: data.properties && data.properties.floors ? data.properties.floors : null,
                    beds: data.properties && data.properties.beds ? data.properties.beds : null,
                    baths: data.properties && data.properties.baths ? data.properties.baths : null,
                    toilets: data.properties && data.properties.toilets ? data.properties.toilets : null,
                    facade: data.properties && data.properties.facade ? data.properties.facade : null,
                    road_wide: data.properties && data.properties.road_wide ? data.properties.road_wide : null,
                    juridical: data.properties && data.properties.juridical ? data.properties.juridical : null,
                    furniture: data.properties && data.properties.furniture ? data.properties.furniture : null,
                    address: data.address
                },
                images: this.selectImage.getListImages(),
                city_id: data.location.city_id,
                district_id: data.location.district_id,
                wards_id: data.location.wards_id,
                street_id: data.location.street_id,
                location: data.location.coordinate,
                project_id: data.location.project_id,
                owner_info: {
                    owner_type: CONSTANTS.OWNER_POST_TYPE_WITH_ACCOUNT,
                    owner_id: await Utilities.getUserID()
                }
            }

            if (this.props.isUpdate) {
                dataFormatted.product_id = this.props.dataEdit.product_id
                this.props.updateProductToListAction(dataFormatted)
                this.props.updateProductAction(dataFormatted)
            } else {
                this.props.addProductToListAction(dataFormatted)
                this.props.addProductAction(dataFormatted)
            }
            Actions.pop()
        } catch (error) {
            //   alert(error)
        }
    }

    _scrollToInput(reactNode) {
        // Add a 'scroll' ref to your ScrollView
        this.scroll.props.scrollToFocusedInput(reactNode)
    }

    render() {
        var title = ""
        var description = ""
        var price = ""
        var acreage = ""
        var address = ""
        var city_id = null
        var district_id = null
        var wards_id = null
        var street_id = null
        var project_id = null
        var coordinates = null
        var type_of_post = null
        var category = null
        var images = null
        var properties = null

        if (this.data && this.data.location) {
            title = this.data.title ? this.data.title : ""
            description = this.data.description ? this.data.description : ""
            images = this.data.images ? this.data.images : []

            properties = this.data.properties ? this.data.properties : null

            if (properties) {
                price = properties.price ? properties.price + "" : ""
                acreage = properties.acreage ? properties.acreage + "" : ""
                type_of_post = properties.type_of_post ? parseInt(properties.type_of_post) : null
                category = properties.category ? properties.category : null
                address = properties.address ? properties.address : ""
            }

            city_id = this.data.location.city_id
            district_id = this.data.location.district_id
            wards_id = this.data.location.wards_id
            street_id = this.data.location.street_id
            project_id = this.data.location.project_id
            coordinates = this.data.location.coordinate
        }

        return (
            <Animatable.View style={styles.container} animation="fadeIn">
                <Toolbar title={this.props.isUpdate ? "Cập nhật tin" : "Đăng tin"} />
                {
                    this.state.loading
                        ?
                        <ActivityIndicator size="small" color="black" style={{ alignSelf: 'center', flex: 1 }} />
                        :
                        <View style={{ flex: 1 }}>
                            <KeyboardAwareScrollView style={styles.content}
                                ref={ref => this.scrollView = ref}>
                                <Text
                                    ref={ref => this.title = ref}
                                    style={[styles.txtTitle, {
                                        marginTop: 20,
                                    }]}>Tiêu đề(*)</Text>
                                <TextInputCustom
                                    onRef={ref => (this.inputTitle = ref)}
                                    style={{
                                        marginTop: 8,
                                        marginBottom: 24
                                    }}
                                    valueEdit={title}
                                    onRecieverValueProduct={(value) => this.onRecieverValueProduct(keys.title, value)}
                                    minLength={minLengthInputs.title}
                                    maxLength={maxLengthInputs.title}
                                    placeholder="Nhập tiêu đề tin..." />
                                <Text
                                    ref={ref => this.description = ref}
                                    style={styles.txtTitle}>Mô tả(*)</Text>
                                <TextInputCustom
                                    onRef={ref => (this.inputDescription = ref)}
                                    style={{
                                        height: 220,
                                        marginTop: 8,
                                        marginBottom: 24,
                                    }}
                                    valueEdit={description}
                                    onRecieverValueProduct={(value) => this.onRecieverValueProduct(keys.description, value)}
                                    minLength={minLengthInputs.description}
                                    maxLength={maxLengthInputs.description}
                                    multiline={true}
                                    placeholder="Giới thiệu về bất động sản của bạn..." />
                                <Text
                                    ref={ref => this.address = ref}
                                    style={styles.txtTitle}>Địa chỉ</Text>
                                <DropDownLocation onRecieverValueProduct={(value) => this.onRecieverValueProduct(keys.address, value)}
                                    onRecieverValueLocation={(value) => this.onRecieverValueProduct(keys.location, value)}
                                    locations_id={{ city_id, district_id, wards_id, street_id, project_id }}
                                    coordinates={coordinates}
                                    address={address} />
                                <Text
                                    ref={ref => this.category = ref}
                                    style={styles.txtTitle}>Hình thức(*)</Text>
                                <DropDownCategories onRecieverValueProduct={(value) => this.onRecieverValueProduct(keys.category, value)}
                                    onRecieverValuePostType={(value) => this.onRecieverValueProduct(keys.type_of_post, value)}
                                    type_of_post={type_of_post}
                                    category={category} />
                                <Text style={styles.txtTitle}>Diện tích</Text>
                                <Text style={{ fontSize: 10, color: 'rgba(0,0,0,0.8)' }}>Đơn vị mét vuông(m²)</Text>
                                <TextInputCustom
                                    onRef={ref => (this.inputAcreage = ref)}
                                    onRecieverValueProduct={(value) => this.onRecieverValueProduct(keys.acreage, value)}
                                    style={{
                                        marginTop: 8,
                                        marginBottom: 24
                                    }}
                                    valueEdit={acreage}
                                    keyboardType="decimal-pad"
                                    maxLength={10}
                                    placeholder="Diện tích..." />
                                <Text style={styles.txtTitle}>Giá</Text>
                                <Text style={{ fontSize: 10, color: 'rgba(0,0,0,0.8)' }}>Đơn vị VNĐ(₫)</Text>
                                <TextInputCustom
                                    onRef={ref => (this.inputPrice = ref)}
                                    onRecieverValueProduct={(value) => this.onRecieverValueProduct(keys.price, value)}
                                    style={{
                                        marginTop: 8,
                                        marginBottom: 24
                                    }}
                                    valueEdit={price}
                                    keyboardType="number-pad"
                                    maxLength={12}
                                    placeholder="Giá..." />
                                <Text
                                    ref={ref => this.images = ref}
                                    style={styles.txtTitle}>Hình ảnh(*)</Text>
                                <SelectImages onRef={ref => (this.selectImage = ref)}
                                    images={images} />
                                <Text style={styles.txtTitle}>Thông tin chi tiết</Text>
                                <Properties onRecieverValueProduct={(value) => this.onRecieverValueProduct(keys.properties, value)}
                                    valueEdit={properties} />
                            </KeyboardAwareScrollView>
                        </View>
                }
                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    flexDirection: 'row',
                    borderTopWidth: 0.5,
                    borderBottomWidth: 0.5,
                    borderColor: 'green',
                    backgroundColor: 'white',
                    marginBottom: getBottomSpace()
                }}>
                    <TouchableOpacity
                        onPress={() => this.checkValidate()}
                        style={{
                            height: 50,
                            backgroundColor: 'green',
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Text style={{
                            color: 'white',
                            fontWeight: '500',
                            fontSize: 16,
                            textTransform: 'uppercase'
                        }}>{this.props.isUpdate ? "Cập nhật tin" : "Đăng tin"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => Actions.pop()}
                        style={{
                            height: 50,
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <Text style={{
                            color: 'green',
                            fontWeight: '500',
                            fontSize: 16,
                        }}>HỦY</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
        marginBottom: 50 + getBottomSpace()
    },
    txtTitle: {
        fontSize: 15,
        fontWeight: '500',
        color: 'rgba(0,0,0,0.8)'
    },

})

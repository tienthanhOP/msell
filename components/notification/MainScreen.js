import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList } from 'react-native'
import Toolbar from './ToolbarMainScreen'
import ItemProduct from '../map/ItemProduct';
import * as Animatable from 'react-native-animatable';

let dataFake = [{
    title: "Ban nha 123 Lac Long Quan, Tay Ho, Ha Noi, 10 tang, mat tien 5m, dien tich 2300 m2",
    images: [
        'https://i.pinimg.com/originals/f2/cb/6c/f2cb6c5b4aac518473632d88e3d60b98.jpg',
        'https://znews-photo.zadn.vn/w480/Uploaded/pgi_xvauqbnau/2014_03_11/1.jpg',
        'https://noithattinhte.vn/a/ngoi_nha_dep_2_tang_khong_gian_xanh_17814__1_.jpg',
        'https://jobnguoiviet.com/wp-content/uploads/2018/11/nha-cho-thue-jobnguoiviet-3.jpg',
        'https://cdn-images-1.medium.com/max/1600/0*_HCBex_AXfnGhQ-8.jpg'
    ],
    price: 1500000,
    address: '123 Lac Long Quan, Tay Ho, Ha Noi, Viet Nam',
    acreage: 2300,
    formality: "Cho thuê",
    region: {
        latitude: 21.0294498,
        longitude: 105.8544441
    },
    description: "Công ty Happy Land chuyên phân phối, mua bán - chuyển nhượng căn hộ Centana Thủ Thiêm quận 2 Hiện nay, chúng tôi đang có nhiều khách hàng muốn mua căn hộ Centana Thủ Thiêm.Khách thiện chí, đã được tư vấn đầy đủ thông tin dự án, đã xem nhà mẫu, chỉ cần có sản phẩm phù hợp sẽ đặt cọc. Những sản phẩm khách đang cần gấp: - Officetel diện tích 44m2, 55m2, 61m2, 74m2. - Căn hộ: Diện tích 64m2, 88m2, 97m2, 2-3 phòng ngủ, tất cả các view, tầng. Hỗ trợ toàn bộ các thủ tục sang tên, công chứng, khai thuế. Chúng tôi có đội ngũ nhân sự tư vấn chuyên nghiệp, có sẵn khách hàng mua, sẵn sàng đầu tư chi phí marketing để thúc đẩy nhanh nhất việc ra hàng cho quý khách. Liên hệ: 0912 598058. 45 Dương Văn An, P.An Phú, quận 2.",
    properties: {
        formality: "Cho thuê",
        acreage: 2300,
        address: "123 Lac long quan",
        mattien: "10",
        road_wide: "5",
        parking: "Có",
        distance: "50",
        direction: "Đông",
        direction_balcony: "Đông Bắc",
        number_of_floors: 10,
        beds: 15,
        baths: 20,
        juridical: "Sổ đỏ",
        furniture: "Có"
    },
    infoSeller: {
        name: "Donal Trump",
        phone: "0999999999",
        email: "donaltrump@gmail.com"
    }
},
{
    title: "Ban nha 123 Lac Long Quan, Tay Ho, Ha Noi, 10 tang, mat tien 5m, dien tich 2300 m2",
    images: [
        'https://znews-photo.zadn.vn/w480/Uploaded/pgi_xvauqbnau/2014_03_11/1.jpg',
        'https://i.pinimg.com/originals/f2/cb/6c/f2cb6c5b4aac518473632d88e3d60b98.jpg',
        'https://noithattinhte.vn/a/ngoi_nha_dep_2_tang_khong_gian_xanh_17814__1_.jpg',
        'https://jobnguoiviet.com/wp-content/uploads/2018/11/nha-cho-thue-jobnguoiviet-3.jpg',
        'https://cdn-images-1.medium.com/max/1600/0*_HCBex_AXfnGhQ-8.jpg'
    ],
    price: 2300000,
    address: '234 Au Co, Tay Ho, Ha Noi, Viet Nam',
    acreage: 1200,
    formality: "Cho thuê",
    region: {
        latitude: 21.0294498,
        longitude: 105.8544441
    },
    description: "Công ty Happy Land chuyên phân phối, mua bán - chuyển nhượng căn hộ Centana Thủ Thiêm quận 2 Hiện nay, chúng tôi đang có nhiều khách hàng muốn mua căn hộ Centana Thủ Thiêm.Khách thiện chí, đã được tư vấn đầy đủ thông tin dự án, đã xem nhà mẫu, chỉ cần có sản phẩm phù hợp sẽ đặt cọc. Những sản phẩm khách đang cần gấp: - Officetel diện tích 44m2, 55m2, 61m2, 74m2. - Căn hộ: Diện tích 64m2, 88m2, 97m2, 2-3 phòng ngủ, tất cả các view, tầng. Hỗ trợ toàn bộ các thủ tục sang tên, công chứng, khai thuế. Chúng tôi có đội ngũ nhân sự tư vấn chuyên nghiệp, có sẵn khách hàng mua, sẵn sàng đầu tư chi phí marketing để thúc đẩy nhanh nhất việc ra hàng cho quý khách. Liên hệ: 0912 598058. 45 Dương Văn An, P.An Phú, quận 2.",
    properties: {
        formality: "Cho thuê",
        acreage: 2300,
        address: "123 Lac long quan",
        mattien: "10",
        road_wide: "5",
        parking: "Có",
        distance: "50",
        direction: "Đông",
        direction_balcony: "Đông Bắc",
        number_of_floors: 10,
        beds: 15,
        baths: 20,
        juridical: "Sổ đỏ",
        furniture: "Có"
    },
    infoSeller: {
        name: "Donal Trump",
        phone: "0999999999",
        email: "donaltrump@gmail.com"
    }
},
{
    title: "Ban nha 123 Lac Long Quan, Tay Ho, Ha Noi, 10 tang, mat tien 5m, dien tich 2300 m2",
    images: [
        'https://noithattinhte.vn/a/ngoi_nha_dep_2_tang_khong_gian_xanh_17814__1_.jpg',
        'https://i.pinimg.com/originals/f2/cb/6c/f2cb6c5b4aac518473632d88e3d60b98.jpg',
        'https://znews-photo.zadn.vn/w480/Uploaded/pgi_xvauqbnau/2014_03_11/1.jpg',
        'https://jobnguoiviet.com/wp-content/uploads/2018/11/nha-cho-thue-jobnguoiviet-3.jpg',
        'https://cdn-images-1.medium.com/max/1600/0*_HCBex_AXfnGhQ-8.jpg'
    ],
    price: 500000,
    address: '345 Vo Chi Cong, Ha Noi, Viet Nam',
    acreage: 2200,
    formality: "Cho thuê",
    region: {
        latitude: 21.0294498,
        longitude: 105.8544441
    },
    description: "Công ty Happy Land chuyên phân phối, mua bán - chuyển nhượng căn hộ Centana Thủ Thiêm quận 2 Hiện nay, chúng tôi đang có nhiều khách hàng muốn mua căn hộ Centana Thủ Thiêm.Khách thiện chí, đã được tư vấn đầy đủ thông tin dự án, đã xem nhà mẫu, chỉ cần có sản phẩm phù hợp sẽ đặt cọc. Những sản phẩm khách đang cần gấp: - Officetel diện tích 44m2, 55m2, 61m2, 74m2. - Căn hộ: Diện tích 64m2, 88m2, 97m2, 2-3 phòng ngủ, tất cả các view, tầng. Hỗ trợ toàn bộ các thủ tục sang tên, công chứng, khai thuế. Chúng tôi có đội ngũ nhân sự tư vấn chuyên nghiệp, có sẵn khách hàng mua, sẵn sàng đầu tư chi phí marketing để thúc đẩy nhanh nhất việc ra hàng cho quý khách. Liên hệ: 0912 598058. 45 Dương Văn An, P.An Phú, quận 2.",
    properties: {
        formality: "Cho thuê",
        acreage: 2300,
        address: "123 Lac long quan",
        mattien: "10",
        road_wide: "5",
        parking: "Có",
        distance: "50",
        direction: "Đông",
        direction_balcony: "Đông Bắc",
        number_of_floors: 10,
        beds: 15,
        baths: 20,
        juridical: "Sổ đỏ",
        furniture: "Có"
    },
    infoSeller: {
        name: "Donal Trump",
        phone: "0999999999",
        email: "donaltrump@gmail.com"
    }
},
{
    title: "Ban nha 123 Lac Long Quan, Tay Ho, Ha Noi, 10 tang, mat tien 5m, dien tich 2300 m2",
    images: [
        'https://jobnguoiviet.com/wp-content/uploads/2018/11/nha-cho-thue-jobnguoiviet-3.jpg',
        'https://i.pinimg.com/originals/f2/cb/6c/f2cb6c5b4aac518473632d88e3d60b98.jpg',
        'https://znews-photo.zadn.vn/w480/Uploaded/pgi_xvauqbnau/2014_03_11/1.jpg',
        'https://noithattinhte.vn/a/ngoi_nha_dep_2_tang_khong_gian_xanh_17814__1_.jpg',
        'https://cdn-images-1.medium.com/max/1600/0*_HCBex_AXfnGhQ-8.jpg'
    ],
    price: 1500000,
    address: '456 Minh Khai, Bac Tu Liem, Ha Noi, Viet Nam',
    acreage: 2300,
    formality: "Cho thuê",
    region: {
        latitude: 21.0294498,
        longitude: 105.8544441
    },
    description: "Công ty Happy Land chuyên phân phối, mua bán - chuyển nhượng căn hộ Centana Thủ Thiêm quận 2 Hiện nay, chúng tôi đang có nhiều khách hàng muốn mua căn hộ Centana Thủ Thiêm.Khách thiện chí, đã được tư vấn đầy đủ thông tin dự án, đã xem nhà mẫu, chỉ cần có sản phẩm phù hợp sẽ đặt cọc. Những sản phẩm khách đang cần gấp: - Officetel diện tích 44m2, 55m2, 61m2, 74m2. - Căn hộ: Diện tích 64m2, 88m2, 97m2, 2-3 phòng ngủ, tất cả các view, tầng. Hỗ trợ toàn bộ các thủ tục sang tên, công chứng, khai thuế. Chúng tôi có đội ngũ nhân sự tư vấn chuyên nghiệp, có sẵn khách hàng mua, sẵn sàng đầu tư chi phí marketing để thúc đẩy nhanh nhất việc ra hàng cho quý khách. Liên hệ: 0912 598058. 45 Dương Văn An, P.An Phú, quận 2.",
    properties: {
        formality: "Cho thuê",
        acreage: 2300,
        address: "123 Lac long quan",
        mattien: "10",
        road_wide: "5",
        parking: "Có",
        distance: "50",
        direction: "Đông",
        direction_balcony: "Đông Bắc",
        number_of_floors: 10,
        beds: 15,
        baths: 20,
        juridical: "Sổ đỏ",
        furniture: "Có"
    },
    infoSeller: {
        name: "Donal Trump",
        phone: "0999999999",
        email: "donaltrump@gmail.com"
    }
},
{
    title: "Ban nha 123 Lac Long Quan, Tay Ho, Ha Noi, 10 tang, mat tien 5m, dien tich 2300 m2",
    images: [
        'https://cdn-images-1.medium.com/max/1600/0*_HCBex_AXfnGhQ-8.jpg',
        'https://i.pinimg.com/originals/f2/cb/6c/f2cb6c5b4aac518473632d88e3d60b98.jpg',
        'https://znews-photo.zadn.vn/w480/Uploaded/pgi_xvauqbnau/2014_03_11/1.jpg',
        'https://noithattinhte.vn/a/ngoi_nha_dep_2_tang_khong_gian_xanh_17814__1_.jpg',
        'https://jobnguoiviet.com/wp-content/uploads/2018/11/nha-cho-thue-jobnguoiviet-3.jpg'
    ],
    price: 1500000,
    address: '123 Lac Long Quan, Tay Ho, Ha Noi, Viet Nam',
    acreage: 2300,
    formality: "Cho thuê",
    region: {
        latitude: 21.0294498,
        longitude: 105.8544441
    },
    description: "Công ty Happy Land chuyên phân phối, mua bán - chuyển nhượng căn hộ Centana Thủ Thiêm quận 2 Hiện nay, chúng tôi đang có nhiều khách hàng muốn mua căn hộ Centana Thủ Thiêm.Khách thiện chí, đã được tư vấn đầy đủ thông tin dự án, đã xem nhà mẫu, chỉ cần có sản phẩm phù hợp sẽ đặt cọc. Những sản phẩm khách đang cần gấp: - Officetel diện tích 44m2, 55m2, 61m2, 74m2. - Căn hộ: Diện tích 64m2, 88m2, 97m2, 2-3 phòng ngủ, tất cả các view, tầng. Hỗ trợ toàn bộ các thủ tục sang tên, công chứng, khai thuế. Chúng tôi có đội ngũ nhân sự tư vấn chuyên nghiệp, có sẵn khách hàng mua, sẵn sàng đầu tư chi phí marketing để thúc đẩy nhanh nhất việc ra hàng cho quý khách. Liên hệ: 0912 598058. 45 Dương Văn An, P.An Phú, quận 2.",
    properties: {
        formality: "Cho thuê",
        acreage: 2300,
        address: "123 Lac long quan",
        mattien: "10",
        road_wide: "5",
        parking: "Có",
        distance: "50",
        direction: "Đông",
        direction_balcony: "Đông Bắc",
        number_of_floors: 10,
        beds: 15,
        baths: 20,
        juridical: "Sổ đỏ",
        furniture: "Có"
    },
    infoSeller: {
        name: "Donal Trump",
        phone: "0999999999",
        email: "donaltrump@gmail.com"
    }
}]

export default class MainScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
        this._renderHeader = this._renderHeader.bind(this);
    }

    componentDidMount() {
        this.setState({
            data: dataFake
        })
    }

    _renderHeader() {
        return (
            <View style={styles.viewNoteGetMore}>
                <Text style={styles.txtNoteMore}>Nhận nhiều đề xuất cá nhân hơn khi bạn yêu thích nhiều ngôi nhà hơn</Text>
            </View>
        )
    }

    render() {
        return (
            <Animatable.View
                animation="fadeIn"
                style={styles.container}>
                <Toolbar />
                <FlatList
                    data={this.state.data}
                    extraData={this.state.data}
                    keyExtractor={(index) => index}
                    ListHeaderComponent={this._renderHeader}
                    renderItem={({ item, index }) => (
                        <ItemProduct dataItem={item} />
                    )}
                />
            </Animatable.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    viewNoteGetMore: {
        backgroundColor: 'rgba(0,128,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 16
    },
    txtNoteMore: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})
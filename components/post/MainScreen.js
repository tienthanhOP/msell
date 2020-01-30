import React, { Component } from 'react'
import {
    Text, StyleSheet, View, FlatList, TextInput, AsyncStorage,
    TouchableOpacity, Alert, ActivityIndicator
} from 'react-native'
import Toolbar from './ToolbarMainScreen'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { getAllProducts } from '../../database/ProductPostedSchema';
import ItemProduct from './ItemProduct';
import Utilities from '../../utils/Utilities';
import * as Constants from '../../constants/Constants';

export default class MainScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            refreshing: false,
            loading: true
        }
    }

    async componentDidMount() {
        try {
            this.props.getProductsPostedAction(0, 100)

            this.setState({
                loading: false
            })
        } catch (error) {

        }
    }

    onRefresh = () => {
        try {
            this.props.getProductsPostedAction(0, 100)
        } catch (error) {
         //   alert(error)
        }
    }

    onDelete(product_id) {
        try {
            Alert.alert("Thông báo", "Bạn chắc chắn muốn gỡ tin đăng này?",
                [
                    {
                        text: 'Huỷ', style: 'cancel'
                    },
                    {
                        text: 'Gỡ tin', onPress: () => {
                            this.props.deleteProductPostedToListAction(product_id)
                            this.props.deleteProductPostedAction(product_id)
                        }
                    },
                ])
        } catch (error) {

        }
    }

    onHidden(product_id, is_hidden) {
        try {
            Alert.alert("Thông báo", "Bạn muốn" + (is_hidden ? " hiển thị " : " ẩn ") + "tin đăng này?",
                [
                    { text: 'Huỷ', style: 'cancel' },
                    {
                        text: (is_hidden ? "Hiển thị tin" : "Ẩn tin"), onPress: () => {
                            if (is_hidden) {
                                this.props.updateProductToListAction({ product_id, status: 1 })
                                this.props.updateProductAction({ product_id, status: 1 })
                            } else {
                                this.props.updateProductToListAction({ product_id, status: 2 })
                                this.props.updateProductAction({ product_id, status: 2 })
                            }
                        }
                    }
                ])
        } catch (error) {

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Toolbar />
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.props.products}
                        extraData={this.props}
                        keyExtractor={(item, index) => item.product_id}
                        ItemSeparatorComponent={() => (<View style={{ height: 1, backgroundColor: 'white' }} />)}
                        renderItem={({ item }) => (
                            <ItemProduct key={item.post_code} dataItem={item}
                                onDelete={(product_id) => this.onDelete(product_id)}
                                onHidden={(product_id, is_hidden) => this.onHidden(product_id, is_hidden)}
                            />
                        )}
                        ListEmptyComponent={() => {
                            return (
                                <View style={{
                                    marginTop: 200,
                                    flex: 1,
                                    backgroundColor: 'white',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <FontAwesome name="list-alt" size={72} color="rgba(0,0,0,0.1)" />
                                    <Text style={{
                                        color: "rgba(0,0,0,0.3)",
                                        fontSize: 15,
                                        marginTop: 10
                                    }}>Bạn chưa đăng tin bất động sản nào</Text>
                                </View>
                            )
                        }}
                        onRefresh={this.onRefresh}
                        refreshing={this.state.refreshing}
                    />
                    <TouchableOpacity
                        onPress={async () => {
                            var isLogged = await AsyncStorage.getItem(Constants.IS_LOGGED)
                            if (!isLogged) {
                                Alert.alert("Đăng nhập",
                                    "Bạn vui lòng đăng nhập để sử dụng tính năng này!",
                                    [
                                        {
                                            text: "Đăng nhập",
                                            onPress: () => {
                                                Actions.loginOptions()
                                            }
                                        },
                                        {
                                            text: "Huỷ",
                                            style: "cancel"
                                        }
                                    ],
                                    {
                                        cancelable: false
                                    }
                                )
                            } else {
                                Actions.addProduct({ isUpdate: false })
                            }
                        }}
                        style={{
                            height: 50,
                            backgroundColor: 'rgba(0,128,0,1)',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Text style={{
                            color: 'white',
                            fontSize: 15,
                            fontWeight: 'bold'
                        }}>ĐĂNG TIN MỚI NGAY</Text>
                    </TouchableOpacity>
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})

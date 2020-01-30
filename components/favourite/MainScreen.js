import React, { Component } from 'react'
import {
    Text, StyleSheet, View, FlatList
} from 'react-native'
import Toolbar from './ToolbarMainScreen'
import ItemProduct from '../map/ItemProduct';
import { getProductFavourites } from '../../database/ProductOfFavouriteSchema'
import Utilities from '../../utils/Utilities';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class MainScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            refreshing: false,
            loadMoreRunning: false
        }
    }

    componentDidMount() {
        this.props.getProductsFavouriteAction(0)
        // getProductFavourites(this.state.data.length).then(res => this.setState({ data: res })).catch()
    }

    onRefresh = () => {
        this.props.getProductsFavouriteAction(0)
    }

    onLoadMore = async () => {
        if (this.state.loadMoreRunning) return;

        await this.setState({
            loadMoreRunning: true
        })
        getProductFavourites(this.state.data.length).then(res => {
            let arr = this.state.data;
            arr = arr.concat(res)
            this.setState({ data: arr, loadMoreRunning: false })
        })
            .catch()
    }

    render() {
        return (
            <View style={styles.container}>
                <Toolbar />
                {
                    <FlatList
                        data={this.props.products}
                        extraData={this.props}
                        keyExtractor={(item) => item.product_id}
                        renderItem={({ item, index }) => (
                            <ItemProduct dataItem={item} />
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
                                    <FontAwesome name="heart-o" size={72} color="rgba(0,0,0,0.1)" />
                                    <Text style={{
                                        color: "rgba(0,0,0,0.3)",
                                        fontSize: 15,
                                        marginTop: 10
                                    }}>Danh sách trống</Text>
                                </View>
                            )
                        }}
                        onRefresh={this.onRefresh}
                        refreshing={this.state.refreshing}
                        onEndReached={this.onLoadMore}
                        onEndReachedThreshold={0.5}
                        initialNumToRender={15}
                    />
                }
            </View>
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
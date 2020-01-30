import React, { Component } from 'react'
import {
    Text, StyleSheet, View, TouchableOpacity, ActivityIndicator, Dimensions
} from 'react-native'
import Swiper from 'react-native-swiper';
import { Actions } from 'react-native-router-flux';
import Utilities from '../../utils/Utilities';
import { createImageProgress } from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';
import * as Constants from '../../constants/Constants';

const { width } = Dimensions.get('window');
const Image = createImageProgress(FastImage);
let _index = 0;
const Slide = props => {
    var uri = props.uri.startsWith("/")
        ? (Constants.IMAGES_URL + props.uri)
        : props.uri

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={styles.slide}
            onPress={() => {
                try {
                    if (props.isList) {
                        if (Actions.currentScene == 'detailProduct') return;
                        Actions.detailProduct({
                            data: props.dataItem,
                            index: _index

                        })
                    } else {
                        props.onHideInfoInImage()
                        props.onSnapFillScreen()
                    }
                } catch (error) {

                }
            }}>
            <Image
                style={styles.image}
                source={{ uri }} />
        </TouchableOpacity>
    )
}



export default class HeaderImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstLoading: true
        }

    }

    render() {


        if (this.props.itemList && this.props.index >= 0) {
            _index = this.props.index
        } else {
            _index = 0;
        }

        var dataItem = this.props.dataItem
        var viewListImage = []
        if (dataItem.images && dataItem.images.length > 0) {
            viewListImage = dataItem.images
            viewListImage = viewListImage.map(e => {
                return e.replace("/200x200/", "/745x510/")
            })

            return (
                <View
                    style={styles.photo} >
                    <Swiper
                        onIndexChanged={(index) => {

                            if (this.props.itemList == true) {
                                _index = index;
                            } else {
                                this.props.changeIndex(index)
                            }
                        }}
                        loadMinimal
                        index={_index}
                        loadMinimalSize={1}
                        loop={false}
                        activeDotColor='white'
                        removeClippedSubviews={false}
                        paginationStyle={{ marginBottom: 150 }}>
                        {
                            viewListImage.map((item, i) =>
                                <Slide
                                    onSnapFillScreen={(index) => this.props.onSnapFillScreen(index)}
                                    dataItem={this.props.dataItem}
                                    isList={this.props.itemList}
                                    onHideInfoInImage={() => this.props.onHideInfoInImage()}
                                    uri={item}
                                    i={i}
                                    key={i}
                                />
                            )
                        }
                    </Swiper>
                </View>
            )
        } else {
            return (
                <View style={styles.photo}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            try {
                                if (this.props.itemList) {
                                    if (Actions.currentScene == 'detailProduct') return;
                                    Actions.detailProduct({
                                        data: this.props.dataItem,
                                        index: _index
                                    })

                                } else {
                                    this.props.onHideInfoInImage()
                                    this.props.onSnapFillScreen()
                                }
                            } catch (error) {

                            }
                        }}
                    >
                        <Image
                            source={require('../../images/no_image.png')}
                            indicator={<ActivityIndicator size={"large"} color="red" />}
                            style={styles.image} />
                    </TouchableOpacity>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    photo: {
        height: 220,
        backgroundColor: 'white'
    },
    slide: {
        height: 220,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    image: {
        width,
        height: 220,
        backgroundColor: 'transparent'
    },
    loadingView: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,.5)'
    }
})

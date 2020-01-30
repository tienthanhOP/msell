import React, { Component } from 'react';
import {
    View, Text, ActivityIndicator, Dimensions,
    TouchableOpacity
} from 'react-native';
import Gallery from 'react-native-image-gallery';
import { createImageProgress } from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';
import Utilities from '../../utils/Utilities';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux';
import * as Constants from '../../constants/Constants';

const { width, height } = Dimensions.get('window');
const Image = createImageProgress(FastImage);

export default class DemoGallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
        };
        this.onChangeImage = this.onChangeImage.bind(this);
    }

    onChangeImage(index) {
        this.setState({ index });
    }

    get galleryCount() {
        const { index } = this.state;
        return (
            <View style={{
                top: 0,
                // height: 56,
                marginTop: Utilities.checkIphoneX() ? 40 : 24,
                // backgroundColor: 'white',
                width: '100%',
                position: 'absolute',
                alignItems: 'center',
                flexDirection: 'row'
            }}>
                <TouchableOpacity
                    style={{
                        // paddingTop: Utilities.checkAndroidOS() ? 0 : 16,
                        paddingHorizontal: 16
                    }}
                    onPress={() => Actions.pop()}>
                    <Ionicons
                        color="white"
                        name={"ios-arrow-back"}
                        size={28}
                    />
                </TouchableOpacity>
                <Text style={{
                    flex: 1,
                    textAlign: 'right',
                    color: 'white',
                    fontSize: 15,
                    fontStyle: 'italic',
                    paddingRight: 16,
                    // paddingTop: Utilities.checkAndroidOS() ? 0 : 16,
                }}>{index + 1} / {this.props.listImages.length}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#333333' }}>
                <Gallery
                    style={{
                        height,
                        flex: 1
                    }}
                    images={this.props.listImages.map(e => {
                        return {
                            uri: e,
                            dimensions: { width: 1300, height: 800 }
                        }
                    })}
                    onPageSelected={this.onChangeImage}
                    initialPage={this.props.index}
                    imageComponent={(image, imageDimensions) => {

                        var uri = image.image.uri.startsWith("/") ?
                            (Constants.IMAGES_URL + image.image.uri) : image.image.uri
                        return (
                            <Image
                                style={{
                                    width,
                                    height
                                }}
                                resizeMode="contain"
                                source={{ uri }} />
                        )
                    }}
                />
                {this.galleryCount}
            </View>
        );
    }
}
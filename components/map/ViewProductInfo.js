import React, { Component } from 'react'
import {
    View, Dimensions, Animated
} from 'react-native'
import Interactable from 'react-native-interactable';
import Detail from '../../containers/map/Detail';
import { styles } from './style/CssMainScreen'
import Utilities from '../../utils/Utilities';

const Screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - (Utilities.checkIphoneX() ? 86 : 55)
};

export default class ViewProductInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            hideInfoInImage: false
        }
        this._deltaY = new Animated.Value(Screen.height - 100);

    }

    componentDidMount() {
        // pass the requested ref here
        this.props.passRefUpward(this);
    }

    showDetail = (isShown, isList) => {
        if (isShown) {
            if (global.itemLocation && !Utilities.checkAndroidOS()) {
                global.itemLocation = null
                this.interactable.snapTo({ index: 3 })
            } else {
                if (isList) {
                    this.interactable.snapTo({ index: 0 })
                } else {
                    this.interactable.snapTo({ index: 1 })
                }
            }
        } else {
            this.interactable.snapTo({ index: 2 })
        }
    }

    _snapToFillScreen = () => {
            this.interactable.snapTo({ index: 0 })
    }

    _snapMinimize = () => {
            this.interactable.snapTo({ index: 1 })
    }

    _hide = () => {
            this.interactable.snapTo({ index: 2 })
    }

    _hideInfoInImage = (isHide) => {
        if (this.state.hideInfoInImage !== isHide)
            this.setState({ hideInfoInImage: isHide })
    }

    render() {
        return <View style={[this.props.style, styles.panelContainer]}
            pointerEvents={'box-none'}>
            <Animated.View
                pointerEvents={'box-none'}
                style={[styles.panelContainer, {
                    backgroundColor: 'black',
                    opacity: this._deltaY.interpolate({
                        inputRange: [0, Screen.height - 200],
                        outputRange: [0, 0],
                        extrapolateRight: 'clamp'
                    })
                }]} />
            <Interactable.View
                ref={ref => this.interactable = ref}
                verticalOnly={true}
                snapPoints={[
                    { y: 0 },
                    { y: Screen.height - (Utilities.checkAndroidOS() ? 242 : 215) },
                    { y: Screen.height + 50 },
                    { y: Screen.height + 100 }
                ]}
                onStop={() => {
                    if (parseInt(JSON.stringify(this._deltaY)) == 0) {
                        // this._hideInfoInImage(true)
                    } else {
                        this._hideInfoInImage(false)
                    }
                    // }
                }}
                onDrag={() => {
                    this._hideInfoInImage(true)
                }}
                // animatedNativeDriver={true}
                initialPosition={{ y: Screen.height + 50 }}
                animatedValueY={(this._deltaY)}>
                {
                    <Detail hideInfoInImage={this.state.hideInfoInImage}
                        onHideInfoInImage={this._hideInfoInImage}
                        onSnapFillScreen={this._snapToFillScreen}
                        onSnapMinimize={this._snapMinimize}
                    />
                }

            </Interactable.View>
        </View>
    }
}
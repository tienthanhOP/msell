import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Utilities from '../../utils/Utilities';


export default class SafeViewCustom extends Component {

    constructor(props) {
        super(props);

        this._height = Utilities.checkAndroidOS() ? 56 : Utilities.checkIphoneX() ? 144 : 60
    }

    render() {

        const { children: renderProp } = this.props;
        return (
            <View style={{ backgroundColor: this.props.backgroundColor, minHeight: this._height, width: '100%', justifyContent: 'flex-end', alignContent: 'center' }}>
                {renderProp()}
            </View >
        );
    }
}


SafeViewCustom.propTypes = {
    children: PropTypes.func.isRequired,
};
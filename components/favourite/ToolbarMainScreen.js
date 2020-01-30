import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Utilities from '../../utils/Utilities';
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

export default class ToolbarMainScreen extends Component {
    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.txtTitle}>Danh sách yêu thích</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: Utilities.checkAndroidOS() ? 0 : getStatusBarHeight(),
        height: 56 + (Utilities.checkAndroidOS() ? 0 : getStatusBarHeight()),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        shadowOpacity: 0.2,
        elevation: 2,
        zIndex: 9999
    },
    txtTitle: {
        fontSize: 20,
        color: 'black',
        fontWeight: '400'
    }
})
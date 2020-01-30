import React, { Component } from 'react'
import {
    Text, StyleSheet, View, TouchableOpacity,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Actions } from 'react-native-router-flux';
import Utilities from '../../utils/Utilities';

export default class Toolbar extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.btn}
                    onPress={() => Actions.pop()}>
                    <Ionicons
                        name="ios-arrow-back"
                        size={28}
                        color="black" />
                </TouchableOpacity>
                <Text style={styles.txtTilte}>{this.props.title}</Text>
                <View style={styles.btn} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: (Utilities.checkAndroidOS() ? 0 : getStatusBarHeight()) + 56,
        paddingTop: Utilities.checkAndroidOS() ? 0 : getStatusBarHeight(),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        shadowOpacity: 0.2,
        elevation: 2,
        flexDirection: 'row',
        zIndex: 999
    },
    btn: {
        width: 40
    },
    txtTilte:
    {
        flex: 1,
        textAlign: 'center',
        fontSize: 20,
        color: 'black',
        fontWeight: '400',
    }
})

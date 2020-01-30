import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import Utilities from '../../utils/Utilities';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export default class ToolbarMainScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => Actions.pop()}
                    style={{ width: 40 }}>
                    <Ionicons name="ios-arrow-back" size={24} color="rgba(0,0,0,0.8)" />
                </TouchableOpacity>
                <Text style={styles.txtTitle}>{this.props.title}</Text>
                <View style={{ width: 40 }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        zIndex: 9999,
        paddingTop: (Utilities.checkAndroidOS() ? 0 : getStatusBarHeight()),
        backgroundColor: 'white',
        height: 56 + (Utilities.checkAndroidOS() ? 0 : getStatusBarHeight()),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        shadowOpacity: 0.2,
        elevation: 2,
        flexDirection: 'row'
    },
    txtTitle: {
        flex: 1,
        fontSize: 20,
        color: 'black',
        fontWeight: '400',
        textAlign: 'center'
    }
})
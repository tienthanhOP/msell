import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import Utilities from '../../utils/Utilities';
import { Actions } from 'react-native-router-flux';
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

export default class ToolbarFilter extends Component {
    render() {
        return (
            <View style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                alignItems: 'center',
                paddingTop: (Utilities.checkAndroidOS() ? 0 : getStatusBarHeight()),
                height: 56 + (Utilities.checkAndroidOS() ? 0 : getStatusBarHeight()),
                shadowOffset: { width: 0, height: 1 },
                shadowRadius: 2,
                shadowOpacity: 0.2,
                elevation: 2,
            }}>
                <TouchableOpacity style={{
                    flex: 1,
                    paddingStart: 24
                }}
                    onPress={() => Actions.pop()}>
                    <Text style={{
                        fontWeight: '500',
                        color: 'black',
                        fontSize: 20
                    }}>✕</Text>
                </TouchableOpacity>

                <Text style={{
                    flex: 1,
                    textAlign: 'center',
                    fontSize: 15,
                    color: 'rgba(0,0,0,0.8)'
                }}>Bộ lọc</Text>
                <TouchableOpacity style={{
                    flex: 1,
                    paddingEnd: 24,
                }} onPress={() => this.props.onReset()}>
                    <Text style={{
                        textAlign: 'right',
                        color: 'rgba(0,0,0,0.8)',
                        fontSize: 15
                    }}>Làm mới</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({})

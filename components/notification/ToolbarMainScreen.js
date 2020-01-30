import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class ToolbarMainScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.txtTitle}>Danh sách nhà mới dành cho bạn</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtTitle: {
    fontSize: 15,
    color: 'black'
  }
})

import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Polygon, Polyline } from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux';

export default class ZoomMapInDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMapTypeDefault: true,
            mapReady: false
        }
    }

    componentDidMount() {
        this.setState({
            minZoomLevel: null
        })
    }

    render() {
        var coordinates = this.props.coordinates
            ? this.props.coordinates
            : {
                latitude: 21.0294498,
                longitude: 105.8544441
            }
        return (
            <View style={{ flex: 1 }}>
                <MapView
                    ref={(ref) => { this.map = ref }}
                    mapType={this.state.isMapTypeDefault ? "standard" : "hybrid"}
                    style={styles.map}
                    // provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        ...coordinates,
                        latitudeDelta: 0.004,
                        longitudeDelta: 0.004
                    }}
                    maxZoomLevel={17}
                    minZoomLevel={this.state.minZoomLevel}
                    onMapReady={() => {
                        this.setState({
                            mapReady: true,
                            minZoomLevel: 3,
                        });
                    }}
                >
                    {
                        this.state.mapReady ?
                            <Marker
                                coordinate={coordinates}
                            />
                            :
                            null
                    }
                </MapView>
                <TouchableOpacity style={styles.btnDirectionsMap} onPress={() => alert("Comming soon!")}>
                    <MaterialIcons name="directions" size={24} color="black" />
                    <Text>Chỉ đường</Text>
                </TouchableOpacity >
                <TouchableOpacity style={styles.btnOptionInMap} onPress={() => this.setState({ isMapTypeDefault: !this.state.isMapTypeDefault })}>
                    <MaterialCommunityIcons name={!this.state.isMapTypeDefault ? "earth" : "map"} size={20} color="black" />
                    <Text style={{ color: 'black', fontSize: 9 }}>{!this.state.isMapTypeDefault ? "Bản đồ" : "Vệ tinh"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnBack} onPress={() => Actions.pop()}>
                    <Ionicons name={"ios-arrow-back"} size={24} color="black" />
                    <Text style={{ color: 'black', fontSize: 14, fontWeight: '500', marginStart: 3 }}>Trở lại</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    btnDirectionsMap: {
        paddingVertical: 3,
        paddingHorizontal: 6,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 20,
        zIndex: 10,
        borderRadius: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 3,
        shadowOpacity: 0.5,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    btnOptionInMap: {
        position: 'absolute',
        bottom: 20,
        left: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 40,
        width: 40,
        borderRadius: 5,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 3,
        shadowOpacity: 0.5,
        elevation: 5
    },
    btnBack: {
        flexDirection: 'row',
        position: 'absolute',
        top: 25,
        left: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 5,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 3,
        shadowOpacity: 0.5,
        elevation: 5
    }
})

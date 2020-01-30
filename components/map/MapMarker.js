import React, { PureComponent } from 'react'
import {
    Text, View, TouchableOpacity
} from 'react-native'
import MapView from 'react-native-maps'
import { styles } from './style/CssMainScreen'
import Utilities from '../../utils/Utilities';
import *as Animatable from 'react-native-animatable';

export default class MapMarker extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            tracksViewChanges: false
        }
    }

    componentDidMount() { }

    componentDidUpdate(prevProps) {
        if (prevProps.coordinate !== this.props.coordinate // set true only when props changed
            || prevProps.price !== this.props.price) {
            this.setState({ tracksViewChanges: true })
        } else if (this.state.tracksViewChanges) {
            // set to false immediately after rendering with tracksViewChanges is true
            this.setState({ tracksViewChanges: false })
        }
    }

    render() {
        let { marker, isMapTypeDefault } = this.props
        var txtPrice = "Liên hệ"
        var txtMinPrice = "Liên hệ"

        var selected = JSON.stringify(global.markerSelected) === JSON.stringify(marker)
        var colorItemSelect = selected ? 'rgba(255,0,0,1)' : 'rgba(72,142,59,1)'

        var type = 0
        if (marker.hasOwnProperty("list")) {
            type == 3
            txtMinPrice = Utilities.formatPrice(marker.min_price) !== "Liên hệ"
                ? Utilities.formatPrice(marker.min_price) + " +" : "Liên hệ"
        } else {
            type = marker.count ? 2 : 1

            if (type == 1) {
                txtPrice = Utilities.formatPrice(marker.properties.price)
            }
        }

        return (
            <MapView.Marker
                tracksViewChanges={this.state.tracksViewChanges}
                coordinate={marker.coordinates}
                onPress={() => {
                    this.props._handleClickMarker(marker)
                }}>
                {
                    type == 1 ?
                        <TouchableOpacity
                            style={[styles.markerPrice, {
                                backgroundColor: colorItemSelect,
                            }]}>
                            <Text style={styles.txtMarkerPrice}>
                                {selected ? " " + txtPrice + " " : txtPrice}
                            </Text>
                        </TouchableOpacity>
                        :
                        (
                            type == 2
                                ?
                                <TouchableOpacity style={[styles.btnMarker,
                                { backgroundColor: isMapTypeDefault ? 'rgba(72,142,59,.5)' : 'rgba(255,255,225,0.5)' }]}>
                                    <View style={styles.viewMarker}>
                                        <Text style={styles.txtMarker}>{marker.count}</Text>
                                    </View>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <View style={[
                                        styles.markerPrice,
                                        {
                                            paddingEnd: 10, backgroundColor: colorItemSelect
                                        }
                                    ]}>
                                        <Text style={styles.txtMarkerPrice}>
                                            {selected ? " " + txtMinPrice + " " : txtMinPrice}
                                        </Text>
                                    </View>
                                    <View style={{
                                        height: 20,
                                        width: 20,
                                        borderRadius: 10,
                                        borderWidth: 2,
                                        borderColor: 'white',
                                        backgroundColor: colorItemSelect,
                                        shadowOffset: { width: 0, height: 0 },
                                        shadowRadius: 3,
                                        shadowOpacity: 0.5,
                                        elevation: 5,
                                        justifyContent: 'center',
                                        marginLeft: -8
                                    }}>
                                        <Text style={{
                                            fontWeight: "bold",
                                            color: 'white',
                                            fontSize: 10,
                                            textAlign: 'center',
                                        }}>{marker.list.length}</Text>
                                    </View>
                                </TouchableOpacity>
                        )
                }
            </MapView.Marker>
        )
    }
}
import {
    StyleSheet, Dimensions, Platform
} from 'react-native'
import Utilities from '../../../utils/Utilities';

const Screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    panelContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999
    },
    map: {
        height: '100%',
        width: Screen.width
    },
    loading: {
        position: 'absolute',
        zIndex: 99,
        top: 150,
        alignSelf: 'center'
    },
    containerToolbar: {
        height: Platform.OS === 'ios' ? 100 : 80,
        width: "100%",
        zIndex: 2
    },
    btnOptionInMap: {
        position: 'absolute',
        bottom: 130,
        left: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 42,
        width: 42,
        borderRadius: 2,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 3,
        shadowOpacity: 0.5,
        elevation: 3
    },
    markerPrice: {
        borderWidth: 1,
        borderColor: 'white',
        height: 22,
        paddingHorizontal: 3,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 44,
        borderRadius: 3,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 3,
        shadowOpacity: 0.5,
        elevation: 5
    },
    txtMarkerPrice: {
        fontWeight: "bold",
        color: 'white',
        fontSize: 8
    },
    btnMarker: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    viewMarker: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,128,0,.5)',
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    txtMarker: {
        position: 'absolute',
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold'
    },
    viewNoteDraw: {
        position: 'absolute',
        backgroundColor: 'rgba(0,128,0,0.5)',
        left: 0,
        right: 0,
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    txtNoteDraw: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold'
    }
})
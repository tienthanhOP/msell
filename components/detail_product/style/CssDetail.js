import { StyleSheet, Dimensions } from 'react-native'
import Utilities from '../../../utils/Utilities';

const Screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 50
}

export const styles = StyleSheet.create({
    panel: {
        height: Screen.height,
        // shadowColor: 'black',
        // shadowOffset: { width: 0, height: 0 },
        // shadowRadius: 6,
        // shadowOpacity: 0.5,
        // elevation: 5
    },
    photo: {
        height: 220,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 3,
        shadowOpacity: 0.5,
        elevation: 5,
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingTop: 50,
    },
    title: {
        textAlign: 'left',
        fontSize: 22,
        fontWeight: '300',
        marginBottom: 20,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 16,
        marginTop: -0.5,
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.2)'
    },
    headerText: {
        flex: 1,
        fontSize: 15,
        fontWeight: '500',
        color: 'black'
    },
    content: {
        margin: 20
    },
    btnExpandMap: {
        padding: 2,
        backgroundColor: 'white',
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 10,
        borderRadius: 2,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 3,
        shadowOpacity: 0.5,
        elevation: 2
    },
    btnDirectionsMap: {
        paddingVertical: 3,
        paddingHorizontal: 8,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 10,
        zIndex: 10,
        borderRadius: 2,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 3,
        shadowOpacity: 0.5,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    btnFastOptions: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtFastOptions: {
        fontSize: 11,
        color: 'rgba(0,0,0,0.5)',
        opacity: 0.8,
        marginTop: 2
    },
    viewFastOptions: {
        flexDirection: 'row',
        paddingVertical: 20
    },
    gradientTopImg: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 50
    },
    gradientBottomImg: {
        position: 'absolute',
        top: 127,
        left: 0,
        right: 0,
        padding: 8,
        paddingTop: 15
    },
    viewMoney: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconViewMoney: {
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 4,
        backgroundColor: 'green',
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtMoney: {
        color: 'white',
        fontSize: 16,
        marginStart: 5,
        fontWeight: 'bold'
    },
    viewAcreage: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    iconViewAcreage: {
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 4,
        backgroundColor: 'green',
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtAcreage: {
        marginStart: 5,
        color: 'white',
        fontSize: 13,
        fontWeight: '600'
    },
    viewAddress: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    iconViewAddress: {
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 4,
        backgroundColor: 'green',
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtCountRoom: {
        textAlign: 'center',
        color: 'white',
        fontSize: 12,
        fontWeight: '400'
    },
    txtAddress: {
        marginEnd: 20,
        marginStart: 5,
        color: 'white',
        fontSize: 12,
        fontWeight: '400'
    },
    containerItem: {
        width: '100%',
        height: 220,
        marginBottom: 0.5
    }
})
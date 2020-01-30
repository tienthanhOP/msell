import {
    StyleSheet, Platform
} from 'react-native'

export const styles = StyleSheet.create({
    container: {

    },
    viewContentContainer: {
        backgroundColor: 'white',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center'
    },
    photo: {
        height: 220,
    },
    gradientTopItem: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 50
    },
    containerItem: {
        width: '100%',
        height: 220,
        marginBottom: 0.5
    },
    gradientBottomItem: {
        position: 'absolute',
        top: 127,
        left: 0,
        right: 0,
        padding: 8,
        paddingTop: 15
    },
    containerPriceItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    viewPriceItem: {
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 4,
        backgroundColor: 'green',
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtPriceItem: {
        color: 'white',
        fontSize: 16,
        marginStart: 5,
        fontWeight: 'bold'
    },
    containerAcreageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    txtAcreageItem: {
        marginStart: 5,
        color: 'white',
        fontSize: 13,
        fontWeight: '600'
    },
    txtAddressItem: {
        marginStart: 5,
        color: 'white',
        fontSize: 12,
        fontWeight: '400'
    }
})

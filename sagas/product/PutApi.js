import * as CONSTANTS from '../../constants/Constants'
import DeviceInfo from 'react-native-device-info';
import Utilities from '../../utils/Utilities';

function* updateProduct(data) {
    try {
        var token = yield Utilities.getUserToken()
        const response = yield fetch(CONSTANTS.BASE_URL + "products",
            {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    'x-request-id': token
                },
                body: JSON.stringify(data)
            }
        )
        var result = yield response.status === 200 ? yield response.json() : null
        return result
    } catch (error) {
        return null
    }
}

function* removeProduct(product_id) {
    try {
        var token = yield Utilities.getUserToken()
        const response = yield fetch(CONSTANTS.BASE_URL + "products/" + product_id,
            {
                method: 'PUT',
                headers: {
                    'x-request-id': token
                }
            }
        )
        var result = yield response.status === 200 ? yield response.json() : null
        return result
    } catch (error) {
        return null
    }
}

export const PutAPI = {
    updateProduct,
    removeProduct
}
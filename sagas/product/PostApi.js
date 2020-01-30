import * as CONSTANTS from '../../constants/Constants'
import Utilities from '../../utils/Utilities';

function* uploadImages(data) {
    try {
        const response = yield fetch(CONSTANTS.BASE_URL + 'upload_images',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        )
        var result = yield response.status === 200 ? yield response.json() : []
        return result
    } catch (error) {
        return []
    }
}

function* addProduct(product) {
    try {
        var token = yield Utilities.getUserToken()
        const response = yield fetch(CONSTANTS.BASE_URL + 'products',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'x-request-id': token
                },
                body: JSON.stringify(product)
            })
        var result = yield response.status === 200 ? yield response.json() : null
        return result
    } catch (error) {
        return null
    }
}

export const PostAPI = {
    uploadImages,
    addProduct
}
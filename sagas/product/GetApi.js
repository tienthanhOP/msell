import * as CONSTANTS from '../../constants/Constants'
import Utilities from '../../utils/Utilities';
import DeviceInfo from 'react-native-device-info';

function* searchProject(text) {
    try {
        const response = yield fetch(CONSTANTS.BASE_URL
            + "search/projects?text=" + text)

        const result = yield response.status === 200 ? yield response.json() : []
        return result
    } catch (error) {
        return []
    }
}

function* getProjectByLocationId(cityId, districtId) {
    try {
        const response = yield fetch(CONSTANTS.BASE_URL
            + "/projects?city_id=" + cityId + "&district_id=" + districtId)

        const result = yield response.status === 200 ? yield response.json() : []
        return result
    } catch (error) {
        return []
    }
}

function* getProductByProductId(productId) {
    try {
        const response = yield fetch(CONSTANTS.BASE_URL
            + "/products/" + productId)

        const result = yield response.status === 200 ? yield response.json() : []
        return result
    } catch (error) {
        return []
    }
}

function* getProductsPost(skip, limit) {
    try {
        var token = yield Utilities.getUserToken()
        var url = CONSTANTS.BASE_URL + "/products/posts/me"
        if (skip && limit) {
            url += "?skip=" + skip + "&limit=" + limit
        }
        const response = yield fetch(
            url,
            {
                method: 'GET',
                headers: {
                    'x-request-id': token
                }
            })

        const result = yield response.json()
        return result
    } catch (error) {
        return []
    }
}

export const GetApi = {
    searchProject,
    getProjectByLocationId,
    getProductByProductId,
    getProductsPost
}
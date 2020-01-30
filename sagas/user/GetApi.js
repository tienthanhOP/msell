import * as CONSTANTS from '../../constants/Constants'
import DeviceInfo from 'react-native-device-info';
import Utilities from '../../utils/Utilities';

function* getInfoUser() {
    try {
        var token = yield Utilities.getUserToken()
        const response = yield fetch(CONSTANTS.URL_USER + "/me",
            {
                method: 'GET',
                headers: {
                    "x-request-id": token
                }
            }
        )
        var result = yield response.status === 200 ? yield response.json() : null
        return result
    } catch (error) {
        return null
    }
}

export const GetAPI = {
    getInfoUser
}
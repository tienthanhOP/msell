import * as CONSTANTS from '../../constants/Constants'
import DeviceInfo from 'react-native-device-info';
import Utilities from '../../utils/Utilities';

function* register(dataRegister) {
    try {
        const response = yield fetch(CONSTANTS.URL_USER,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataRegister)
            }
        )
        var result = yield response.status === 200 ? yield response.json() : null
        return result
    } catch (error) {
        return null
    }
}

function* sendEmailActiveAccount(data) {
    try {
        const response = yield fetch(CONSTANTS.URL_USER + '/send_email',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
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

function* login(data) {
    try {
        var device_name = yield DeviceInfo.getDeviceName()
        var ip_address = yield DeviceInfo.getIPAddress()

        const response = yield fetch(CONSTANTS.URL_USER + '/login',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "x-request-device": device_name,
                    "x-request-ip": ip_address
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

function* logout() {
    try {
        var token = yield Utilities.getUserToken()

        const response = yield fetch(CONSTANTS.URL_USER + '/me/logout',
            {
                method: 'POST',
                headers: {
                    "x-request-id": token
                }
            }
        )
        var result = yield response.json()
        return result
    } catch (error) {
        return null
    }
}

export const PostAPI = {
    register,
    sendEmailActiveAccount,
    login,
    logout
}
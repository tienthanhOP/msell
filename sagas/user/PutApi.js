import * as CONSTANTS from '../../constants/Constants'
import Utilities from '../../utils/Utilities'

function* activeAccount(data) {
    try {
        const response = yield fetch(CONSTANTS.URL_USER + '/active',
            {
                method: 'PUT',
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

function* forgotPassword(data) {
    try {
        const response = yield fetch(CONSTANTS.URL_USER + '/forgot_password',
            {
                method: 'PUT',
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

function* updateUserInfo(data) {
    try {
        var token = yield Utilities.getUserToken()

        const response = yield fetch(CONSTANTS.URL_USER + '/me',
            {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "x-request-id": token
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

export const PutAPI = {
    activeAccount,
    forgotPassword,
    updateUserInfo
}
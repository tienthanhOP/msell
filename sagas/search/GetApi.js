import * as CONSTANTS from '../../constants/Constants'

function* search(text) {
    try {
        const response = yield fetch(CONSTANTS.BASE_URL
            + "search?text=" + text)

        const result = yield response.status === 200 ? yield response.json() : null
        return result
    } catch (error) {
        return null
    }
}

export const GetApi = {
    search
}
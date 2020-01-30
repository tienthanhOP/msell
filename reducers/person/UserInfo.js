import * as ACTION_TYPES from '../../actions/ActionTypes'
import Utilities from '../../utils/Utilities'

const initState = {
    data: null,
    loading: true,
    isLogged: false
}

export default (state = initState, action) => {
    switch (action.type) {
        case ACTION_TYPES.GET_USER_INFO_SUCCESS:
        case ACTION_TYPES.UPDATE_USER_INFO_SUCCESS:
        case ACTION_TYPES.LOGIN_SUCCESS:
            return {
                data: action.user_info,
                isLogged: true,
                loading: false
            }
        case ACTION_TYPES.UPDATE_USER_INFO_FAILURE:
        case ACTION_TYPES.GET_USER_INFO_FAILURE:
            return {
                ...state,
                loading: false
            }
        case ACTION_TYPES.LOGOUT_SUCCESS:
        case ACTION_TYPES.LOGOUT_FAILURE:
        case ACTION_TYPES.LOGIN_FAILURE:
            return initState
        default:
            return state
    }
}
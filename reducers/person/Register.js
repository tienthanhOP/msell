import * as ACTION_TYPES from '../../actions/ActionTypes'
import Utilities from '../../utils/Utilities'

const initState = {
    success: false,
    loading: false
}

export default (state = initState, action) => {
    switch (action.type) {
        case ACTION_TYPES.REGISTER_SUCCESS:
            return {
                success: true,
                loading: false
            }
        case ACTION_TYPES.REGISTER_FAILURE:
            return {
                success: false,
                loading: false
            }
        default:
            return state
    }
}
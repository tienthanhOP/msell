import * as ACTION_TYPES from '../../actions/ActionTypes'
import Utilities from '../../utils/Utilities'
import { Actions } from 'react-native-router-flux';

const initState = {
}

export default (state = initState, action) => {
    switch (action.type) {
        case ACTION_TYPES.SEND_EMAIL_SUCCESS:
            return state
        case ACTION_TYPES.SEND_EMAIL_FAILURE:
            return state
        default:
            return state
    }
}
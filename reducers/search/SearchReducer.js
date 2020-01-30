import * as ACTION_TYPES from '../../actions/ActionTypes'
import Utilities from '../../utils/Utilities'

const initState = {
    address: [],
    projects: [],
    search_success: false
}

export default (state = initState, action) => {
    switch (action.type) {
        case ACTION_TYPES.SEARCH_MAP_SUCCESS:
            return {
                address: action.address,
                projects: action.projects,
                search_success: true
            }
        case ACTION_TYPES.SEARCH_MAP_FAILURE:
            return state;
        case ACTION_TYPES.CLEAR_SEARCH_MAP:
            return initState
        default:
            return state;
    }
}
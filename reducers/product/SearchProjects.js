import * as ACTION_TYPES from '../../actions/ActionTypes'

const initState = {
    data: []
}

export default (state = initState, action) => {
    switch (action.type) {
        case ACTION_TYPES.SEARCH_PROJECTS_SUCCESS:
            return {
                data: action.projects
            }
        case ACTION_TYPES.SEARCH_PROJECTS_FAILURE:
            return state
        case ACTION_TYPES.CLEAN_SEARCH_PROJECTS:
            return initState
        default:
            return state
    }
}
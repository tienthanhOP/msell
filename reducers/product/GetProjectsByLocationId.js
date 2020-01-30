import * as ACTION_TYPES from '../../actions/ActionTypes'
import Utilities from '../../utils/Utilities';

const initState = {
    data: [
        {
            locations: null,
            name: 'Dự án khác',
            project_id: 0,
            address: null,
            city_id: null,
            district_id: null
        }
    ]
}

export default (state = initState, action) => {
    switch (action.type) {
        case ACTION_TYPES.GET_PROJECT_BY_LOCATION_ID_SUCCESS:
            return {
                data: initState.data.concat(action.projects)
            }
        case ACTION_TYPES.GET_PROJECT_BY_LOCATION_ID_FAILURE:
            return initState
        case ACTION_TYPES.CLEAN_GET_PROJECT_BY_LOCATION_ID:
            return initState
        default:
            return state
    }
}
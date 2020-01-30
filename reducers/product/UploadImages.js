import * as ACTION_TYPES from '../../actions/ActionTypes'
import Utilities from '../../utils/Utilities';

const initState = {
    data: []
}

export default (state = initState, action) => {
    switch (action.type) {
        case ACTION_TYPES.UPLOAD_IMAGES_SUCCESS:
            return {
                data: action.images
            }
        case ACTION_TYPES.UPLOAD_IMAGES_FAILURE:
            return state
        default:
            return state
    }
}
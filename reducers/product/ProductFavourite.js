import * as ACTION_TYPES from '../../actions/ActionTypes'
import Utilities from '../../utils/Utilities';

const initState = {
    data: []
}

export default (state = initState, action) => {
    switch (action.type) {
        case ACTION_TYPES.GET_PRODUCTS_FAVOURITE_SUCCESS:
            return {
                data: action.data
            }
        case ACTION_TYPES.GET_PRODUCTS_FAVOURITE_FAILURE:
            return state
        case ACTION_TYPES.ADD_PRODUCT_FAVOURITE:
            var dataTmp = state.data
           var data = [action.product].concat(dataTmp)
            return {
                data
            }
        case ACTION_TYPES.DELETE_PRODUCT_FAVOURITE:
            return {
                data: state.data.filter(e => { return e.product_id !== action.product_id })
            }
        default:
            return state
    }
}
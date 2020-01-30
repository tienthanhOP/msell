import * as ACTION_TYPES from '../../actions/ActionTypes';
import Utilities from '../../utils/Utilities';
import { checkProductLikeToExist } from '../../database/ProductOfFavouriteSchema'

const initState = {
    dataDetail: null,
    isList: false,
    refresh: false
}
export default (state = initState, action) => {
    switch (action.type) {
        case ACTION_TYPES.PUSH_DATA_TO_DETAIL:
            return {
                dataDetail: action.data,
                isList: action.isList
            }
        case ACTION_TYPES.REFRESH_INFO_DETAIL_PRODUCT:
            return {
                ...state,
                refresh: !state.refresh
            }
        default:
            return state;
    }
}
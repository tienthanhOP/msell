import * as ACTION_TYPES from '../../actions/ActionTypes';
import Utilities from '../../utils/Utilities';

const initState = {
    disableViewListProduct: true
}
export default (state = initState, action) => {
    switch (action.type) {
        case ACTION_TYPES.DISABLE_VIEW_LIST_PRODUCT:
            return {
                disableViewListProduct: action.isDisable
            }
        default:
            return state;
    }
}
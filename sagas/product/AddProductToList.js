import * as ACTION_TYPES from '../../actions/ActionTypes'
import { put, takeLatest } from 'redux-saga/effects';
import Utilities from '../../utils/Utilities';
import * as CONSTANTS from '../../constants/Constants';

function* addProductToList(action) {
    try {
        yield put({
            type: ACTION_TYPES.ADD_PRODUCT_POSTED_TO_LIST_SUCCESS,
            product: action.product
        })
    } catch (error) {
        yield put({
            type: ACTION_TYPES.ADD_PRODUCT_POSTED_TO_LIST_FAILURE,
            error: "Có lỗi xảy ra vui lòng thử lại sau"
        })
    }
}

export function* watchAddProductToList() {
    yield takeLatest(ACTION_TYPES.ADD_PRODUCT_POSTED_TO_LIST, addProductToList)
}

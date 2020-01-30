import * as ACTION_TYPES from '../../actions/ActionTypes'
import { put, takeLatest } from 'redux-saga/effects';
import Utilities from '../../utils/Utilities';
import * as CONSTANTS from '../../constants/Constants';

function* deleteProductPostedToList(action) {
    try {
        yield put({
            type: ACTION_TYPES.DELETE_PRODUCT_POSTED_TO_LIST_SUCCESS,
            product_id: action.product_id
        })
    } catch (error) {
        yield put({
            type: ACTION_TYPES.DELETE_PRODUCT_POSTED_TO_LIST_FAILURE,
            error: "Có lỗi xảy ra vui lòng thử lại sau"
        })
    }
}

export function* watchDeleteProductPosted() {
    yield takeLatest(ACTION_TYPES.DELETE_PRODUCT_POSTED_TO_LIST, deleteProductPostedToList)
}
import * as ACTION_TYPES from '../../actions/ActionTypes'
import { put, takeLatest } from 'redux-saga/effects';
import Utilities from '../../utils/Utilities';
import * as CONSTANTS from '../../constants/Constants';
import { PutAPI } from './PutApi';

function* deleteProductPosted(action) {
    try {
        var result = yield PutAPI.removeProduct(action.product_id)
        if (result) {
            yield put({
                type: ACTION_TYPES.DELETE_PRODUCT_POSTED_SUCCESS,
                product_id: action.product_id
            })
        }
    } catch (error) {
        yield put({
            type: ACTION_TYPES.DELETE_PRODUCT_POSTED_FAILURE,
            product_id: action.product_id,
            error: "Có lỗi xảy ra vui lòng thử lại sau"
        })
    }
}

export function* watchDeleteProductPosted() {
    yield takeLatest(ACTION_TYPES.DELETE_PRODUCT_POSTED, deleteProductPosted)
}
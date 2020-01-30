import * as ACTION_TYPES from '../../actions/ActionTypes'
import { put, takeLatest } from 'redux-saga/effects'
import { GetApi } from './GetApi';
import Utilities from '../../utils/Utilities';

function* getDetailProductByProductId(action) {
    try {
        const result = yield GetApi.getProductByProductId(action.product_id)

        if (result && result.success != null && result.success) {
            var data = result.data
            data.post_code = action.post_code
            yield put({
                type: ACTION_TYPES.GET_DETAIL_PRODUCT_SUCCESS, product: result.data,
                post_code: action.post_code
            })
        } else {
            yield put({
                type: ACTION_TYPES.GET_DETAIL_PRODUCT_FAILURE,
                error: result.message ? result.message : "Có lỗi xảy ra vui lòng thử lại"
            })
        }
    } catch (error) {
        yield put({
            type: ACTION_TYPES.GET_DETAIL_PRODUCT_FAILURE,
            error: "Có lỗi xảy ra vui lòng thử lại"
        })
    }
}

export function* watchGetDetailProductByProductId() {
    yield takeLatest(ACTION_TYPES.GET_DETAIL_PRODUCT, getDetailProductByProductId)
}
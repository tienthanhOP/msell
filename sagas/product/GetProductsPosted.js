import * as ACTION_TYPES from '../../actions/ActionTypes'
import { put, takeLatest } from 'redux-saga/effects';
import Utilities from '../../utils/Utilities';
import * as CONSTANTS from '../../constants/Constants';
import { GetApi } from './GetApi';

function* getProductsPosted(action) {
    try {
        var result = yield GetApi.getProductsPost(action.skip, action.limit)
        if (result && result.success != null && result.success) {
            result.data.sort(function (a, b) {
                return parseFloat(b.date_created) - parseFloat(a.date_created);
            })

            yield put({
                type: ACTION_TYPES.GET_PRODUCTS_BY_UID_SUCCESS,
                products: result.data
            })
        } else {
            yield put({
                type: ACTION_TYPES.GET_PRODUCTS_BY_UID_FAILURE,
                error: result.message ? result.message : "Có lỗi xảy ra vui lòng thử lại"
            })
        }
    } catch (error) {
        yield put({
            type: ACTION_TYPES.GET_PRODUCTS_BY_UID_FAILURE,
            error: "Có lỗi xảy ra vui lòng thử lại sau"
        })
    }
}

export function* watchGetProductPosted() {
    yield takeLatest(ACTION_TYPES.GET_PRODUCTS_BY_UID, getProductsPosted)
}

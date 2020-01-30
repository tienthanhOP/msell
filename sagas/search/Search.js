import * as ACTION_TYPE from '../../actions/ActionTypes'
import { put, takeLatest } from 'redux-saga/effects'
import { GetApi } from './GetApi'
import Utilities from '../../utils/Utilities';

function* search(action) {
    try {
        const result = yield GetApi.search(action.text)

        if (result && result.success != null && result.success) {
            yield put({
                type: ACTION_TYPE.SEARCH_MAP_SUCCESS,
                address: result.data.address,
                projects: result.data.projects
            })
        } else {
            Utilities.showToast("Có lỗi xảy ra vui lòng thử lại", null, null)
            yield put({
                type: ACTION_TYPE.SEARCH_MAP_FAILURE,
                error: result.message ? result.message : "Có lỗi xảy ra vui lòng thử lại"
            })
        }
    } catch (error) {
        Utilities.showToast("Có lỗi xảy ra vui lòng thử lại", null, null)
        yield put({
            type: ACTION_TYPE.SEARCH_MAP_FAILURE,
            error: "Có lỗi xảy ra vui lòng thử lại."
        })
    }
}

export function* watchSearch() {
    yield takeLatest(ACTION_TYPE.SEARCH_MAP, search)
}
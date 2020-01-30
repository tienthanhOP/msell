import * as ACTION_TYPES from '../../actions/ActionTypes'
import { put, takeLatest } from 'redux-saga/effects';
import { GetApi } from './GetApi';
import Utilities from '../../utils/Utilities';

function* searchProject(action) {
    try {
        const result = yield GetApi.searchProject(action.text)

        if (result && result.success != null && result.success) {
            yield put({
                type: ACTION_TYPES.SEARCH_PROJECTS_SUCCESS,
                projects: result.data
            })
        } else {
            Utilities.showToast("Có lỗi xảy ra vui lòng thử lại")
            yield put({
                type: ACTION_TYPES.SEARCH_PROJECTS_FAILURE,
                error: result.message ? result.message : "Có lỗi xảy ra vui lòng thử lại"
            })
        }
    } catch (error) {
        Utilities.showToast("Có lỗi xảy ra vui lòng thử lại")
        yield put({
            type: ACTION_TYPES.SEARCH_PROJECTS_FAILURE,
            error: "Có lỗi xảy ra vui lòng thử lại"
        })
    }
}

export function* watchSearchProject() {
    yield takeLatest(ACTION_TYPES.SEARCH_PROJECTS, searchProject)
}
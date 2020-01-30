import * as ACTION_TYPES from '../../actions/ActionTypes'
import { put, takeLatest } from 'redux-saga/effects'
import { GetApi } from './GetApi';
import Utilities from '../../utils/Utilities';

function* getProjectsByLocationId(action) {
    try {
        const result = yield GetApi.getProjectByLocationId(action.cityId, action.districtId)

        if (result && result.success != null && result.success) {
            yield put({
                type: ACTION_TYPES.GET_PROJECT_BY_LOCATION_ID_SUCCESS, projects: result.data
            })
        } else {
            yield put({
                type: ACTION_TYPES.GET_PROJECT_BY_LOCATION_ID_FAILURE,
                error: result.message ? result.message : "Có lỗi xảy ra vui lòng thử lại"
            })
        }
    } catch (error) {
        yield put({
            type: ACTION_TYPES.GET_PROJECT_BY_LOCATION_ID_FAILURE,
            error: "Có lỗi xảy ra vui lòng thử lại"
        })
    }
}

export function* watchGetsProjectByLocation() {
    yield takeLatest(ACTION_TYPES.GET_PROJECT_BY_LOCATION_ID, getProjectsByLocationId)
}
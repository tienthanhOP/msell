import * as ACTION_TYPE from '../../actions/ActionTypes'
import { put, takeLatest } from 'redux-saga/effects'
import { GetAPI } from './GetApi'
import Utilities from '../../utils/Utilities';

function* getUserInfo(action) {
    try {
        var result = yield GetAPI.getInfoUser()
    
        if (result && result.success != null && result.success) {
            yield put({
                type: ACTION_TYPE.GET_USER_INFO_SUCCESS,
                user_info: result.data
            })
        } else {
            Utilities.showToast(result.message ? result.message : "Có lỗi xảy ra vui lòng thử lại")
            yield put({
                type: ACTION_TYPE.GET_USER_INFO_FAILURE,
                error: result.message ? result.message : "Có lỗi xảy ra vui lòng thử lại"
            })
        }

    } catch (error) {
        Utilities.showToast("Có lỗi xảy ra vui lòng thử lại")
        yield put({
            type: ACTION_TYPE.GET_USER_INFO_FAILURE,
            error: "Có lỗi xảy ra vui lòng thử lại"
        })
    }
}


export function* watchGetUserInfo() {
    yield takeLatest(ACTION_TYPE.GET_USER_INFO, getUserInfo)
}
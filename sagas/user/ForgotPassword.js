import * as ACTION_TYPE from '../../actions/ActionTypes'
import { put, takeLatest } from 'redux-saga/effects'
import { PutAPI } from './PutApi'
import Utilities from '../../utils/Utilities';
import { Actions } from 'react-native-router-flux';

function* forgotPasswordAccount(action) {
    try {
        const result = yield PutAPI.forgotPassword(action.data)
        if (result && result.success != null && result.success) {
            Utilities.showToast("Đặt lại mật khẩu thành công")
            yield put({
                type: ACTION_TYPE.FORGOT_PASSWORD_SUCCESS
            })
            Actions.popTo('loginOptions')
        } else {
            Utilities.showToast(result.message ? result.message : "Có lỗi xảy ra vui lòng thử lại")
            yield put({
                type: ACTION_TYPE.FORGOT_PASSWORD_FAILURE,
                error: result.message ? result.message : "Có lỗi xảy ra vui lòng thử lại"
            })
        }
    } catch (error) {
        Utilities.showToast("Có lỗi xảy ra vui lòng thử lại")
        yield put({
            type: ACTION_TYPE.FORGOT_PASSWORD_FAILURE,
            error: "Có lỗi xảy ra vui lòng thử lại"
        })
    }
}

export function* watchForgotPassword() {
    yield takeLatest(ACTION_TYPE.FORGOT_PASSWORD, forgotPasswordAccount)
}
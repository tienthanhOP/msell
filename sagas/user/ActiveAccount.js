import * as ACTION_TYPE from '../../actions/ActionTypes'
import { put, takeLatest } from 'redux-saga/effects'
import { PutAPI } from './PutApi'
import Utilities from '../../utils/Utilities';
import { Actions } from 'react-native-router-flux';

function* activeAccount(action) {
    try {
        const result = yield PutAPI.activeAccount({
            email: action.email,
            code: action.code

        })
        if (result && result.success != null && result.success) {
            Utilities.showToast(result.message ? result.message : "Kích hoạt tài khoản thành công")
            Actions.pop()
            Actions.pop()
            yield put({
                type: ACTION_TYPE.ACTIVE_ACCOUNT_SUCCESS
            })
        } else {
            Utilities.showToast(result.message ? result.message : "Có lỗi xảy ra vui lòng thử lại")
            yield put({
                type: ACTION_TYPE.ACTIVE_ACCOUNT_FAILURE,
                error: result.message ? result.message : "Có lỗi xảy ra vui lòng thử lại"
            })
        }
    } catch (error) {
        Utilities.showToast("Có lỗi xảy ra vui lòng thử lại")
        yield put({
            type: ACTION_TYPE.ACTIVE_ACCOUNT_FAILURE,
            error: "Có lỗi xảy ra vui lòng thử lại"
        })
    }
}

export function* watchActiveAccount() {
    yield takeLatest(ACTION_TYPE.ACTIVE_ACCOUNT, activeAccount)
}
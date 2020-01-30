import * as ACTION_TYPE from '../../actions/ActionTypes'
import { put, takeLatest } from 'redux-saga/effects'
import { PostAPI } from './PostApi'
import Utilities from '../../utils/Utilities';
import { Actions } from 'react-native-router-flux';

function* register(action) {
    try {
        const result = yield PostAPI.register(action.dataRegister)

        if (result && result.success != null && result.success) {
            Utilities.showToast(result.message ? result.message : "Đăng ký thành công, vui lòng kích hoạt tài khoản")
            yield put({
                type: ACTION_TYPE.REGISTER_SUCCESS
            })
            Actions.activeAccount({ email: action.dataRegister.email })
        } else {
            Utilities.showToast(result.message ? result.message : "Có lỗi xảy ra vui lòng thử lại")
            yield put({
                type: ACTION_TYPE.REGISTER_FAILURE,
                error: result.message ? result.message : "Có lỗi xảy ra vui lòng thử lại"
            })
        }
    } catch (error) {
        Utilities.showToast("Có lỗi xảy ra vui lòng thử lại")
        yield put({
            type: ACTION_TYPE.REGISTER_FAILURE,
            error: "Có lỗi xảy ra vui lòng thử lại"
        })
    }
}

export function* watchRegister() {
    yield takeLatest(ACTION_TYPE.REGISTER, register)
}
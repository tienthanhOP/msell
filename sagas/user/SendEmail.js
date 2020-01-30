import * as ACTION_TYPE from '../../actions/ActionTypes'
import { put, takeLatest } from 'redux-saga/effects'
import { PostAPI } from './PostApi'
import Utilities from '../../utils/Utilities';
import * as Constants from '../../constants/Constants';
import { Actions } from 'react-native-router-flux';

function* sendEmail(action) {
    try {
        const result = yield PostAPI.sendEmailActiveAccount({
            email: action.email,
            type: action.types
        })

        if (result && result.success != null && result.success) {
            switch (action.types) {
                case Constants.SEND_EMAIL_ACTIVE_ACCOUNT:
                    Utilities.showToast("Mã kích hoạt đã được gửi vào email của bạn")
                    break;
                case Constants.SEND_EMAIL_FORGOT_PASSWORD:
                    Actions.forgotPassword({ email: action.email })
                    Utilities.showToast("Mã xác thực thay đổi mật khẩu đã được gửi vào email của bạn")
                    break;
                default:
                    break;
            }
            yield put({
                type: ACTION_TYPE.SEND_EMAIL_SUCCESS
            })
        } else {
            Utilities.showToast(result.message ? result.message : "Có lỗi xảy ra vui lòng thử lại")
            yield put({
                type: ACTION_TYPE.SEND_EMAIL_FAILURE,
                error: result.message ? result.message : "Có lỗi xảy ra vui lòng thử lại"
            })
        }
    } catch (error) {
        Utilities.showToast("Có lỗi xảy ra vui lòng thử lại")
        yield put({
            type: ACTION_TYPE.SEND_EMAIL_FAILURE,
            error: "Có lỗi xảy ra vui lòng thử lại"
        })
    }
}

export function* watchSendEmail() {
    yield takeLatest(ACTION_TYPE.SEND_EMAIL, sendEmail)
}
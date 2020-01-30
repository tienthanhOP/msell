import * as ACTION_TYPE from '../../actions/ActionTypes'
import { put, takeLatest } from 'redux-saga/effects'
import { PostAPI } from './PostApi'
import Utilities from '../../utils/Utilities';
import { AsyncStorage } from 'react-native';
import * as Constants from '../../constants/Constants';
import { Actions } from 'react-native-router-flux';

function* login(action) {
    try {
        const result = yield PostAPI.login({
            username: action.username,
            password: action.password
        })

        if (result && result.success != null && result.success) {
            Utilities.showToast(result.message ? result.message : "Đăng nhập thành công")
            var data = result.data
            yield AsyncStorage.multiSet([
                [Constants.IS_LOGGED, "true"],
                [Constants.TOKEN, data.token],
                [Constants.USER_NAME, data.user_info.username],
                [Constants.USER_ID, data.user_info.uid],
                [Constants.DISPLAY_NAME, data.user_info.display_name],
                [Constants.USER_EMAIL, data.user_info.email],
                [Constants.USER_PHONE, data.user_info.phone],
                [Constants.USER_AVATAR, data.user_info.avatar ? data.user_info.avatar : ""],
                [Constants.USER_COVER, data.user_info.cover ? data.user_info.cover : ""]
            ])
            yield put({
                type: ACTION_TYPE.LOGIN_SUCCESS,
                user_info: data.user_info
            })
            Actions.pop()
        } else {
            Utilities.showToast(result.message ? result.message : "Có lỗi xảy ra vui lòng thử lại")
            if (result.error_code == 6604 && result.data && result.data.email) {
                yield PostAPI.sendEmailActiveAccount({
                    email: result.data.email,
                    type: Constants.SEND_EMAIL_ACTIVE_ACCOUNT
                })
                Actions.activeAccount({ email: result.data.email })
            } else {
                yield put({
                    type: ACTION_TYPE.LOGIN_FAILURE,
                    error: result.message ? result.message : "Có lỗi xảy ra vui lòng thử lại"
                })
            }
        }
    } catch (error) {
     //   alert(error)
        // Utilities.showToast("Có lỗi xảy ra vui lòng thử lại")
        yield put({
            type: ACTION_TYPE.LOGIN_FAILURE,
            error: "Có lỗi xảy ra vui lòng thử lại"
        })
    }
}

export function* watchLogin() {
    yield takeLatest(ACTION_TYPE.LOGIN, login)
}
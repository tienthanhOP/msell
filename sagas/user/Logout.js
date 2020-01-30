import * as ACTION_TYPE from '../../actions/ActionTypes'
import { put, takeLatest } from 'redux-saga/effects'
import { PostAPI } from './PostApi'
import Utilities from '../../utils/Utilities';
import { AsyncStorage } from 'react-native';
import * as Constants from '../../constants/Constants';

function* logout(action) {
    try {
        var result = yield PostAPI.logout()

        yield AsyncStorage.multiRemove([
            Constants.IS_LOGGED,
            Constants.TOKEN,
            Constants.USER_NAME,
            Constants.USER_ID,
            Constants.DISPLAY_NAME,
            Constants.USER_EMAIL,
            Constants.USER_PHONE,
            Constants.USER_AVATAR,
            Constants.USER_COVER
        ])

        Utilities.showToast("Đăng xuất thành công")

        yield put({
            type: ACTION_TYPE.LOGOUT_SUCCESS
        })
    } catch (error) {
        Utilities.showToast("Có lỗi xảy ra vui lòng thử lại")
        yield put({
            type: ACTION_TYPE.LOGOUT_FAILURE,
            error: "Có lỗi xảy ra vui lòng thử lại"
        })
    }
}

export function* watchLogout() {
    yield takeLatest(ACTION_TYPE.LOGOUT, logout)
}
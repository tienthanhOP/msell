import * as ACTION_TYPE from '../../actions/ActionTypes'
import { put, takeLatest } from 'redux-saga/effects'
import { PutAPI } from './PutApi'
import Utilities from '../../utils/Utilities';
import { PostAPI } from '../product/PostApi';
import * as Constants from '../../constants/Constants';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

function* updateUserInfo(action) {
    try {
        var dataUpdate = action.dataUpdate

        var data = {}
        if (action.isUpdatePassword) {
            data = action.dataUpdate
        } else {
            var avatar = dataUpdate.avatar && dataUpdate.avatar.includes('base64') ? dataUpdate.avatar : null
            var cover = dataUpdate.cover && dataUpdate.cover.includes('base64') ? dataUpdate.cover : null

            var uriAvatar = null
            if (avatar) {
                var resultUploadAvatar = yield PostAPI.uploadImages({
                    type: Constants.TYPE_UPLOAD_AVATAR,
                    image: avatar
                })

                uriAvatar = resultUploadAvatar.success ? resultUploadAvatar.data : null
            }

            var uriCover = null
            if (cover) {
                var resultUploadCover = yield PostAPI.uploadImages({
                    type: Constants.TYPE_UPLOAD_COVER,
                    image: cover
                })

                uriCover = resultUploadCover.success ? resultUploadCover.data : null
            }

            data = {
                ...dataUpdate,
                avatar: uriAvatar,
                cover: uriCover
            }


            Object.keys(data).map((e, i) => {
                if (!data[e]) {
                    delete data[e]
                }
            })
        }

        const result = yield PutAPI.updateUserInfo(data)

        if (result && result.success != null && result.success) {
            Utilities.showToast("Cập nhật thành công")
            yield put({
                type: ACTION_TYPE.UPDATE_USER_INFO_SUCCESS,
                user_info: result.data
            })
            if (action.isUpdatePassword) {
                Actions.pop()
            } else {
                var dataUser = result.data

                yield AsyncStorage.multiSet([
                    [Constants.DISPLAY_NAME, dataUser.display_name],
                    [Constants.USER_EMAIL, dataUser.email],
                    [Constants.USER_PHONE, dataUser.phone],
                    [Constants.USER_AVATAR, dataUser.avatar ? dataUser.avatar : ""],
                    [Constants.USER_COVER, dataUser.cover ? dataUser.cover : ""]
                ])
            }
        } else {
            Utilities.showToast(result.message ? result.message : "Có lỗi xảy ra vui lòng thử lại")
            yield put({
                type: ACTION_TYPE.UPDATE_USER_INFO_FAILURE,
                error: result.message ? result.message : "Có lỗi xảy ra vui lòng thử lại"
            })
        }
    } catch (error) {
        Utilities.showToast("Có lỗi xảy ra vui lòng thử lại")
        yield put({
            type: ACTION_TYPE.UPDATE_USER_INFO_FAILURE,
            error: "Có lỗi xảy ra vui lòng thử lại"
        })
    }
}

export function* watchUpdateUserInfo() {
    yield takeLatest(ACTION_TYPE.UPDATE_USER_INFO, updateUserInfo)
}
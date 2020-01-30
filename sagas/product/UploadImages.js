import * as ACTION_TYPES from '../../actions/ActionTypes'
import { put, takeLatest } from 'redux-saga/effects';
import { PostAPI } from './PostApi';
import Utilities from '../../utils/Utilities';

function* uploadImages(actions) {
    try {
        var result = yield PostAPI.uploadImages(actions.images)
        if (result && result.success != null && result.success) {
            yield put({
                type: ACTION_TYPES.UPLOAD_IMAGES_SUCCESS,
                projects: result.data
            })
        } else {
            Utilities.showToast("Có lỗi xảy ra vui lòng thử lại")
            yield put({
                type: ACTION_TYPES.UPLOAD_IMAGES_FAILURE,
                error: result.message ? result.message : "Có lỗi xảy ra vui lòng thử lại"
            })
        }
    } catch (error) {
        Utilities.showToast("Có lỗi xảy ra vui lòng thử lại")
        yield put({
            type: ACTION_TYPES.UPLOAD_IMAGES_FAILURE,
            error: result.message ? result.message : "Có lỗi xảy ra vui lòng thử lại"
        })
    }
}

export function* watchUploadImage() {
    yield takeLatest(ACTION_TYPES.UPLOAD_IMAGES, uploadImages)
}
import * as ACTION_TYPES from '../../actions/ActionTypes'
import { put, takeLatest } from 'redux-saga/effects';
import { PostAPI } from './PostApi';
import Utilities from '../../utils/Utilities';
import * as CONSTANTS from '../../constants/Constants';

function* addProduct(actions) {
    try {
        var resultUploadImages = yield PostAPI.uploadImages({
            type: CONSTANTS.TYPE_UPLOAD_PRODUCT,
            images: actions.product.images
        })

        if (resultUploadImages && resultUploadImages.success != null && resultUploadImages.success) {
            var images = resultUploadImages.data

            var product = actions.product
            product.images = images.map(e => { return e.uri })

            var result = yield PostAPI.addProduct(product)
            if (result && result.success != null && result.success) {
                var data = {
                    ...result.data,
                    post_code: actions.product.post_code
                }
                yield put({
                    type: ACTION_TYPES.ADD_PRODUCT_SUCCESS,
                    product: data
                })
            } else {
                yield put({
                    type: ACTION_TYPES.ADD_PRODUCT_FAILURE,
                    error: result.message ? result.message : "Có lỗi xảy ra vui lòng thử lại"
                })
            }
        } else {
            yield put({
                type: ACTION_TYPES.ADD_PRODUCT_FAILURE,
                error: resultUploadImages.message ? resultUploadImages.message : "Tải ảnh lên không thành công"
            })
        }
    } catch (error) {
        yield put({
            type: ACTION_TYPES.ADD_PRODUCT_FAILURE,
            error: "Có lỗi xảy ra vui lòng thử lại"
        })
    }
}

export function* watchAddProduct() {
    yield takeLatest(ACTION_TYPES.ADD_PRODUCT, addProduct)
}
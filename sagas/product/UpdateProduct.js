import * as ACTION_TYPES from '../../actions/ActionTypes'
import { put, takeLatest } from 'redux-saga/effects';
import { PutAPI } from './PutApi';
import { PostAPI } from './PostApi';
import Utilities from '../../utils/Utilities';
import * as CONSTANTS from '../../constants/Constants';

function* updateProduct(actions) {
    try {
        var images_upload = actions.product.images ?
            actions.product.images.filter(e => { return Object.keys(e).includes('base64') }) : []

        var product = actions.product

        if (images_upload.length == 0) {
            if (actions.product.images) {
                product.images = product.images.map(e => { return e.uri })
            }

            var result = yield PutAPI.updateProduct({
                product_id: product.product_id,
                data: product
            })

            if (result && result.success != null && result.success) {
                yield put({
                    type: ACTION_TYPES.UPDATE_PRODUCT_SUCCESS,
                    product: actions.product
                })
            } else {
                yield put({
                    type: ACTION_TYPES.UPDATE_PRODUCT_FAILURE,
                    error: result.message ? result.message : "Có lỗi xảy ra vui lòng thử lại",
                    product_id: product.product_id
                })
            }
        } else {
            var resultUploadImages = yield PostAPI.uploadImages({
                type: CONSTANTS.TYPE_UPLOAD_PRODUCT,
                images: images_upload
            })

            if (resultUploadImages && resultUploadImages.success != null && resultUploadImages.success) {
                var imagesUpload = resultUploadImages.data

                var images = actions.product.images.map(e => {
                    var index = imagesUpload.findIndex(e2 => e2.image_id == e.image_id)
                    if (index > -1) {
                        return imagesUpload[index]
                    } else {
                        return e
                    }
                })

                var product = actions.product
                product.images = images.map(e => { return e.uri })

                var result = yield PutAPI.updateProduct({
                    product_id: product.product_id,
                    data: product
                })

                if (result && result.success != null && result.success) {
                    yield put({
                        type: ACTION_TYPES.UPDATE_PRODUCT_SUCCESS,
                        product: product
                    })
                } else {
                    yield put({
                        type: ACTION_TYPES.UPDATE_PRODUCT_FAILURE,
                        error: result.message ? result.message : "Có lỗi xảy ra vui lòng thử lại",
                        product_id: product.product_id
                    })
                }
            } else {
                yield put({
                    type: ACTION_TYPES.UPDATE_PRODUCT_FAILURE,
                    error: resultUploadImages.message ? resultUploadImages.message : "Tải ảnh lên không thành công",
                    product_id: product.product_id
                })
            }
        }
    } catch (error) {
        yield put({
            type: ACTION_TYPES.UPDATE_PRODUCT_FAILURE,
            error: "Có lỗi xảy ra vui lòng thử lại",
            product_id: product.product_id
        })
    }
}

export function* watchUpdateProduct() {
    yield takeLatest(ACTION_TYPES.UPDATE_PRODUCT, updateProduct)
}
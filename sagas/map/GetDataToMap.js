import * as ACTION_TYPE from '../../actions/ActionTypes'
import { put, takeLatest } from 'redux-saga/effects'
import { GetApi } from './GetApi'
import Utilities from '../../utils/Utilities';

function* getProducts(action) {
    try {
        const result = yield GetApi.getProducts(
            action.zoomlevel,
            action.viewport,
            action.category,
            action.citys_id,
            action.districts_id,
            action.wards_id,
            action.streets_id,
            action.project_id,
            action.type_of_post,
            action.min_price,
            action.max_price,
            action.min_beds,
            action.max_beds,
            action.min_floors,
            action.max_floors,
            action.min_acreage,
            action.max_acreage,
            action.min_toilets,
            action.max_toilets,
            action.group,
            action.is_draw,
            action.poly_draw,
            action.limit,
            action.skip
        )

        if (result && result.success != null && result.success) {
            if (result.data && result.data.length == 0) {
                Utilities.showToast("Không tìm thấy bất động sản nào", 'red')
            }
            if (action.group !== null && action.group === false) {
                yield put({
                    type: ACTION_TYPE.GET_LIST_PRODUCT_SUCCESS,
                    data: result.data,
                    page: action.page
                })
            } else {
                yield put({
                    type: ACTION_TYPE.GET_PRODUCTS_IN_MAP_SUCCESS,
                    data: result.data,
                    is_draw: action.is_draw,
                    boundingBox: action.boundingBox,
                    action
                })
            }
        } else {
            Utilities.showToast("Có lỗi xảy ra vui lòng thử lại", null, null)
            yield put({
                type: ACTION_TYPES.GET_PRODUCTS_IN_MAP_FAILURE,
                action
            })
        }

    } catch (error) {
        Utilities.showToast("Có lỗi xảy ra vui lòng thử lại", null, null)
        yield put({
            type: ACTION_TYPES.GET_PRODUCTS_IN_MAP_FAILURE,
            action
        })
    }
}

export function* watchGetProducts() {
    try {
        yield takeLatest(ACTION_TYPE.GET_PRODUCTS_IN_MAP, getProducts)
    } catch (error) {

    }

}
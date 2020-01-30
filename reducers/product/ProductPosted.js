import * as ACTION_TYPES from '../../actions/ActionTypes'
import Utilities from '../../utils/Utilities';

const initState = {
    data: [],
    refresh: true
}

export default (state = initState, action) => {
    switch (action.type) {
        case ACTION_TYPES.GET_PRODUCTS_BY_UID_SUCCESS:
            return {
                data: action.products
            }
        case ACTION_TYPES.GET_PRODUCTS_BY_UID_FAILURE:
            return initState
        case ACTION_TYPES.ADD_PRODUCT_POSTED_TO_LIST_SUCCESS:
            try {
                var data = [{
                    ...action.product,
                    status_post: "Đang tạo sản phẩm..."
                }].concat(state.data)
                return {
                    data,
                    refresh: !state.refresh
                }
            } catch (error) {
                return state
            }
        case ACTION_TYPES.ADD_PRODUCT_SUCCESS:
            try {
                Utilities.showToast("Đăng tin thành công")
                var indexProduct = state.data.findIndex(e => e.post_code === action.product.post_code)
                if (indexProduct > -1) {
                    var data = state.data
                    data[indexProduct] = {
                        ...action.product,
                        status_post: null
                    }
                    return {
                        data,
                        refresh: !state.refresh
                    }
                }
                return state
            } catch (error) {
                return state
            }
        case ACTION_TYPES.ADD_PRODUCT_FAILURE:
            try {
                Utilities.showToast("Có lỗi xảy ra vui lòng thử lại")
                var indexProduct = state.data.findIndex(e => e.post_code === action.product.post_code)
                if (indexProduct > -1) {
                    var data = state.data
                    data.splice(indexProduct, 1)
                    return {
                        data,
                        refresh: !state.refresh
                    }
                }
                return state
            } catch (error) {
                return state
            }
        case ACTION_TYPES.DELETE_PRODUCT_POSTED_TO_LIST_SUCCESS:
            try {
                var indexProduct = state.data.findIndex(e => e.product_id === action.product_id)
                var data = state.data
                data[indexProduct] = {
                    status_post: "Đang xoá sản phẩm..."
                }
                return {
                    data,
                    refresh: !state.refresh
                }
            } catch (error) {
                return state
            }
        case ACTION_TYPES.DELETE_PRODUCT_POSTED_SUCCESS:
            try {
                Utilities.showToast("Gỡ tin thành công")
                var indexProduct = state.data.findIndex(e => e.product_id === action.product_id)
                var data = state.data
                data.splice(indexProduct, 1)
                return {
                    data,
                    refresh: !state.refresh
                }
            } catch (error) {
                return state
            }
        case ACTION_TYPES.DELETE_PRODUCT_POSTED_FAILURE:
            try {
                Utilities.showToast(action.error)
                var indexProduct = state.data.findIndex(e => e.product_id === action.product_id)
                var data = state.data
                delete data[indexProduct].status_post
                return {
                    data,
                    refresh: !state.refresh
                }
            } catch (error) {
                return state
            }
        case ACTION_TYPES.GET_DETAIL_PRODUCT_SUCCESS:
            try {
                var indexProduct = state.data.findIndex(e => e.post_code === action.post_code)
                if (indexProduct > -1) {
                    var data = state.data
                    data[indexProduct] = {
                        ...action.product,
                        post_code: action.post_code
                    }
                    return {
                        data,
                        refresh: !state.refresh
                    }
                }
                return state
            } catch (error) {
                return state
            }
        case ACTION_TYPES.UPDATE_PRODUCT_SUCCESS:
            try {
                Utilities.showToast("Cập nhật thành công")
                var indexProduct = state.data.findIndex(e => e.product_id === action.product.product_id)
                if (indexProduct > -1) {
                    var data = state.data

                    var dataOld = data[indexProduct]
                    var dataEdit = action.product
                    dataEdit.coordinates = dataEdit.location

                    Object.keys(dataEdit).map(e => {
                        if (!dataEdit[e]) {
                            delete dataEdit[e]
                        } else {
                            if (typeof dataEdit[e] === 'object') {
                                Object.keys(dataEdit[e]).map(e2 => {
                                    if (!dataEdit[e][e2]) {
                                        delete dataEdit[e][e2]
                                    }
                                })
                            }
                        }
                    })

                    var dataNew = {
                        ...dataOld,
                        ...dataEdit,
                        properties: {
                            ...dataOld.properties,
                            ...dataEdit.properties
                        },
                        owner_info: {
                            ...dataOld.owner_info,
                            ...dataEdit.owner_info
                        }
                    }

                    data[indexProduct] = dataNew

                    delete data[indexProduct].status_post

                    return {
                        data,
                        refresh: !state.refresh
                    }
                }
                return state
            } catch (error) {
                return state
            }
        case ACTION_TYPES.UPDATE_PRODUCT_FAILURE:
            try {
                Utilities.showToast(action.error)
                var indexProduct = state.data.findIndex(e => e.product_id === action.product_id)
                var data = state.data
                delete data[indexProduct].status_post
                return {
                    data,
                    refresh: !state.refresh
                }
            } catch (error) {
                return state
            }
        case ACTION_TYPES.UPDATE_PRODUCT_POSTED_TO_LIST_SUCCESS:
            try {
                var indexProduct = state.data.findIndex(e => e.product_id === action.product.product_id)
                var data = state.data
                if (indexProduct > -1) {
                    data[indexProduct] = {
                        ...data[indexProduct],
                        status_post: "Đang cập nhật sản phẩm..."
                    }
                    return {
                        data,
                        refresh: !state.refresh
                    }
                }
                return state
            } catch (error) {
                return state
            }
        case ACTION_TYPES.UPDATE_PRODUCT_POSTED_TO_LIST_FAILURE:
        case ACTION_TYPES.ADD_PRODUCT_TO_REALM_FAILURE:
            Utilities.showToast("Có lỗi xảy ra vui lòng thử lại")
            return state
        default:
            return state
    }
}
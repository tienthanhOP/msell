import * as ACTION_TYPES from './ActionTypes'
import Utilities from '../utils/Utilities';

export const searchProjectsAction = (text) => {
    return {
        type: ACTION_TYPES.SEARCH_PROJECTS,
        text
    }
}

export const cleanSearchProjectsAction = () => {
    return {
        type: ACTION_TYPES.CLEAN_SEARCH_PROJECTS
    }
}

export const getProjectsByLocationIdAction = (cityId, districtId) => {
    return {
        type: ACTION_TYPES.GET_PROJECT_BY_LOCATION_ID,
        cityId,
        districtId
    }
}

export const cleanGetProjectsByLocationIdAction = () => {
    return {
        type: ACTION_TYPES.CLEAN_GET_PROJECT_BY_LOCATION_ID
    }
}

export const uploadImage = (images) => {
    return {
        type: ACTION_TYPES.UPLOAD_IMAGES,
        images
    }
}

export const addProductAction = (product) => {
    return {
        type: ACTION_TYPES.ADD_PRODUCT,
        product
    }
}

export const addProductToListAction = (product) => {
    return {
        type: ACTION_TYPES.ADD_PRODUCT_POSTED_TO_LIST,
        product
    }
}

export const deleteProductPostedAction = (product_id) => {
    return {
        type: ACTION_TYPES.DELETE_PRODUCT_POSTED,
        product_id
    }
}

export const deleteProductPostedToListAction = (product_id) => {
    return {
        type: ACTION_TYPES.DELETE_PRODUCT_POSTED_TO_LIST,
        product_id
    }
}

export const getDetailProductAction = (product_id, post_code) => {
    return {
        type: ACTION_TYPES.GET_DETAIL_PRODUCT,
        product_id,
        post_code
    }
}

export const updateProductAction = (product) => {
    return {
        type: ACTION_TYPES.UPDATE_PRODUCT,
        product
    }
}

export const getProductsPostedAction = (skip, limit) => {
    return {
        type: ACTION_TYPES.GET_PRODUCTS_BY_UID,
        skip,
        limit
    }
}

export const updateProductToListAction = (product) => {
    return {
        type: ACTION_TYPES.UPDATE_PRODUCT_POSTED_TO_LIST,
        product
    }
}

export const getProductsFavouriteAction = (skip) => {
    return {
        type: ACTION_TYPES.GET_PRODUCTS_FAVOURITE,
        skip
    }
}

export const addProductsFavouriteAction = (product) => {
    return {
        type: ACTION_TYPES.ADD_PRODUCT_FAVOURITE,
        product
    }
}

export const deleteProductsFavouriteAction = (product_id) => {
    return {
        type: ACTION_TYPES.DELETE_PRODUCT_FAVOURITE,
        product_id
    }
}

export const refreshInfoDetailProductAction = (product_id) => {
    return {
        type: ACTION_TYPES.REFRESH_INFO_DETAIL_PRODUCT,
        product_id
    }
}
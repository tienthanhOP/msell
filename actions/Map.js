import * as ACTION_TYPES from './ActionTypes';

export const showLoadingMap = (params, data) => {
    return {
        type: ACTION_TYPES.SHOW_LOADING_MAP, params,
        data
    }
}

export const pushDataToDetail = (data, isList) => {
    return {
        type: ACTION_TYPES.PUSH_DATA_TO_DETAIL,
        data,
        isList
    }
}

export const getListProduct = (data, page) => {
    return {
        type: ACTION_TYPES.GET_LIST_PRODUCT_SUCCESS,
        data,
        page
    }
}

export const getProducts = (
    zoomlevel,
    viewport,
    category,
    citys_id,
    districts_id,
    wards_id,
    streets_id,
    project_id,
    type_of_post,
    min_price,
    max_price,
    min_beds,
    max_beds,
    min_floors,
    max_floors,
    min_acreage,
    max_acreage,
    min_toilets,
    max_toilets,
    group,
    is_draw,
    poly_draw,
    limit,
    skip,
    boundingBox,
    page) => {
    return {
        type: ACTION_TYPES.GET_PRODUCTS_IN_MAP,
        zoomlevel,// zoomlevel
        viewport,// viewport
        category,// category
        citys_id,// citys_id
        districts_id,// districts_id
        wards_id,// wards_id
        streets_id,// streets_id
        project_id,// project_id
        type_of_post, // type_of_post
        min_price,// min_price
        max_price,// max_price
        min_beds,// min_beds
        max_beds,// max_beds
        min_floors,// min_floors
        max_floors,// max_floors
        min_acreage,// min_acreage
        max_acreage,// max_acreage
        min_toilets,// min_toilets
        max_toilets,// max_toilets
        group,// group
        is_draw,// is_draw
        poly_draw,// poly_draw
        limit,// limit
        skip,// skip
        boundingBox,
        page//page loadmore
    }
}

export const showCountNumber = () => {
    return {
        type: ACTION_TYPES.SHOW_COUNT_NUMBER_FILTER
    }
}

export const resetPolyDrawInMap = () => {
    return {
        type: ACTION_TYPES.RESET_POPY_DRAW_IN_MAP
    }
}

export const eventClickItemSearchLocation = (location, name, level, code) => {
    return {
        type: ACTION_TYPES.EVENT_CLICK_ITEM_SEARCH_LOCATION,
        location,
        name,
        level,
        code
    }
}

export const eventDeleteSearchLocation = (code) => {
    return {
        type: ACTION_TYPES.EVENT_DELETE_SEARCH_LOCATION,
        code
    }
}

export const disableViewListProduct = (isDisable) => {
    return {
        type: ACTION_TYPES.DISABLE_VIEW_LIST_PRODUCT,
        isDisable
    }
}

export const searchMapAction = (text) => {
    return {
        type: ACTION_TYPES.SEARCH_MAP,
        text
    }
}

export const cleanSearchMapAction = () => {
    return {
        type: ACTION_TYPES.CLEAR_SEARCH_MAP
    }
}

export const cleanListProductAction = () => {
    return {
        type: ACTION_TYPES.CLEAN_LIST_PRODUCT
    }
}
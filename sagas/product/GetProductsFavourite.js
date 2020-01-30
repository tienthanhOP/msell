import * as ACTION_TYPES from '../../actions/ActionTypes'
import { put, takeLatest } from 'redux-saga/effects';
import Utilities from '../../utils/Utilities';
import * as CONSTANTS from '../../constants/Constants';
import { getProductFavourites } from '../../database/ProductOfFavouriteSchema'

function* getProductsFavourite(action) {
    try {
        var result = yield getProductFavourites(action.skip)
        yield put({
            type: ACTION_TYPES.GET_PRODUCTS_FAVOURITE_SUCCESS,
            data: result
        })
    } catch (error) {
        yield put({
            type: ACTION_TYPES.GET_PRODUCTS_FAVOURITE_FAILURE
        })
    }
}

export function* watchGetProductFavourite() {
    yield takeLatest(ACTION_TYPES.GET_PRODUCTS_FAVOURITE, getProductsFavourite)
}

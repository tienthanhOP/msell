import * as ACTION_TYPES from '../../actions/ActionTypes';
import Utilities from '../../utils/Utilities';

const initState = {
    loading: false,
    dataMarker: [],
    dataMarkerDraw: [],
    boundingBox: [],
    listProducts: [],
    page: 0,
    end: false
}
export default (state = initState, action) => {
    switch (action.type) {
        case ACTION_TYPES.SHOW_LOADING_MAP:
            return {
                ...state,
                loading: action.params,
            }
        case ACTION_TYPES.GET_PRODUCTS_IN_MAP_SUCCESS:
            try {
                var dataTemp = action.data

                var data = []
                if (dataTemp.length > 0 && dataTemp[0].hasOwnProperty("count")) {
                    data = dataTemp
                } else {
                    dataTemp.forEach((element) => {
                        var indexData = data.findIndex(e =>
                            JSON.stringify(e.coordinates) === JSON.stringify(element.coordinates))
                        if (indexData < 0) {
                            data.push(element)
                        } else {
                            if (data[indexData].hasOwnProperty("list")) {
                                data[indexData].list.push(element)
                            } else {
                                var newData = {
                                    list: [],
                                    coordinates: element.coordinates
                                }

                                newData.list.push(element)
                                newData.list.push(data[indexData])
                                data.push(newData)
                                delete data.splice(indexData, 1)
                            }
                        }
                    });

                    data.forEach((element, index) => {
                        if (element.hasOwnProperty('list')) {
                            var minPrice = -1
                            element.list.forEach(elementInList => {
                                var priceTemp = elementInList.properties && elementInList.properties.price
                                    ? parseInt(elementInList.properties.price) : 0

                                if (priceTemp != 0) {
                                    if (minPrice == -1) {
                                        minPrice = priceTemp
                                    } else {
                                        if (minPrice > priceTemp) {
                                            minPrice = priceTemp
                                        }
                                    }
                                }
                            });
                            data[index].min_price = minPrice != -1 ? minPrice : 0
                        }
                    });
                }

                if (action.is_draw) {
                    return {
                        ...state,
                        loading: false,
                        dataMarkerDraw: data,
                        boundingBox: action.boundingBox
                    }
                } else {
                    return {
                        ...state,
                        loading: false,
                        dataMarker: data,
                        dataMarkerDraw: [],
                        boundingBox: action.boundingBox
                    }
                }
            } catch (error) {
                return {
                    ...state,
                    loading: false
                }
            }

        case ACTION_TYPES.GET_PRODUCTS_IN_MAP_FAILURE:
            return {
                ...state,
                loading: false
            }
        case ACTION_TYPES.RESET_POPY_DRAW_IN_MAP:
            return {
                ...state,
                dataMarkerDraw: [],
            }
        case ACTION_TYPES.GET_LIST_PRODUCT_SUCCESS:
            try {
                var listTemp;
                var pageTemp;
                if (action.page == 0) {
                    listTemp = [];
                    pageTemp = 0
                } else {
                    listTemp = state.listProducts;
                    pageTemp = state.page
                }

                if (action.data.length > 0) {
                    var list = listTemp.concat(action.data);
                    return {
                        ...state,
                        listProducts: list,
                        page: pageTemp + 1,
                        end: false,
                    };
                }

                return {
                    ...state,
                    listProducts: listTemp,
                    page: pageTemp,
                    end: true
                }
            } catch (error) {
                return {
                    state
                }
            }
        case ACTION_TYPES.CLEAN_LIST_PRODUCT:
            return {
                ...state,
                listProducts: state.listProducts.length > 5 ? state.listProducts.slice(0, 5) : state.listProducts
            }
        default:
            return state
    }
}
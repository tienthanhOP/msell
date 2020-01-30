import * as ACTION_TYPES from '../../actions/ActionTypes';
import Utilities from '../../utils/Utilities';

const initState = {
    listSearch: [],
    polyFit: [],
    level: -1
}

export default (state = initState, action) => {
    switch (action.type) {
        case ACTION_TYPES.EVENT_CLICK_ITEM_SEARCH_LOCATION:
            try {
                var listSearch = []
                var polygon = []

                listSearch = state.listSearch

                if (state.level != -1 && state.level !== action.level) {
                    listSearch = []
                }

                if (listSearch.findIndex(e => e.code === action.code) < 0) {
                    var polygonTemp = []
                    var location = action.location

                    if (Array.isArray(location)) {
                        for (let i = 0; i < location.length; i++) {
                            const element = location[i];
                            for (let i2 = 0; i2 < element.length; i2++) {
                                const element2 = element[i2];
                                polygonTemp.push(element2)
                            }
                        }
                    } else {
                        if (location.hasOwnProperty("latitude") && location.hasOwnProperty("longitude")) {
                            polygonTemp.push([location])
                        }
                    }

                    polygon = polygonTemp

                    var strNameLocation = action.name

                    strNameLocation = strNameLocation.replace(/Thành phố /g, "TP. ");
                    strNameLocation = strNameLocation.replace(/Tỉnh /g, "T. ");
                    strNameLocation = strNameLocation.replace(/Huyện /g, "H. ");
                    strNameLocation = strNameLocation.replace(/Thị xã /g, "TX. ");
                    strNameLocation = strNameLocation.replace(/Quận /g, "Q. ");
                    strNameLocation = strNameLocation.replace(/Phường /g, "P. ");

                    listSearch.push({
                        name: strNameLocation,
                        code: action.code,
                        location: polygon,
                        level: action.level
                    })
                }

                var maxLatitude = null
                var maxLongitude = null
                var minLatitude = null
                var minLongitude = null

                listSearch.map(element => {
                    if (element.location && Array.isArray(element.location)) {
                        element.location.map(element2 => {
                            element2.map(element3 => {
                                if (maxLatitude === null) {
                                    maxLatitude = element3.latitude
                                } else if (maxLatitude < element3.latitude) {
                                    maxLatitude = element3.latitude
                                }

                                if (maxLongitude === null) {
                                    maxLongitude = element3.longitude
                                } else if (maxLongitude < element3.longitude) {
                                    maxLongitude = element3.longitude
                                }

                                if (minLatitude === null) {
                                    minLatitude = element3.latitude
                                } else if (minLatitude > element3.latitude) {
                                    minLatitude = element3.latitude
                                }

                                if (minLongitude === null) {
                                    minLongitude = element3.longitude
                                } else if (minLongitude > element3.longitude) {
                                    minLongitude = element3.longitude
                                }
                            });
                        });
                    }
                });

                var polyFit = []
                if (maxLatitude !== null && maxLongitude !== null
                    && minLatitude !== null && minLongitude !== null) {
                    var polyFit = [
                        {
                            latitude: maxLatitude,
                            longitude: maxLongitude
                        },
                        {
                            latitude: minLatitude,
                            longitude: minLongitude
                        }
                    ]
                }

                return {
                    polyFit,
                    listSearch,
                    level: action.level
                }
            } catch (error) {
                return initState
            }
        case ACTION_TYPES.EVENT_DELETE_SEARCH_LOCATION: {
            try {
                var listSearchTemp = state.listSearch
                var index = listSearchTemp.findIndex(e => e.code === action.code)
                if (index > -1) {
                    listSearchTemp.splice(index, 1)
                }


                if (listSearchTemp.length == 0) {
                    return {
                        listSearch: [],
                        polyFit: [],
                        level: -1
                    }
                } else {
                    var maxLatitude = null
                    var maxLongitude = null
                    var minLatitude = null
                    var minLongitude = null

                    listSearchTemp.map(element => {
                        if (element.location && Array.isArray(element.location)) {
                            element.location.map(element2 => {
                                element2.map(element3 => {
                                    if (maxLatitude === null) {
                                        maxLatitude = element3.latitude
                                    } else if (maxLatitude < element3.latitude) {
                                        maxLatitude = element3.latitude
                                    }

                                    if (maxLongitude === null) {
                                        maxLongitude = element3.longitude
                                    } else if (maxLongitude < element3.longitude) {
                                        maxLongitude = element3.longitude
                                    }


                                    if (minLatitude === null) {
                                        minLatitude = element3.latitude
                                    } else if (minLatitude > element3.latitude) {
                                        minLatitude = element3.latitude
                                    }

                                    if (minLongitude === null) {
                                        minLongitude = element3.longitude
                                    } else if (minLongitude > element3.longitude) {
                                        minLongitude = element3.longitude
                                    }
                                });
                            });
                        }
                    });

                    var polyFit = []
                    if (maxLatitude !== null && maxLongitude !== null
                        && minLatitude !== null && minLongitude !== null) {
                        var polyFit = [
                            {
                                latitude: maxLatitude,
                                longitude: maxLongitude
                            },
                            {
                                latitude: minLatitude,
                                longitude: minLongitude
                            }
                        ]
                    }

                    return {
                        ...state,
                        polyFit,
                        listSearch: listSearchTemp
                    }
                }

            } catch (error) {
                return initState
            }
        }
        default:
            return state
    }
}
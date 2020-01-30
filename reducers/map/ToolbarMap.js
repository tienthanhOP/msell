import * as ACTION_TYPES from '../../actions/ActionTypes';
import Utilities from '../../utils/Utilities';

const initState = {
    countNumber: 1
}
export default (state = initState, action) => {
    switch (action.type) {
        case ACTION_TYPES.SHOW_COUNT_NUMBER_FILTER:
            var dataTmp = global.dataFilter

            Object.keys(global.dataFilter).map(e => {
                if (!global.dataFilter[e]) {
                    delete global.dataFilter[e]
                }
            })

            var keysFilterTmp = Object.keys(global.dataFilter)

            keysFilterTmp.forEach(element => {
                if (dataTmp[element] == 0 || dataTmp[element] === "") {
                    delete dataTmp[element]
                }
            });

            var keysFilter = Object.keys(dataTmp)
            var listKeysFilterTemp = []

            try {
                keysFilter.forEach(element => {
                    if (element.indexOf("min_") > -1 || element.indexOf("max_") > -1 || element.indexOf("sub_") > -1) {
                        var varTemp = element.replace(/min_/g, '').replace(/max_/g, '').replace(/sub_/g, '')

                        if (!listKeysFilterTemp.includes(varTemp)) {
                            listKeysFilterTemp.push(varTemp)
                        }
                    } else {
                        if (!listKeysFilterTemp.includes(element)) {
                            listKeysFilterTemp.push(element)
                        }
                    }
                });
            } catch (error) {

            }

            var countNumber = listKeysFilterTemp.length != 0 ? listKeysFilterTemp.length : 1

            return {
                countNumber
            }
        default:
            return state;
    }
}
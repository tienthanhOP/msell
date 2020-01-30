import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MainScreen from '../../components/map/MainScreen'

import {
    showLoadingMap, pushDataToDetail, getListProduct, getProducts, resetPolyDrawInMap,
    disableViewListProduct, cleanListProductAction, eventClickItemSearchLocation
} from '../../actions'
import Utilities from '../../utils/Utilities';

const mapStateToProps = state => {
    return {
        dataMarker: state.mainMap.dataMarker,
        dataMarkerDraw: state.mainMap.dataMarkerDraw,
        listSearch: state.eventClickItemSearch.listSearch,
        polyFitLocationSearch: state.eventClickItemSearch.polyFit,
        mapBoundingBox: state.mainMap.boundingBox,
        listProducts: state.mainMap.listProducts,
        disableViewProduct: state.disableViewList.disableViewListProduct,
        endList: state.mainMap.end,
        pageList: state.mainMap.page,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        showLoadingMap,
        pushDataToDetail,
        getListProduct,
        getProducts,
        resetPolyDrawInMap,
        disableViewListProduct,
        cleanListProductAction,
        eventClickItemSearchLocation
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
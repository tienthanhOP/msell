import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Toolbar from '../../components/map/ToolbarMainScreen'
import {
    eventDeleteSearchLocation
} from '../../actions/index'

const mapStateToProps = state => {
    return {
        countNumber: state.toolbarMainScreen.countNumber,
        listSearch: state.eventClickItemSearch.listSearch,
        dataSearch: state.eventClickItemSearch,
        disableViewProduct: state.disableViewList.disableViewListProduct
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        eventDeleteSearchLocation
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
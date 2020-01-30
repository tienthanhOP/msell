import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MainScreen from '../../components/search/MainScreen'

import {
    eventClickItemSearchLocation, showLoadingMap, eventDeleteSearchLocation,
    searchMapAction, cleanSearchMapAction
} from '../../actions/index'

const mapStateToProps = state => {
    return {
        listSearch: state.eventClickItemSearch.listSearch,
        dataSearch: state.eventClickItemSearch,
        levelSearch: state.eventClickItemSearch.level,
        addressSearch: state.searchReducer.address,
        projectsSearch: state.searchReducer.projects,
        searchSuccess: state.searchReducer.search_success
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        eventClickItemSearchLocation,
        eventDeleteSearchLocation,
        showLoadingMap,
        searchMapAction,
        cleanSearchMapAction
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
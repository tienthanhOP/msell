import { connect } from 'react-redux'
import Filter from '../../components/map/Filter'
import { bindActionCreators } from 'redux'
import { getProducts, showLoadingMap, showCountNumber } from '../../actions';

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getProducts,
        showLoadingMap,
        showCountNumber
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
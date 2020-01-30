import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import DetailScreen from '../../components/detail_product/DetailScreen';
import {
    addProductsFavouriteAction, deleteProductsFavouriteAction, refreshInfoDetailProductAction
} from '../../actions';

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addProductsFavouriteAction,
        deleteProductsFavouriteAction,
        refreshInfoDetailProductAction
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailScreen)
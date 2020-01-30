import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import MainScreen from '../../components/post/MainScreen';
import {
    getDetailProductAction, getProductsPostedAction, deleteProductPostedAction,
    deleteProductPostedToListAction, updateProductAction, updateProductToListAction
} from '../../actions';

const mapStateToProps = state => {
    return {
        products: state.productPosted.data,
        refresh: state.productPosted
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getDetailProductAction,
        getProductsPostedAction,
        deleteProductPostedAction,
        deleteProductPostedToListAction,
        updateProductAction,
        updateProductToListAction
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
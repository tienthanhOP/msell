import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import ContentDetail from '../../components/detail_product/ContentDetail';
import {
    addProductsFavouriteAction, deleteProductsFavouriteAction, refreshInfoDetailProductAction
} from '../../actions';

const mapStateToProps = state => {
    return {
        refresh: state.detailProduct.refresh
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addProductsFavouriteAction,
        deleteProductsFavouriteAction,
        refreshInfoDetailProductAction
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentDetail)
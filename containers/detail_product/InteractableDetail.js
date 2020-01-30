import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import InteractableDetail from '../../components/detail_product/InteractableDetail';
import {
    addProductsFavouriteAction, deleteProductsFavouriteAction
} from '../../actions';

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addProductsFavouriteAction,
        deleteProductsFavouriteAction
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(InteractableDetail)
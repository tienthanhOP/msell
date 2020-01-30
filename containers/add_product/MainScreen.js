import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import MainScreen from '../../components/add_product/MainScreen';
import {
    addProductAction, addProductToListAction, updateProductAction,
    updateProductToListAction
} from '../../actions';

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addProductAction,
        addProductToListAction,
        updateProductAction,
        updateProductToListAction
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
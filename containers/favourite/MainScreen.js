import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import MainScreen from '../../components/favourite/MainScreen';
import {
    getProductsFavouriteAction
} from '../../actions';

const mapStateToProps = state => {
    return {
        products: state.productFavourite.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getProductsFavouriteAction
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
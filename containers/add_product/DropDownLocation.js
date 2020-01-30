import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import DropDownLocation from '../../components/add_product/DropDownLocation';
import { getProjectsByLocationIdAction, cleanGetProjectsByLocationIdAction } from '../../actions';

const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getProjectsByLocationIdAction,
        cleanGetProjectsByLocationIdAction
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDownLocation)
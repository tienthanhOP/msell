import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import InputSearchProjects from '../../components/add_product/InputSearchProjects';
import { getProjectsByLocationIdAction, cleanGetProjectsByLocationIdAction } from '../../actions';

const mapStateToProps = state => {
    return {
        dataProjects: state.getProjectsByLocations.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(InputSearchProjects)
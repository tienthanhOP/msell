import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import SelectImages from '../../components/add_product/SelectImages';
import { uploadImage } from '../../actions';

const mapStateToProps = state => {
    return {
        dataProjects: state.getProjectsByLocations.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        uploadImage
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectImages)
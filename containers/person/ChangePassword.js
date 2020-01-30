import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ChangePassword from '../../components/person/ChangePassword'

import {
    updateUserInfoAction
} from '../../actions/index'

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateUserInfoAction
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
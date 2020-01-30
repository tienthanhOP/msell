import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ForgotPassword from '../../components/person/ForgotPassword'

import {
    forgotPasswordAction, sendEmailAction
} from '../../actions/index'

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        forgotPasswordAction, sendEmailAction
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
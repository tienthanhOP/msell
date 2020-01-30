import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SendEmail from '../../components/person/SendEmail'

import {
    sendEmailAction
} from '../../actions/index'

const mapStateToProps = state => {
    return {
        register: state.register
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        sendEmailAction
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SendEmail)
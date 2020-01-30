import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SignUp from '../../components/person/SignUp'

import {
    registerAction
} from '../../actions/index'

const mapStateToProps = state => {
    return {
        register: state.register
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        registerAction
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
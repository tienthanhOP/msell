import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LoginOptions from '../../components/person/LoginOptions'

import {
    loginAction
} from '../../actions/index'

const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        loginAction
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginOptions)
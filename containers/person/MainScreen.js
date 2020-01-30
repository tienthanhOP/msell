import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MainScreen from '../../components/person/MainScreen'

import {
    loggedAction, logoutAction
} from '../../actions/index'

const mapStateToProps = state => {
    return {
        userInfo: state.userInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        loggedAction,
        logoutAction
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
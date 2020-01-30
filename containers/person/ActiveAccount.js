import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ActiveAccount from '../../components/person/ActiveAccount'

import {
    activeAccountAction, sendEmailAction
} from '../../actions/index'

const mapStateToProps = state => {
    return {
        activeAccount: state.activeAccount
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        activeAccountAction,
        sendEmailAction
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveAccount)
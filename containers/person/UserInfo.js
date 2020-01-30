import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import UserInfo from '../../components/person/UserInfo'

import {
    getUserInfoAction, updateUserInfoAction
} from '../../actions/index'

const mapStateToProps = state => {
    return {
        userInfo: state.userInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getUserInfoAction,
        updateUserInfoAction
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
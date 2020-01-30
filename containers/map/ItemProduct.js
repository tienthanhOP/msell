import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ItemProduct from '../../components/map/ItemProduct'

import { pushDataToDetail } from '../../actions'

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        pushDataToDetail
    }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(ItemProduct)
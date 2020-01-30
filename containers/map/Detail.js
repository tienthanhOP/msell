import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Detail from '../../components/detail_product/ProductClickMarker'


const mapStateToProps = state => {
    return {
        data: state.detailProduct
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
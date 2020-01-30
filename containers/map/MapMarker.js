import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MapMarker from '../../components/map/MapMarker'


const mapStateToProps = state => {
    return {
        data: state.detailProduct
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapMarker)
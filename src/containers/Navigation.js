import { connect } from 'react-redux';
import Navigation from 'src/components/Navigation';


function mapStateToProps(state) {
  return {
    isNewUser: state.user.user.isNew
  };
}

export default connect(mapStateToProps)(Navigation);
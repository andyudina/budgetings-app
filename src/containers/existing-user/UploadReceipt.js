import { connect } from 'react-redux';
import { uploadReceipt } from 'src/actions/receipts';
import UploadReceipt from 'src/components/existing-user/UploadReceipt';


const mapStateToProps = (state, ownProps) => {
  return {
    isUploading: state.receipts.newReceipt.isUploading
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  uploadReceipt: (photoUri) =>
    dispatch(uploadReceipt(photoUri)),
})


export default connect(
  mapStateToProps,
  mapDispatchToProps)(UploadReceipt);
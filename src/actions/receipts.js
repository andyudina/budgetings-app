import fetch from 'cross-fetch'
import { _handleErrors } from 'src/actions/_utils'
import { SERVER_URL } from 'src/app-constants'

export const TRY_UPLOAD_RECEIPT = 'TRY_UPLOAD_RECEIPT'
export const RECEIPT_UPLOADED = 'RECEIPT_UPLOADED'
export const RECEIPT_UPLOAD_FAILED = 'RECEIPT_UPLOAD_FAILED'

const BASE_RECEIPTS_URL = SERVER_URL + 'bills/'

const startUploadingReceipt = () => {
  return {
    type: TRY_UPLOAD_RECEIPT
  }
}

const receiptuploaded = (json) => {
  return {
    type: RECEIPT_UPLOADED,
    image: json.image,
    id: json.id,
  }
}

const uploadReceiptFailed = (errors) => {
  return {
    type: RECEIPT_UPLOAD_FAILED,
    errors: errors,
  }
}

export function uploadReceipt(photoUri) {
  // Upload receipt from temporary photo
  return (dispatch) => {
    dispatch(startUploadingReceipt())
    const data = new FormData();
    data.append('image', {
      uri: photoUri,
      type: 'image/jpeg', // or photo.type
      name: `${Date.now()}.jpg`
    })
    return fetch(BASE_RECEIPTS_URL, {
      method: 'post',
      credentials: 'include',
      body: 'data',
    })
    .then(response => {
      if (response.status >= 400) {
        response
            .json()
            .then(json => {
              console.log(1, json);
              _handleErrors(
                (errors) => dispatch(
                  uploadReceiptFailed(errors)),
                json);
            })
            .catch(err => {
              console.log(2, err);
              _handleErrors(
                (errors) => dispatch(
                  uploadReceiptFailed(errors)),
                err.message);
            })
      } else {
        response
            .json()
            .then(json => {
              dispatch(receiptuploaded(json));
            })
            .catch(err => {
              console.log(3, err);
              _handleErrors(
                (errors) => dispatch(
                  uploadReceiptFailed(errors)),
                err.message);
            })
      }
    })
  }
}

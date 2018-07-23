const defaultNewReceipt = {
  isUploading: false,
  id: null,
  image: null,
  errors: {
    generalError: null,
    imageError: null,
  }
}

const defaultReceipts = {
  newReceipt: defaultNewReceipt
}

const receipts = (state = defaultReceipts, action) => {
  switch (action.type) {
    // Set up navigation flags on particular events
    case 'TRY_UPLOAD_RECEIPT':
      return Object.assign(
        {},
        state,
        {
          newReceipt: Object.assign(
            {},
            state.newReceipt,
            {
              isUploading: true
            })
        })
    case 'RECEIPT_UPLOADED':
      return Object.assign(
        {},
        state,
        {
          newReceipt: Object.assign(
            {},
            state.newReceipt,
            {
              id: action.id,
              image: action.image,
              isUploading: false,
            })
        })
    case 'RECEIPT_UPLOAD_FAILED':
      return Object.assign(
        {},
        state,
        {
          newReceipt: Object.assign(
            {},
            state.newReceipt,
            {
              errors: action.errors,
              isUploading: false,
            })
        })

    default:
      return state
  }
}

export default receipts
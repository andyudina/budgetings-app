export function _processServerError(errors) {
  // Convert serve errors to easily renderable format
  var resultErrors = {};
  for (var error in errors) {
    if (error === 'non_field_errors') {
      resultErrors['generalError'] = errors[error][0];
    } else {
      resultErrors[error + 'Error'] = errors[error][0];
    }
  }
  return resultErrors;
}
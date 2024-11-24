import * as yup from 'yup';
import CONSTANTS from './constants';
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const personalInfoValidationSchema = yup.object({
  first_name: yup
    .string()
    .min(2, CONSTANTS.Validation.FIRST_NAME_INVALID)
    .required(CONSTANTS.Validation.FIRST_NAME_REQUIRED),
  last_name: yup
    .string()
    .min(2, CONSTANTS.Validation.LAST_NAME_INVALID)
    .required(CONSTANTS.Validation.LAST_NAME_REQUIRED),
  email: yup
    .string()
    .email(CONSTANTS.Validation.EMAIL_INVALID)
    .required(CONSTANTS.Validation.EMAIL_REQUIRED),
  mobile_no: yup
    .string()
    .min(2, CONSTANTS.Validation.MOBILE_NO_INVALID)
    .required(CONSTANTS.Validation.MOBILE_NO_REQUIRED),
  zip_code: yup
    .string()
    .min(6, CONSTANTS.Validation.ZIP_CODE_INVALID)
    .max(6, CONSTANTS.Validation.ZIP_CODE_INVALID)
    .required(CONSTANTS.Validation.ZIP_CODE_REQUIRED),
});

export const removeSpecialCharInString = value => {
  return value.replace(/[^a-zA-Z0-9 ]/g, '');
};

import { phoneRegExp } from '@shared';
import * as yup from 'yup';
import { ERROR_MESSAGES } from '@shared/utils/message';

export enum ProfileFormField {
  'FIRST_NAME' = 'firstName',
  'LAST_NAME' = 'lastName',
  'GENDER' = 'gender',
  'PHONE' = 'phone',
  'EMAIL' = 'email',
  'ADDRESS' = 'address',
  'AVATAR' = 'avatarUrl',
}

export type ProfileFormType = {
  [ProfileFormField.FIRST_NAME]: string;
  [ProfileFormField.LAST_NAME]: string;
  [ProfileFormField.GENDER]: number | 0 | 1;
  [ProfileFormField.PHONE]: string;
  [ProfileFormField.EMAIL]: string;
  [ProfileFormField.ADDRESS]: string;
  [ProfileFormField.AVATAR]: string;
};

export const initialProfileFormValue: ProfileFormType = {
  firstName: '',
  lastName: '',
  gender: 1,
  email: '',
  phone: '',
  address: '',
  avatarUrl: '',
};

export const ProfileFormSchema = yup.object().shape({
  [ProfileFormField.FIRST_NAME]: yup.string().nullable().required(ERROR_MESSAGES.FIELD_REQUIRED),
  [ProfileFormField.LAST_NAME]: yup.string().nullable().required(ERROR_MESSAGES.FIELD_REQUIRED),
  [ProfileFormField.GENDER]: yup.number().nullable().required(ERROR_MESSAGES.FIELD_REQUIRED),
  [ProfileFormField.EMAIL]: yup
    .string()
    .nullable()
    .required(ERROR_MESSAGES.FIELD_REQUIRED)
    .email(ERROR_MESSAGES.INVALID_DATA),
  [ProfileFormField.PHONE]: yup
    .string()
    .nullable()
    .matches(phoneRegExp, ERROR_MESSAGES.INVALID_DATA)
    .min(10)
    .max(11),
  [ProfileFormField.ADDRESS]: yup.string().nullable().max(50),
  [ProfileFormField.AVATAR]: yup.string().nullable(),
});

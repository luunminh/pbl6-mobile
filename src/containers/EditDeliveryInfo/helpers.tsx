import { ContactType } from '@queries';
import { phoneRegExp } from '@shared';
import { ERROR_MESSAGES } from '@shared/utils/message';
import * as yup from 'yup';
import { ProfileFormField } from '../Profile/EditProfile/helpers';

export enum DeliveryFormField {
  'FIRST_NAME' = 'firstName',
  'LAST_NAME' = 'lastName',
  'PHONE' = 'phoneNumber',
  'ADDRESS' = 'address',
}

export const initialDeliveryFormValue: ContactType = {
  [DeliveryFormField.FIRST_NAME]: '',
  [DeliveryFormField.LAST_NAME]: '',
  [DeliveryFormField.PHONE]: '',
  [DeliveryFormField.ADDRESS]: '',
};

export const deliverySchema = yup.object().shape({
  [DeliveryFormField.FIRST_NAME]: yup.string().nullable().required(ERROR_MESSAGES.FIELD_REQUIRED),
  [DeliveryFormField.LAST_NAME]: yup.string().nullable().required(ERROR_MESSAGES.FIELD_REQUIRED),
  [DeliveryFormField.PHONE]: yup
    .string()
    .nullable()
    .matches(phoneRegExp, ERROR_MESSAGES.INVALID_DATA)
    .min(10)
    .max(11),
  [ProfileFormField.ADDRESS]: yup.string().nullable().max(100),
});

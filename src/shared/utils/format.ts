import { startCase } from 'lodash';
import dayjs from 'dayjs';
import { isEmpty } from './validation';

export const getFullName = ({ firstName = '', middleName = '', lastName = '' } = {}) =>
  `${firstName}${middleName ? ` ${middleName} ` : ' '}${lastName ? lastName : ''}`;

export const getStartCase = (value: string) => (value ? startCase(value.toLowerCase()) : '');

export const getDate = (dateString: string): string => dayjs(dateString).format('DD/MM/YYYY');

export const formatMoney = (value: number, defaultValue = '') => {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(value)) return defaultValue;

  return value.toLocaleString('vi', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 2,
  });
};

export const formatDate = (
  value: string | number | Date | dayjs.Dayjs,
  format = 'DD/MM/YYYY',
  { initValueFormat = '' } = {},
) => {
  if (!value) return '';
  if (!isEmpty(initValueFormat)) {
    return dayjs(value, initValueFormat).format(format);
  }

  return dayjs(value).format(format);
};

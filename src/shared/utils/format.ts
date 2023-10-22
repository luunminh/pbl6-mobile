import { startCase } from 'lodash';
import dayjs from 'dayjs';

export const getFullName = ({ firstName = '', middleName = '', lastName = '' } = {}) =>
  `${firstName}${middleName ? ` ${middleName} ` : ' '}${lastName ? lastName : ''}`;

export const getStartCase = (value: string) => (value ? startCase(value.toLowerCase()) : '');

export const getDate = (dateString: string): string => dayjs(dateString).format('DD/MM/YYYY');

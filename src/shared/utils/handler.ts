import { v4 as uuidv4 } from 'uuid';
import { get } from 'lodash';
import { YesNoValue } from './types';

export const getRandomId = (): string => uuidv4();

export const isString = (value: any): value is string => typeof value === 'string';

export const isYesValue = (value) => value === YesNoValue.YES;
export const isNoValue = (value) => value === YesNoValue.NO;

export const getErrorMessage = (
  fieldName: string,
  { touched, errors }: { touched: any; errors: any },
) => {
  if (!fieldName || !touched || !errors) return '';

  const error = get(errors, fieldName);

  return get(touched, fieldName) && error ? error : '';
};

export const tableBodyRender = <T>(
  value: T | string,
  defaultValue: T | string = '--',
): T | string => {
  return value ?? defaultValue;
};

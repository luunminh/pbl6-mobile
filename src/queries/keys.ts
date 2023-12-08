import { UseQueryOptions } from '@tanstack/react-query';

export enum ApiKey {
  USERS = '/users',
  PROFILE = 'users/profile',
  _USERS_LIST = '/admin/users',
  ADD_STAFF = '/admin/cashiers',
  AUTH = '/auth',
  CATEGORY = 'category',
  PRODUCT = 'product',
  FILES = '/files',
  STORE = '/store',
  CART = '/cart',
  ORDER = '/order',
  VOUCHER = '/voucher',
}

export type QueryOptions<T> = Omit<UseQueryOptions, 'QueryKey'> & { QueryKey: T };

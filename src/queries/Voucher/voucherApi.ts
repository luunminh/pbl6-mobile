import axios from 'axios';
import apisauce from 'apisauce';
import appConfig from 'src/appConfig';
import { AuthService, stringify } from '@shared';
import { ApiKey } from '@queries/keys';
import { VoucherListParams } from './type';

axios.defaults.withCredentials = true;
const create = (baseURL = `${appConfig.API_URL}`) => {
  //
  // Create and configure an apisauce-based api object.
  //

  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: 0,
      Accept: 'application/json',
    },
    timeout: appConfig.CONNECTION_TIMEOUT,
  });

  api.axiosInstance.interceptors.request.use((config) =>
    AuthService.getTokenFromStorage()
      .then((token) => {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${token}`;
        return Promise.resolve(config);
      })
      .catch(() => Promise.resolve(config)),
  );

  const getVoucherList = (params: VoucherListParams) => {
    const { ...tableParams } = params;
    const queryString = stringify(tableParams);
    return api.get(`${ApiKey.VOUCHER}?${queryString}`);
  };

  const getVoucherDetail = (id: string) => {
    return api.get(`${ApiKey.VOUCHER}/${id}`);
  };

  return {
    getVoucherList,
    getVoucherDetail,
  };
};

export default {
  create,
};

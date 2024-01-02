import { AuthService, TableParams, stringify } from '@shared';
import apisauce from 'apisauce';
import axios from 'axios';
import appConfig from 'src/appConfig';
import { CancelOrderPayload, CreateOrderPayload } from './type';
import { ApiKey } from '@queries/keys';

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

  const getOrders = (params: TableParams) => {
    const { ...tableParams } = params;
    const queryString = stringify(tableParams);
    return api.get(`/order?${queryString}`, {});
  };

  const createOrder = (payload: CreateOrderPayload) => {
    return api.post(`${ApiKey.ORDER}`, payload, {
      headers: {
        Origin: 'https://malt-convenience-store-customer.vercel.app',
      },
    });
  };

  const getOrderDetail = (id: string) => {
    return api.get(`/order/${id}`);
  };

  const cancelOrder = (payload: CancelOrderPayload) => {
    return api.post('/order-request/create-modify-request', payload);
  };

  return {
    getOrders,
    getOrderDetail,
    createOrder,
    cancelOrder,
  };
};

export default {
  create,
};

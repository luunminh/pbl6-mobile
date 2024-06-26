import axios from 'axios';
import apisauce from 'apisauce';
import appConfig from 'src/appConfig';
import { AuthService, stringify } from '@shared';
import { ProductListParams, TopSellsParams } from './type';

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

  const getProductList = (params: ProductListParams) => {
    const { ...tableParams } = params;
    const queryString = stringify(tableParams);
    return api.get(`/product?${queryString}`, {});
  };

  const getProductById = (params: { id: string }) => api.get(`/product/${params.id}`, {});

  const getProductTopSale = (params: TopSellsParams) => {
    const queryString = stringify(params);
    return api.get(`/product/top-sell?${queryString}`);
  };

  return {
    getProductList,
    getProductById,
    getProductTopSale,
  };
};

export default {
  create,
};

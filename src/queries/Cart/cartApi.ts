import axios from 'axios';
import apisauce from 'apisauce';
import appConfig from 'src/appConfig';
import { AuthService, stringify } from '@shared';
import { AddCartPayload, DeleteProductCartPayload } from './types';

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

  const getCartList = (storeId: string) => {
    const queryString = stringify({ storeId: storeId });
    return api.get(`/cart?${queryString}`);
  };

  const addProductToCart = (payload: AddCartPayload) => {
    return api.post('/cart', payload);
  };

  const decreaseProductCart = (payload: AddCartPayload) => {
    return api.patch('/cart', payload);
  };

  const deleteProductCart = (payload: DeleteProductCartPayload) => {
    return api.delete(`/cart/product/${payload.productId}`);
  };

  const deleteCart = () => api.delete('/cart');

  return {
    getCartList,
    addProductToCart,
    decreaseProductCart,
    deleteProductCart,
    deleteCart,
  };
};

export default {
  create,
};

import axios from 'axios';
import apisauce from 'apisauce';
import appConfig from 'src/appConfig';
import { UpdateProfilePayload } from './type';
import { ApiKey } from '@queries/keys';
import { AuthService } from '@shared';
import { ChangePasswordPayload } from '@queries/UAM';

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

  const getProfile = () => {
    return api.get(`${ApiKey.USERS}/profile`, {});
  };

  const updateProfile = (body: UpdateProfilePayload) => {
    return api.patch(`${ApiKey.USERS}/profile`, body, {});
  };

  const requestChangePassword = () => {
    return api.post(`${ApiKey.USERS}/request-change-password`, {});
  };

  const changePassword = (body: ChangePasswordPayload) => {
    return api.post(`${ApiKey.USERS}/change-password`, body, {});
  };

  return {
    getProfile,
    updateProfile,
    changePassword,
    requestChangePassword,
  };
};

export default {
  create,
};

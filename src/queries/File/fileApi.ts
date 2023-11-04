import axios from 'axios';
import apisauce from 'apisauce';
import appConfig from 'src/appConfig';
import { UploadFilePayload } from './types';
import { AuthService } from '@shared';

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

  const uploadAvatar = (payload: UploadFilePayload) => {
    const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
    let formattedPayload = new FormData();
    formattedPayload.append('file', payload.file);
    return api.post(`/files/profiles`, formattedPayload, {
      withCredentials: false,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  return {
    uploadAvatar,
  };
};

export default {
  create,
};

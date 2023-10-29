import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_STORAGE_TOKEN = `customer-auth_token`;

const clearToken = async () => {
  await AsyncStorage.removeItem(AUTH_STORAGE_TOKEN);
};

const setToken = async (value: string) => {
  await AsyncStorage.setItem(AUTH_STORAGE_TOKEN, value);
  return;
};

const getTokenFromStorage = async () => {
  try {
    const rs = await AsyncStorage.getItem(AUTH_STORAGE_TOKEN);
    return rs;
  } catch (error) {
    console.log('get token error:', error);
  }
};

// TODO:minh_luu implement force refreshToken

export default {
  clearToken,
  setToken,
  getTokenFromStorage,
};

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORE_ID_STORAGE = `customer-storeId`;
const STORE_NAME_STORAGE = `customer-storeName`;

const setStoreId = async (value: string) => {
  await AsyncStorage.setItem(STORE_ID_STORAGE, value);
  return;
};

const setStoreName = async (value: string) => {
  await AsyncStorage.setItem(STORE_NAME_STORAGE, value);
  return;
};

const getStoreId = async () => {
  try {
    const result = await AsyncStorage.getItem(STORE_ID_STORAGE);
    return result;
  } catch (error) {
    console.log('error', error);
  }
};

const getStoreName = async () => {
  try {
    const result = await AsyncStorage.getItem(STORE_NAME_STORAGE);
    return result;
  } catch (error) {
    console.log('error', error);
  }
};

export default { setStoreId, setStoreName, getStoreId, getStoreName };

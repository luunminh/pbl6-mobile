import AsyncStorage from '@react-native-async-storage/async-storage';

const FIRST_NAME_STORAGE = `customer-first-name`;
const LAST_NAME_STORAGE = `customer-last-name`;
const ADDRESS_STORAGE = `customer-address`;
const PHONE_STORAGE = `customer-phone`;
const PAYMENT_STORAGE = `payment-menthol`;

const setFirstName = async (value: string) => {
  await AsyncStorage.setItem(FIRST_NAME_STORAGE, value);
  return;
};

const setLastName = async (value: string) => {
  await AsyncStorage.setItem(LAST_NAME_STORAGE, value);
  return;
};

const setAddress = async (value: string) => {
  await AsyncStorage.setItem(ADDRESS_STORAGE, value);
  return;
};

const setPhone = async (value: string) => {
  await AsyncStorage.setItem(PHONE_STORAGE, value);
  return;
};

const setPayment = async (value: string) => {
  await AsyncStorage.setItem(PAYMENT_STORAGE, value);
  return;
};

const getPayment = async () => {
  try {
    const result = await AsyncStorage.getItem(PAYMENT_STORAGE);
    return result;
  } catch (error) {
    console.log('error', error);
  }
};

const getFirstName = async () => {
  try {
    const result = await AsyncStorage.getItem(FIRST_NAME_STORAGE);
    return result;
  } catch (error) {
    console.log('error', error);
  }
};

const getLastName = async () => {
  try {
    const result = await AsyncStorage.getItem(LAST_NAME_STORAGE);
    return result;
  } catch (error) {
    console.log('error', error);
  }
};

const getAddress = async () => {
  try {
    const result = await AsyncStorage.getItem(ADDRESS_STORAGE);
    return result;
  } catch (error) {
    console.log('error', error);
  }
};

const getPhone = async () => {
  try {
    const result = await AsyncStorage.getItem(PHONE_STORAGE);
    return result;
  } catch (error) {
    console.log('error', error);
  }
};

export default {
  getAddress,
  getFirstName,
  getLastName,
  getPhone,
  setAddress,
  setFirstName,
  setLastName,
  setPhone,
  getPayment,
  setPayment,
};

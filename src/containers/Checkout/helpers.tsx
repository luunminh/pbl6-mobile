import { Cart, ProductStoresType } from '@queries';

export const getProductStore = (itemInCart: Cart): ProductStoresType => {
  return {
    productStoreId: itemInCart?.productStore?.id,
    quantity: itemInCart?.quantity,
  };
};

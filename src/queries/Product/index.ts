import productApi from './productApi';
export * from './type';
export * from './useGetProductById';
export * from './useGetAllProductLazy';
export * from './useGetProductTopSale';

// export crud queries

export const ProductApi = productApi.create();

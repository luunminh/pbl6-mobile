import { TableParams } from '@shared';

export interface CategoryResponse {
  id: string;
  name: string;
  description: string;
}

export interface ProductResponse {
  id: string;
  name: string;
  description: string;
  amount: number;
  price: number;
  category: CategoryResponse;
  createdAt: string;
  updatedAt: string;
  image: string;
  productStore?: ProductStore;
}

export type ProductTopSale = Omit<ProductResponse, 'productStore'> & {
  amountOfProductStore: number;
};

export type TopSellsParams = {
  storeId?: string;
};

export interface TopSaleResponse {
  totalQuantitySold: number;
  product: ProductTopSale;
}

export type ProductStore = {
  id: string;
  productId: string;
  storeId: string;
  amount: number;
  expirtyDate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type ProductListParams = TableParams;

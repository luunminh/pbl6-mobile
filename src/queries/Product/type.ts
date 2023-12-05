import { TableParams } from '@shared';

export interface CategoryResponse {
  id: string;
  name: string;
  description: string;
}

export type ProductResponse = {
  id: string;
  name: string;
  description: string;
  amount: number;
  image: string;
  price: number;
  category: CategoryResponse;
  createdAt: string;
  updatedAt: string;
};

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

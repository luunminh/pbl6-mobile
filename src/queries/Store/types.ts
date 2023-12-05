import { TableParams } from "@shared";

export interface StoreResponse {
  id: string;
  address: string;
  hotline: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export type StoreListParams = TableParams;
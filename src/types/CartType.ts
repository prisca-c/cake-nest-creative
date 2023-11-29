import { ProductType } from '@Types/ProductType.ts';

export const initialCartState: CartType = {
  id: crypto.randomUUID(),
  userId: '',
  items: [],
  createdAt: new Date().toISOString(),
};

export type CartItemType = {
  id: string;
  menuId: string;
  product: ProductType;
  quantity: number;
  createdAt: string;
};

export type CartType = {
  id: string;
  userId: string;
  items: CartItemType[];
  createdAt: string;
};

import { ProductType } from '@Types/ProductType.ts';

export type CartItemType = {
  id: string;
  menuId: string;
  quantity: number;
  product: ProductType;
  createdAt: string;
};

export type CartType = {
  id: string;
  user: string;
  items: CartItemType[];
};

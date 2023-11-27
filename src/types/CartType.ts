import { ProductType } from '@Types/ProductType.ts';

export type CartItemType = {
  id: string;
  menuId: string;
  quantity: number;
  product: ProductType;
};

export type CartType = {
  id: string;
  user: string;
  items: CartItemType[];
};

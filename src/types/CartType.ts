import { ProductType } from '@Types/ProductType.ts';
import { DiscountType } from '@Types/DiscountType.ts';

export const initialCartState: CartType = {
  id: '',
  userId: '',
  items: [],
  createdAt: new Date().toISOString(),
  discounts: [],
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
  discounts: DiscountType[];
};

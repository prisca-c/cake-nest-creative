import { MenuType } from '@Types/MenuType.ts';
import { fakeMenu1 } from '~@/data/fakeMenu.ts';
import { CartType, initialCartState } from '@Types/CartType.ts';
import { DiscountType } from '@Types/DiscountType.ts';

export const initialUserState: UserType = {
  id: '',
  username: '',
  isAdmin: false,
  menus: [fakeMenu1],
  cart: initialCartState,
  discounts: [],
};

export type UserType = {
  id: string;
  username: string;
  isAdmin: boolean;
  menus: MenuType[];
  cart: CartType;
  discounts: DiscountType[];
};

import { MenuType } from '@Types/MenuType.ts';
import { fakeMenu1 } from '~@/data/fakeMenu.ts';
import { CartType, initialCartState } from '@Types/CartType.ts';

export const initialUserState: UserType = {
  id: crypto.randomUUID(),
  username: '',
  isAdmin: false,
  menus: [fakeMenu1],
  cart: initialCartState,
};

export type UserType = {
  id: string;
  username: string;
  isAdmin: boolean;
  menus: MenuType[];
  cart: CartType;
};

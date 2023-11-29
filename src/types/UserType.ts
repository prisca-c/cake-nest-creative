import { ProductType } from '@Types/ProductType.ts';
import { MenuType } from '@Types/MenuType.ts';
import { fakeMenu1 } from '~@/data/fakeMenu.ts';

export const initialUserState: UserType = {
  id: crypto.randomUUID(),
  username: '',
  isAdmin: false,
  menu: [fakeMenu1],
  cart: {
    id: '',
    products: [],
  },
};

export type UserType = {
  id: string;
  username: string;
  isAdmin: boolean;
  menu: MenuType[];
  cart: {
    id: string;
    products: ProductType[];
  };
};

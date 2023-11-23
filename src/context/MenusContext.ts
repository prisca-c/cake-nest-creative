import { createContext, Dispatch, SetStateAction } from 'react';
import type { MenuType } from '@Types/ProductType.ts';

export const MenusContext = createContext<{
  menus: MenuType[];
  setMenus: Dispatch<SetStateAction<MenuType[]>>;
  selectedMenu: string;
  setSelectedMenu: Dispatch<SetStateAction<string>>;
}>({
  menus: [],
  setMenus: () => {},
  selectedMenu: '',
  setSelectedMenu: () => {},
});

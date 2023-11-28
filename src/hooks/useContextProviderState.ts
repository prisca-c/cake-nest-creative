import { useState } from 'react';
import { MenuType } from '@Types/MenuType.ts';
import { CartType } from '@Types/CartType.ts';

export const useContextProviderState = () => {
  const [name, setName] = useState('');
  const [adminMode, setAdminMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    menuId: string;
    productId: string;
  }>({ menuId: '', productId: '' });
  const [selectedTab, setSelectedTab] = useState<'add' | 'edit'>('add');
  const [openState, setOpenState] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [menus, setMenus] = useState<MenuType[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<string>('');
  const [cart, setCart] = useState<CartType>({
    id: '',
    user: '',
    items: [],
  });
  const [total, setTotal] = useState('0,00');

  return {
    nameState: {
      name,
      setName,
    },
    adminModeState: {
      adminMode,
      setAdminMode,
    },
    selectedProductState: {
      selectedProduct,
      setSelectedProduct,
    },
    selectedTabState: {
      selectedTab,
      setSelectedTab,
    },
    openStateState: {
      openState,
      setOpenState,
    },
    isAdminState: {
      isAdmin,
      setIsAdmin,
    },
    menusState: {
      menus,
      setMenus,
    },
    selectedMenuState: {
      selectedMenu,
      setSelectedMenu,
    },
    cartState: {
      cart,
      setCart,
    },
    totalState: {
      total,
      setTotal,
    },
  };
};
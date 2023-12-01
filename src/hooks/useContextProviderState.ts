import { useState } from 'react';
import { MenuType } from '@Types/MenuType.ts';
import { CartType, initialCartState } from '@Types/CartType.ts';
import { initialUserState, UserType } from '@Types/UserType.ts';
import { ManageProductTabType } from '@Types/ManageProductTabType.ts';
import { DiscountType } from '@Types/DiscountType.ts';

export const useContextProviderState = () => {
  const [user, setUser] = useState<UserType>(initialUserState);
  const [adminMode, setAdminMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    menuId: string;
    productId: string;
  }>({ menuId: '', productId: '' });
  const [selectedTab, setSelectedTab] = useState<ManageProductTabType>('add');
  const [openState, setOpenState] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [menus, setMenus] = useState<MenuType[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<string>('');
  const [cart, setCart] = useState<CartType>(initialCartState);
  const [total, setTotal] = useState(0);
  const [discounts, setDiscounts] = useState<DiscountType[]>([]);
  const [selectedDiscount, setSelectedDiscount] = useState<DiscountType | null>(
    null,
  );

  return {
    userState: {
      user,
      setUser,
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
    discountsState: {
      discounts,
      setDiscounts,
    },
    selectedDiscountState: {
      selectedDiscount,
      setSelectedDiscount,
    },
  };
};

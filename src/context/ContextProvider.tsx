import React, { useEffect, useState } from 'react';
import { AdminModeContext } from './AdminModeContext.ts';
import { NameContext } from './NameContext.ts';
import { ManageProductStatesContext } from './ManageProductStates.ts';
import { IsAdminContext } from './IsAdminContext.ts';
import { MenusContext } from './MenusContext.ts';
import { CartContext } from '@Context/CartContext.ts';

import type { MenuType } from '@Types/MenuType.ts';
import type { CartType } from '@Types/CartType.ts';
import { getAssociatedProduct } from '@Utils/cartHelper.ts';
import { handleFrenchPriceFormat } from '@Utils/math.ts';

type ContextProviderProps = {
  children: React.ReactNode;
};

export const ContextProvider = ({ children }: ContextProviderProps) => {
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

  useEffect(() => {
    const cartItems = cart.items;
    const itemsPrices = cartItems.map((item) => {
      const product = getAssociatedProduct(item, menus);
      if (!product) return 0;
      if (isNaN(product.price)) return 0;
      return product.price * item.quantity;
    });

    const total = itemsPrices.reduce((acc, price) => acc + price, 0);

    setTotal(handleFrenchPriceFormat(total));
  }, [menus, cart]);

  return (
    <CartContext.Provider value={{ cart, setCart, total, setTotal }}>
      <MenusContext.Provider
        value={{ menus, setMenus, selectedMenu, setSelectedMenu }}
      >
        <IsAdminContext.Provider value={{ isAdmin, setIsAdmin }}>
          <ManageProductStatesContext.Provider
            value={{ openState, setOpenState, selectedTab, setSelectedTab }}
          >
            <AdminModeContext.Provider
              value={{
                adminMode,
                setAdminMode,
                selectedProduct,
                setSelectedProduct,
              }}
            >
              <NameContext.Provider value={{ name, setName }}>
                {children}
              </NameContext.Provider>
            </AdminModeContext.Provider>
          </ManageProductStatesContext.Provider>
        </IsAdminContext.Provider>
      </MenusContext.Provider>
    </CartContext.Provider>
  );
};

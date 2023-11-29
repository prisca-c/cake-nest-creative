import React from 'react';
import { AdminModeContext } from './AdminModeContext.ts';
import { UserContext } from './UserContext.ts';
import { ManageProductStatesContext } from './ManageProductStates.ts';
import { IsAdminContext } from './IsAdminContext.ts';
import { MenusContext } from './MenusContext.ts';
import { CartContext } from '@Context/CartContext.ts';
import { useContextProviderState } from '@Hooks/useContextProviderState.ts';
import { useUpdateTotal } from '@Hooks/useUpdateTotal.ts';

type ContextProviderProps = {
  children: React.ReactNode;
};

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const {
    adminModeState,
    isAdminState,
    cartState,
    totalState,
    selectedTabState,
    openStateState,
    userState,
    menusState,
    selectedMenuState,
    selectedProductState,
  } = useContextProviderState();
  useUpdateTotal({
    menus: menusState.menus,
    cart: cartState.cart,
    setTotal: totalState.setTotal,
  });

  return (
    <CartContext.Provider value={{ ...cartState, ...totalState }}>
      <MenusContext.Provider value={{ ...menusState, ...selectedMenuState }}>
        <IsAdminContext.Provider value={{ ...isAdminState }}>
          <ManageProductStatesContext.Provider
            value={{ ...openStateState, ...selectedTabState }}
          >
            <AdminModeContext.Provider
              value={{
                ...adminModeState,
                ...selectedProductState,
              }}
            >
              <UserContext.Provider value={{ ...userState }}>
                {children}
              </UserContext.Provider>
            </AdminModeContext.Provider>
          </ManageProductStatesContext.Provider>
        </IsAdminContext.Provider>
      </MenusContext.Provider>
    </CartContext.Provider>
  );
};

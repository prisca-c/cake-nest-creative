import React, { useContext } from 'react';
import { ManageProductStatesContext } from '@Context/ManageProductStates.ts';
import { AdminModeContext } from '@Context/AdminModeContext.ts';
import { MenusContext } from '@Context/MenusContext.ts';

export const useHandleProductSelected = () => {
  const { openState, setOpenState, selectedTab, setSelectedTab } = useContext(
    ManageProductStatesContext,
  );
  const { adminMode, setSelectedProduct, selectedProduct } =
    useContext(AdminModeContext);
  const { selectedMenu, setSelectedMenu } = useContext(MenusContext);

  const handleSelect = (
    e: React.MouseEvent<HTMLDivElement>,
    id: string,
    menuId?: string,
  ) => {
    e.stopPropagation();

    if (!adminMode) return;

    const menu = menuId || selectedMenu;

    setSelectedProduct({ productId: id, menuId: menu });
    setSelectedMenu(menu);

    if (selectedTab === 'add' || selectedTab === 'discount')
      setSelectedTab('edit');
    if (!openState) setOpenState(true);
  };

  const handleActiveSelectedCard = (id: string, menuId?: string) => {
    const menu = menuId || selectedMenu;
    return (
      menu === selectedProduct.menuId &&
      selectedProduct.productId === id &&
      adminMode
    );
  };

  const handleClass = (id: string) =>
    handleActiveSelectedCard(id) ? 'active' : '';

  return {
    handleSelect,
    handleClass,
    handleActiveSelectedCard,
  };
};

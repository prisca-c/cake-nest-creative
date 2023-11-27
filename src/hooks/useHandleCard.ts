import React, { useContext, useState } from 'react';
import { ManageProductStatesContext } from '@Context/ManageProductStates.ts';
import { AdminModeContext } from '@Context/AdminModeContext.ts';
import { MenusContext } from '@Context/MenusContext.ts';
import { CartContext } from '@Context/CartContext.ts';
import { handleFrenchPriceFormat } from '@Utils/math.ts';
import { CartItemType } from '@Types/CartType.ts';
import { ProductType } from '@Types/ProductType.ts';
import { getDateNowNumber } from '@Utils/date.ts';

export const useHandleCard = () => {
  const { openState, setOpenState, selectedTab, setSelectedTab } = useContext(
    ManageProductStatesContext,
  );
  const { adminMode, selectedProduct, setSelectedProduct } =
    useContext(AdminModeContext);
  const { menus, setMenus, selectedMenu } = useContext(MenusContext);
  const { cart, setCart, setTotal } = useContext(CartContext);

  const [hover, setHover] = useState(false);

  const handlePrice = (price: number | string) =>
    handleFrenchPriceFormat(price);

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: ProductType,
  ) => {
    e.stopPropagation();
    const newMenus = menus.map((menu) =>
      menu.id === selectedMenu
        ? {
            ...menu,
            products: menu.products.filter((item) => item.id !== product.id),
          }
        : menu,
    );
    setMenus(newMenus);

    const newCartItems = cart.items.filter(
      (cartItem) =>
        cartItem.productId !== product.id || selectedMenu !== cartItem.menuId,
    );

    const newTotal = newCartItems.reduce(
      (acc, item) => acc + product.price * item.quantity,
      0,
    );

    setTotal(handleFrenchPriceFormat(newTotal));
    setCart({ ...cart, items: newCartItems });
  };

  const handleOnHover = (state: boolean) => adminMode && setHover(state);

  const handleActiveSelectedCard = (id: string) =>
    selectedProduct.productId === id && adminMode;

  const handleClass = (id: string) =>
    handleActiveSelectedCard(id) ? 'active' : '';

  const handleSelect = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    e.stopPropagation();

    if (!adminMode) return;

    setSelectedProduct({ productId: id, menuId: selectedMenu });

    if (selectedTab === 'add') setSelectedTab('edit');
    if (!openState) setOpenState(true);
  };

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: ProductType,
  ) => {
    e.stopPropagation();
    const cartItem: CartItemType | undefined = cart.items.find(
      (cartItem) =>
        product.id === cartItem.productId && selectedMenu === cartItem.menuId,
    );

    if (cartItem) {
      const newCartItems = cart.items.map((cartItem) =>
        cartItem.productId === product.id && selectedMenu === cartItem.menuId
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem,
      );
      const newTotal = newCartItems.reduce(
        (acc, item) => acc + product.price * item.quantity,
        0,
      );

      setTotal(handleFrenchPriceFormat(newTotal));
      setCart({ ...cart, items: newCartItems });
      return;
    } else {
      const newCartItems = [
        ...cart.items,
        {
          id: `${product.id}-${getDateNowNumber()}`,
          menuId: selectedMenu,
          quantity: 1,
          productId: product.id,
          createdAt: new Date().toISOString(),
        },
      ];

      setCart({ ...cart, items: newCartItems });
      return;
    }
  };

  return {
    handlePrice,
    handleDelete,
    handleOnHover,
    handleClass,
    handleSelect,
    handleActiveSelectedCard,
    handleAddToCart,
    adminMode,
    hover,
  };
};

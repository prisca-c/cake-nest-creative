import React, { useContext, useState } from 'react';
import { AdminModeContext } from '@Context/AdminModeContext.ts';
import { MenusContext } from '@Context/MenusContext.ts';
import { CartContext } from '@Context/CartContext.ts';
import { handleFrenchPriceFormat } from '@Utils/math.ts';
import { getDateNowNumber } from '@Utils/date.ts';
import type { ProductType } from '@Types/ProductType.ts';
import type { CartItemType } from '@Types/CartType.ts';

export const useHandleCard = () => {
  const { adminMode } = useContext(AdminModeContext);
  const { menus, setMenus, selectedMenu } = useContext(MenusContext);
  const { cart, setCart } = useContext(CartContext);

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

    setCart({ ...cart, items: newCartItems });
  };

  const handleOnHover = (state: boolean) => adminMode && setHover(state);

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: ProductType,
  ) => {
    e.stopPropagation();

    if (product.quantity === 0) return;

    const cartItem: CartItemType | undefined = cart.items.find(
      (cartItem) =>
        product.id === cartItem.productId && selectedMenu === cartItem.menuId,
    );

    const updateCart = (quantity: number) => {
      const newCartItems = cart.items.map((cartItem) =>
        cartItem.productId === product.id && selectedMenu === cartItem.menuId
          ? { ...cartItem, quantity }
          : cartItem,
      );

      setCart({ ...cart, items: newCartItems });
    };

    if (cartItem) {
      updateCart(cartItem.quantity + 1);
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
    }
  };

  return {
    handlePrice,
    handleDelete,
    handleOnHover,
    handleAddToCart,
    adminMode,
    hover,
  };
};

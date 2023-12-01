import React, { useContext, useState } from 'react';
import { AdminModeContext } from '@Context/AdminModeContext.ts';
import { MenusContext } from '@Context/MenusContext.ts';
import { CartContext } from '@Context/CartContext.ts';
import { handleFrenchPriceFormat } from '@Utils/math.ts';
import { getDateNowNumber } from '@Utils/date.ts';
import type { ProductType } from '@Types/ProductType.ts';
import type { CartItemType } from '@Types/CartType.ts';
import { useUpdateMenuUseCases } from '~@/usecases/useUpdateMenuUseCases.ts';
import { useUpdateCartUseCases } from '~@/usecases/useUpdateCartUseCases.ts';

export const useHandleCard = () => {
  const { adminMode } = useContext(AdminModeContext);
  const { menus, selectedMenu } = useContext(MenusContext);
  const { cart } = useContext(CartContext);
  const { updateMenus } = useUpdateMenuUseCases();
  const { updateCart: updateCartDB } = useUpdateCartUseCases();

  const [hover, setHover] = useState(false);

  const handlePrice = (price: number | string) =>
    handleFrenchPriceFormat(price);

  const handleDelete = async (
    e: React.MouseEvent<SVGSVGElement>,
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

    const newCartItems = cart.items.filter(
      (cartItem) =>
        cartItem.product.id !== product.id || selectedMenu !== cartItem.menuId,
    );

    await updateMenus(newMenus).then(async () => {
      await updateCartDB({ ...cart, items: newCartItems });
    });
  };

  const handleOnHover = (state: boolean) => adminMode && setHover(state);

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: ProductType,
  ) => {
    e.stopPropagation();

    if (product.quantity === 0 || !product.isAvailable) return;

    const cartItem: CartItemType | undefined = cart.items.find(
      (cartItem) =>
        product.id === cartItem.product.id && selectedMenu === cartItem.menuId,
    );

    const updateCart = (quantity: number) => {
      const newCartItems = cart.items.map((cartItem) =>
        cartItem.product.id === product.id && selectedMenu === cartItem.menuId
          ? { ...cartItem, quantity }
          : cartItem,
      );

      const newCart = {
        ...cart,
        items: newCartItems,
      };

      updateCartDB(newCart);
    };

    if (cartItem) {
      updateCart(cartItem.quantity + 1);
    } else {
      const newCart = {
        ...cart,
        items: [
          ...cart.items,
          {
            id: `${product.id}-${getDateNowNumber()}`,
            menuId: selectedMenu,
            quantity: 1,
            product,
            createdAt: new Date().toISOString(),
          },
        ],
      };

      updateCartDB(newCart);
    }
  };

  const handleTopLabel = (
    product: ProductType,
  ): { label: string; class: string } | null => {
    if (!product.isAvailable)
      return { label: 'Indisponible', class: 'unavailable' };
    if (product.isAdvertised)
      return { label: 'Incroyable', class: 'advertise' };
    return null;
  };

  return {
    handlePrice,
    handleDelete,
    handleOnHover,
    handleAddToCart,
    handleTopLabel,
    adminMode,
    hover,
  };
};

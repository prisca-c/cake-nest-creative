import React, { useContext, useState } from 'react';
import { CartContext } from '@Context/CartContext.ts';
import { AdminModeContext } from '@Context/AdminModeContext.ts';
import { MenusContext } from '@Context/MenusContext.ts';
import { useHandleProductSelected } from '@Hooks/useHandleProductSelected.ts';
import { handleFrenchPriceFormat } from '@Utils/math.ts';
import { CartItemType } from '@Types/CartType.ts';

export const useHandleCartItem = (cartItem: CartItemType) => {
  const [deleteOnOver, setDeleteOnOver] = useState(false);
  const [selectOnOver, setSelectOnOver] = useState(false);
  const { cart, setCart, setTotal } = useContext(CartContext);
  const { adminMode } = useContext(AdminModeContext);
  const { menus } = useContext(MenusContext);
  const { handleSelect, handleClass, handleActiveSelectedCard } =
    useHandleProductSelected();

  const menu = menus.find((menu) => menu.id === cartItem.menuId);
  const product = menu?.products.find(
    (product) => product.id === cartItem.productId,
  );

  if (!product) return null;

  const handleDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!deleteOnOver) return;
    const newCart = cart.items.filter((item) => item.id !== cartItem.id);
    setCart({ ...cart, items: newCart });
    setTotal(
      handleFrenchPriceFormat(
        newCart.reduce((acc, item) => acc + product.price * item.quantity, 0),
      ),
    );
  };

  const handleOnHover = (type: 'over' | 'out') => {
    if (type === 'over') setDeleteOnOver(true);
    if (type === 'out') setDeleteOnOver(false);

    if (adminMode) {
      if (type === 'over') setSelectOnOver(true);
      if (type === 'out') setSelectOnOver(false);
    }
  };

  return {
    handleDelete,
    handleOnHover,
    handleSelect,
    handleClass,
    handleActiveSelectedCard,
    product,
    selectOnOver,
    deleteOnOver,
  };
};

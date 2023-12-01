import React, { useContext, useState } from 'react';
import { CartContext } from '@Context/CartContext.ts';
import { AdminModeContext } from '@Context/AdminModeContext.ts';
import { MenusContext } from '@Context/MenusContext.ts';
import { useHandleProductSelected } from '@Hooks/useHandleProductSelected.ts';
import { handleFrenchPriceFormat } from '@Utils/math.ts';
import { CartItemType } from '@Types/CartType.ts';
import { useUpdateCartUseCases } from '~@/usecases/useUpdateCartUseCases.ts';

export const useHandleCartItem = (cartItem: CartItemType) => {
  const [deleteOnOver, setDeleteOnOver] = useState(false);
  const [selectOnOver, setSelectOnOver] = useState(false);
  const { cart } = useContext(CartContext);
  const { adminMode } = useContext(AdminModeContext);
  const { menus } = useContext(MenusContext);
  const { handleSelect, handleClass, handleActiveSelectedCard } =
    useHandleProductSelected();
  const { updateCart } = useUpdateCartUseCases();

  const handleDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!deleteOnOver) return;
    const newCart = cart.items.filter((item) => item.id !== cartItem.id);
    const newCartState = { ...cart, items: newCart };
    updateCart(newCartState);
  };

  const handleOnHover = (type: 'over' | 'out') => {
    if (type === 'over') setDeleteOnOver(true);
    if (type === 'out') setDeleteOnOver(false);

    if (adminMode) {
      if (type === 'over') setSelectOnOver(true);
      if (type === 'out') setSelectOnOver(false);
    }
  };

  const handleLabel = () => {
    const menu = menus.find((menu) => menu.id === cartItem.menuId);
    const product = menu?.products.find(
      (product) => product.id === cartItem.product.id,
    );
    if (!product) return '';
    if (!product.isAvailable) return 'Indisponible à la vente';
    if (product.quantity <= 0) return 'Rupture de stock';
    if (isNaN(product.price)) return 'NaN€';
    return handleFrenchPriceFormat(product.price);
  };

  return {
    handleDelete,
    handleOnHover,
    handleSelect,
    handleClass,
    handleLabel,
    handleActiveSelectedCard,
    selectOnOver,
    deleteOnOver,
  };
};

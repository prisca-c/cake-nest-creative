import React, { useEffect } from 'react';
import { getAssociatedProduct } from '@Utils/cartHelper.ts';
import { handleFrenchPriceFormat } from '@Utils/math.ts';
import { MenuType } from '@Types/MenuType.ts';
import { CartType } from '@Types/CartType.ts';

type UseUpdateTotalProps = {
  menus: MenuType[];
  cart: CartType;
  setTotal: React.Dispatch<React.SetStateAction<string>>;
};

export const useUpdateTotal = ({
  menus,
  cart,
  setTotal,
}: UseUpdateTotalProps) => {
  useEffect(() => {
    const cartItems = cart.items;
    const itemsPrices = cartItems.map((item) => {
      const product = getAssociatedProduct(item, menus);
      const unavailable =
        !product ||
        product.quantity <= 0 ||
        isNaN(product.price) ||
        !product.isAvailable;
      if (unavailable) return 0;
      return product.price * item.quantity;
    });

    const newTotal = itemsPrices.reduce((acc, price) => acc + price, 0);

    setTotal(handleFrenchPriceFormat(newTotal));
  }, [menus, cart]);
};

import React, { useEffect } from 'react';
import { getAssociatedProduct } from '@Utils/cartHelper.ts';
import { MenuType } from '@Types/MenuType.ts';
import { CartType } from '@Types/CartType.ts';
import { DiscountType } from '@Types/DiscountType.ts';
import { isValidDiscount } from '@Utils/discountHelper.ts';
import { UserType } from '@Types/UserType.ts';

type UseUpdateTotalProps = {
  user: UserType;
  menus: MenuType[];
  cart: CartType;
  discounts: DiscountType[];
  setTotal: React.Dispatch<React.SetStateAction<number>>;
};

export const useUpdateTotal = ({
  user,
  menus,
  cart,
  setTotal,
  discounts,
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
    const cartDiscounts = cart.discounts;
    let newTotal = itemsPrices.reduce((acc, price) => acc + price, 0);
    let discountTotal = 0;
    if (discounts.length > 0) {
      cartDiscounts.forEach((cartDiscount) => {
        if (!isValidDiscount(cartDiscount)) return;
        discounts.forEach((discount) => {
          if (!isValidDiscount(discount)) return;
          if (discount.id === cartDiscount.id) {
            discountTotal = discount.percentage / 100;
            newTotal = newTotal - newTotal * discountTotal;
          }
        });
      });
    }

    setTotal(newTotal);
  }, [menus, cart, discounts, user]);
};

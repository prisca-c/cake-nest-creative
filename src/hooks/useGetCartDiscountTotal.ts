import { UserContext } from '@Context/UserContext.ts';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '@Context/CartContext.ts';

export const useGetCartDiscountTotal = () => {
  const [totalDiscount, setTotalDiscount] = useState(0);
  const { user } = useContext(UserContext);
  const { total: totalCart } = useContext(CartContext);

  useEffect(() => {
    const cart = user.cart;

    const cartItems = cart.items;

    const itemsPrices = cartItems.map((item) => {
      const product = item.product;
      const unavailable =
        !product ||
        product.quantity <= 0 ||
        isNaN(product.price) ||
        !product.isAvailable;
      if (unavailable) return 0;
      return product.price * item.quantity;
    });
    const total = itemsPrices.reduce((acc, price) => acc + price, 0);
    setTotalDiscount(totalCart - total);
  }, [totalCart, user]);

  return totalDiscount;
};

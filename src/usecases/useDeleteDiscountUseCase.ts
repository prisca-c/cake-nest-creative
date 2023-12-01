import { useContext } from 'react';
import { DiscountsContext } from '@Context/DiscountsContext.ts';
import { UserContext } from '@Context/UserContext.ts';
import { ApiUsersFirebase } from '~@/services/Firebase/Api/ApiUsersFirebase.ts';
import { ApiDiscountFirebase } from '~@/services/Firebase/Api/ApiDiscountFirebase.ts';
import { CartContext } from '@Context/CartContext.ts';

export const useDeleteDiscountUseCase = () => {
  const { setDiscounts, discounts } = useContext(DiscountsContext);
  const { user, setUser } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);

  const deleteDiscount = async (discountId: string) => {
    const updatedDiscounts = discounts.filter(
      (discount) => discount.id !== discountId,
    );

    const updatedCartDiscounts = cart.discounts.filter(
      (discount) => discount.id !== discountId,
    );

    try {
      await Promise.all([
        ApiDiscountFirebase.updateDiscount(updatedDiscounts, user.id),
        ApiDiscountFirebase.updateCartDiscount(updatedCartDiscounts, user.id),
        ApiUsersFirebase.getUser(user.id).then((getUser) => {
          if (getUser) {
            localStorage.setItem('user', JSON.stringify(getUser));
            setDiscounts(getUser.discounts);
            setCart(getUser.cart);
            setUser(getUser);
          }
        }),
      ]);
    } catch (error) {
      //console.log(error);
    }
  };

  return {
    deleteDiscount,
  };
};

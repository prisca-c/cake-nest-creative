import { useContext } from 'react';
import { DiscountsContext } from '@Context/DiscountsContext.ts';
import { UserContext } from '@Context/UserContext.ts';
import { ApiUsersFirebase } from '~@/services/Firebase/Api/ApiUsersFirebase.ts';
import { ApiDiscountFirebase } from '~@/services/Firebase/Api/ApiDiscountFirebase.ts';

export const useDeleteDiscountUseCase = () => {
  const { setDiscounts, discounts } = useContext(DiscountsContext);
  const { user, setUser } = useContext(UserContext);

  const deleteDiscount = async (discountId: string) => {
    const updatedDiscounts = discounts.filter(
      (discount) => discount.id !== discountId,
    );

    try {
      await Promise.all([
        ApiDiscountFirebase.updateDiscount(updatedDiscounts, user.id),
        ApiUsersFirebase.getUser(user.id).then((getUser) => {
          if (getUser) {
            localStorage.setItem('user', JSON.stringify(getUser));
            setDiscounts(getUser.discounts);
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

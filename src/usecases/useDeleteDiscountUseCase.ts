import { useContext } from 'react';
import { DiscountsContext } from '@Context/DiscountsContext.ts';
import { UserContext } from '@Context/UserContext.ts';
import { ApiUsersFirebase } from '~@/services/Firebase/Api/ApiUsersFirebase.ts';

export const useDeleteDiscountUseCase = () => {
  const { setDiscounts } = useContext(DiscountsContext);
  const { user, setUser } = useContext(UserContext);

  const deleteDiscount = async (discountId: string) => {
    const updatedDiscounts = user.discounts.filter(
      (discount) => discount.id !== discountId,
    );

    const updatedUser = {
      ...user,
      discounts: updatedDiscounts,
    };

    try {
      await Promise.all([
        ApiUsersFirebase.updateUser(updatedUser),
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

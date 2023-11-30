import { useContext } from 'react';
import { DiscountsContext } from '@Context/DiscountsContext.ts';
import { UserContext } from '@Context/UserContext.ts';
import { DiscountType } from '@Types/DiscountType.ts';
import { ApiUsersFirebase } from '~@/services/Firebase/Api/ApiUsersFirebase.ts';
import { generateUUID } from '@Utils/math.ts';
import { ApiDiscountFirebase } from '~@/services/Firebase/Api/ApiDiscountFirebase.ts';

export const useUpsertDiscountUseCase = () => {
  const { setDiscounts } = useContext(DiscountsContext);
  const { user, setUser } = useContext(UserContext);

  const updateDiscounts = async (newDiscount: DiscountType) => {
    const idDiscount = newDiscount.id ? newDiscount.id : generateUUID();
    Object.assign(newDiscount, { id: idDiscount });

    const discountExists = user.discounts.find(
      (discount) => discount.id === idDiscount,
    );

    const updatedDiscounts = discountExists
      ? user.discounts.map((discount) => {
          return discount.id === idDiscount ? newDiscount : discount;
        })
      : [...user.discounts, newDiscount];

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
    updateDiscounts,
  };
};

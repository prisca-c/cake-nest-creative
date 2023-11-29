import { CartType } from '@Types/CartType.ts';
import { useContext } from 'react';
import { UserContext } from '@Context/UserContext.ts';
import { CartContext } from '@Context/CartContext.ts';
import { ApiUsersFirebase } from '~@/services/Firebase/Api/ApiUsersFirebase.ts';
import { UserType } from '@Types/UserType.ts';

export const useUpdateCartUseCases = () => {
  const { user } = useContext(UserContext);
  const { setCart } = useContext(CartContext);

  const updateCart = async (newCart: CartType) => {
    const updateUser: UserType = {
      ...user,
      cart: newCart,
    };

    try {
      await Promise.all([
        ApiUsersFirebase.updateUser(updateUser),
        ApiUsersFirebase.getUser(user.id).then((user) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            setCart(user.cart);
          }
        }),
      ]);
    } catch (error) {
      //console.log(error);
    }
  };

  return {
    updateCart,
  };
};

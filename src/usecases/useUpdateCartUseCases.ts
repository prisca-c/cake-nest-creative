import { CartType } from '@Types/CartType.ts';
import { useContext } from 'react';
import { UserContext } from '@Context/UserContext.ts';
import { CartContext } from '@Context/CartContext.ts';
import { ApiUsersFirebase } from '~@/services/Firebase/Api/ApiUsersFirebase.ts';
import { ApiCartFirebase } from '~@/services/Firebase/Api/ApiCartFirebase.ts';

export const useUpdateCartUseCases = () => {
  const { user, setUser } = useContext(UserContext);
  const { setCart } = useContext(CartContext);

  const updateCart = async (newCart: CartType) => {
    try {
      await Promise.all([
        ApiCartFirebase.updateCart(newCart, user.id),
        ApiUsersFirebase.getUser(user.id).then((user) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
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

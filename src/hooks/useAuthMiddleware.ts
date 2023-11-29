import { useContext, useEffect } from 'react';
import { UserContext } from '@Context/UserContext.ts';
import { useNavigate } from 'react-router-dom';
import { ApiUsersFirebase } from '~@/services/Firebase/Api/ApiUsersFirebase.ts';
import { UserType } from '@Types/UserType.ts';
import { CartContext } from '@Context/CartContext.ts';
import { IsAdminContext } from '@Context/IsAdminContext.ts';

export const useAuthMiddleware = () => {
  const { user, setUser } = useContext(UserContext);
  const { setCart } = useContext(CartContext);
  const { setIsAdmin } = useContext(IsAdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    const userLocal = localStorage.getItem('user');
    const userLocalParsed = userLocal ? JSON.parse(userLocal) : null;

    if (userLocal) {
      //console.log('cparse', userLocalParsed);
      ApiUsersFirebase.getUser(userLocalParsed.id).then((result) => {
        if (result) {
          setUser(result as UserType);
          setCart(result.cart);
          setIsAdmin(result.isAdmin);
          localStorage.setItem('user', JSON.stringify(result));
        } else {
          localStorage.removeItem('user');
          navigate('/');
        }
      });
    }

    if (!userLocal && !user.username) {
      navigate('/');
    }
  }, []);
};

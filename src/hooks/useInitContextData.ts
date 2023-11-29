import { useContext } from 'react';
import { MenusContext } from '@Context/MenusContext.ts';
import { CartContext } from '@Context/CartContext.ts';
import { IsAdminContext } from '@Context/IsAdminContext.ts';
import { UserType } from '@Types/UserType.ts';

export const useInitContextData = () => {
  const { setMenus, setSelectedMenu } = useContext(MenusContext);
  const { setCart } = useContext(CartContext);
  const { setIsAdmin } = useContext(IsAdminContext);

  const init = (user: UserType) => {
    if (user) {
      setIsAdmin(user.isAdmin);
      setCart(user.cart);
      setMenus(user.menus);
      setSelectedMenu(user.menus[0].id);
    }
  };

  return { init };
};

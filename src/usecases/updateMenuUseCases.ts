import { ApiUsersFirebase } from '~@/services/Firebase/Api/ApiUsersFirebase.ts';
import { UserContext } from '@Context/UserContext.ts';
import { MenuType } from '@Types/MenuType.ts';
import { useContext } from 'react';
import { MenusContext } from '@Context/MenusContext.ts';

export const updateMenuUseCases = () => {
  const { user } = useContext(UserContext);
  const { setMenus } = useContext(MenusContext);

  const updateMenus = async (newMenus: MenuType[]) => {
    const updateUser = {
      ...user,
      menu: newMenus,
    };

    try {
      await Promise.all([
        ApiUsersFirebase.updateUser(updateUser),
        ApiUsersFirebase.getUser(user.id).then((user) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            setMenus(user.menu);
          }
        }),
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    updateMenus,
  };
};

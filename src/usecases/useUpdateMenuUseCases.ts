import { ApiUsersFirebase } from '~@/services/Firebase/Api/ApiUsersFirebase.ts';
import { UserContext } from '@Context/UserContext.ts';
import { MenuType } from '@Types/MenuType.ts';
import { useContext } from 'react';
import { MenusContext } from '@Context/MenusContext.ts';
import { UserType } from '@Types/UserType.ts';

export const useUpdateMenuUseCases = () => {
  const { user } = useContext(UserContext);
  const { setMenus } = useContext(MenusContext);

  const updateMenus = async (newMenus: MenuType[]) => {
    const updateUser: UserType = {
      ...user,
      menus: newMenus,
    };
    try {
      await Promise.all([
        ApiUsersFirebase.updateUser(updateUser),
        ApiUsersFirebase.getUser(user.id).then((user) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            setMenus(user.menus);
          }
        }),
      ]);
    } catch (error) {
      //console.log(error);
    }
  };

  return {
    updateMenus,
  };
};

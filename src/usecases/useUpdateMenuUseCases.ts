import { ApiUsersFirebase } from '~@/services/Firebase/Api/ApiUsersFirebase.ts';
import { UserContext } from '@Context/UserContext.ts';
import { MenuType } from '@Types/MenuType.ts';
import { useContext } from 'react';
import { useInitContextData } from '@Hooks/useInitContextData.ts';
import { ApiMenusFirebase } from '~@/services/Firebase/Api/ApiMenusDirebase.ts';

export const useUpdateMenuUseCases = () => {
  const { user } = useContext(UserContext);
  const { init } = useInitContextData();

  const updateMenus = async (newMenus: MenuType[]) => {
    try {
      await Promise.all([
        ApiMenusFirebase.updateMenus(newMenus, user.id),
        ApiUsersFirebase.getUser(user.id).then((getUser) => {
          if (getUser) {
            localStorage.setItem('user', JSON.stringify(getUser));
            init(getUser);
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

import { useContext, useEffect } from 'react';
import { UserContext } from '@Context/UserContext.ts';
import { IsAdminContext } from '../context/IsAdminContext.ts';
import { useNavigate } from 'react-router-dom';
import { ApiUsersFirebase } from '~@/services/Firebase/ApiUsersFirebase.ts';
import { UserType } from '@Types/UserType.ts';

export const useAuthMiddleware = () => {
  const { user, setUser } = useContext(UserContext);
  const { setIsAdmin } = useContext(IsAdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    const userLocal = localStorage.getItem('user');
    const userLocalParsed = userLocal ? JSON.parse(userLocal) : null;

    if (userLocal) {
      const userExist = ApiUsersFirebase.getUser(userLocalParsed.username).then(
        (result) => {
          if (result) {
            setUser(result as UserType);
            localStorage.setItem('user', JSON.stringify(result));
          }
        },
      );

      if (!userExist) {
        navigate('/');
      }
    }

    if (!userLocal && !user.username) {
      navigate('/');
    }

    if (user.isAdmin) {
      setIsAdmin(user.isAdmin);
    }
  }, [user]);
};

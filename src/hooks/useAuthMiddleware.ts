import { useContext, useEffect } from 'react';
import { UserContext } from '@Context/UserContext.ts';
import { IsAdminContext } from '../context/IsAdminContext.ts';
import { useNavigate } from 'react-router-dom';
import { ApiUsersFirebase } from '~@/services/Firebase/Api/ApiUsersFirebase.ts';
import { UserType } from '@Types/UserType.ts';

export const useAuthMiddleware = () => {
  const { user, setUser } = useContext(UserContext);
  const { setIsAdmin } = useContext(IsAdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    const userLocal = localStorage.getItem('user');
    const userLocalParsed = userLocal ? JSON.parse(userLocal) : null;

    if (userLocal) {
      //console.log('cparse', userLocalParsed);
      ApiUsersFirebase.getUser(userLocalParsed.id).then((result) => {
        if (result) {
          //console.log(result);
          setUser(result as UserType);
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

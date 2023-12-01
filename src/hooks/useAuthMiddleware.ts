import { useContext, useEffect } from 'react';
import { UserContext } from '@Context/UserContext.ts';
import { useNavigate } from 'react-router-dom';
import { ApiUsersFirebase } from '~@/services/Firebase/Api/ApiUsersFirebase.ts';
import { useInitContextData } from '@Hooks/useInitContextData.ts';

export const useAuthMiddleware = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const initContextData = useInitContextData();

  useEffect(() => {
    const userLocal = localStorage.getItem('user');
    const userLocalParsed = userLocal ? JSON.parse(userLocal) : null;

    if (userLocal) {
      ApiUsersFirebase.getUser(userLocalParsed.id).then((result) => {
        if (result) {
          setUser(result);
          localStorage.setItem('user', JSON.stringify(result));
          initContextData.init(result); // init User's context data
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

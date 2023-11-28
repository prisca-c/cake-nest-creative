import { useContext, useEffect } from 'react';
import { NameContext } from '../context/NameContext.ts';
import { IsAdminContext } from '../context/IsAdminContext.ts';
import { useNavigate } from 'react-router-dom';

export const useHandleCookieName = () => {
  const { name, setName } = useContext(NameContext);
  const { setIsAdmin } = useContext(IsAdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    const cookies = decodeURIComponent(document.cookie);
    const cookieName = cookies
      .split(';')
      .find((cookie) => cookie.includes('name='))
      ?.split('=')[1];

    if (!name && cookieName) {
      setName(cookieName);
    } else if (!name || !cookieName) {
      return navigate('/');
    }

    if (cookieName === 'admin' || name === 'admin') setIsAdmin(true);
  });
};

import { useContext, useEffect } from 'react';
import { NameContext } from '../context/NameContext.ts';
import { IsAdminContext } from '../context/IsAdminContext.ts';
import { useNavigate } from 'react-router-dom';

export const useHandleCookieName = () => {
  const { name, setName } = useContext(NameContext);
  const { setIsAdmin } = useContext(IsAdminContext);

  const navigate = useNavigate();

  useEffect(() => {
    // Handle Cookie
    const cookies = decodeURIComponent(document.cookie);
    const cookie = cookies
      .split(';')
      .find((cookie) => cookie.includes('name='));
    const cookieName = cookie?.split('=')[1];

    const getName = name || cookieName;

    if (!getName) navigate('/');

    if (!name && cookieName) setName(cookieName);

    //Handle Admin
    if (name === 'admin') setIsAdmin(true);
  });
};

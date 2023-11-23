import { Link } from 'react-router-dom';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { theme } from '~@/theme';
import styled from 'styled-components';
import { useContext } from 'react';
import { NameContext } from '@Context/NameContext.ts';
import { TurnAdminModeButton } from './TurnAdminModeButton.tsx';
import { AdminModeContext } from '@Context/AdminModeContext.ts';
import { IsAdminContext } from '@Context/IsAdminContext.ts';
import { AdminToastInfo } from '../Toast/AdminToast.ts';

export const UserNavItem = () => {
  const { name, setName } = useContext(NameContext);
  const { adminMode, setAdminMode } = useContext(AdminModeContext);
  const { isAdmin } = useContext(IsAdminContext);

  const handleLogout = () => {
    document.cookie = 'name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setName('');
  };

  const handleAdminMode = () => {
    setAdminMode(!adminMode);

    if (adminMode) {
      AdminToastInfo('Mode admin désactivé');
    } else {
      AdminToastInfo('Mode admin activé');
    }
  };

  return (
    <ProfileDiv>
      {isAdmin && (
        <TurnAdminModeButton active={adminMode} onClick={handleAdminMode} />
      )}
      <div className={'text'}>
        <p className={'profile-text'}>
          Salut
          <span className={'profile-text-name'}> {name}</span>
        </p>
        <Link to={'/'} className={'profile-text-logout'} onClick={handleLogout}>
          Se déconnecter
        </Link>
      </div>
      <IoPersonCircleOutline size={35} color={theme.colors.greyDark} />
    </ProfileDiv>
  );
};

const ProfileDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;
  cursor: pointer;
  font-family: 'Open Sans', sans-serif;

  .text {
    display: flex;
    flex-direction: column;
  }

  .profile-text {
    color: ${theme.colors.greyDark};

    .profile-text-name {
      color: ${theme.colors.primary};
      text-transform: capitalize;
    }
  }

  .profile-text-logout {
    color: ${theme.colors.greyDark};
    font-size: 0.6rem;
    text-transform: capitalize;
    text-decoration: none;
    text-align: end;
  }
`;

import { Link } from 'react-router-dom';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { theme } from '~@/theme';
import styled from 'styled-components';
import { useContext } from 'react';
import { UserContext } from '@Context/UserContext.ts';
import { TurnAdminModeButton } from './TurnAdminModeButton.tsx';
import { IsAdminContext } from '@Context/IsAdminContext.ts';
import { useHandleAdminMode } from '@Hooks/useHandleAdminMode.ts';
import { initialUserState } from '@Types/UserType.ts';

export const UserNavItem = () => {
  const { user, setUser } = useContext(UserContext);
  const { isAdmin } = useContext(IsAdminContext);
  const { adminMode, handleAdminMode } = useHandleAdminMode();

  const handleLogout = () => {
    document.cookie = 'name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setUser(initialUserState);
  };

  return (
    <ProfileDiv>
      {isAdmin && (
        <TurnAdminModeButton active={adminMode} onClick={handleAdminMode} />
      )}
      <div className={'text'}>
        <p className={'profile-text'}>
          Salut
          <span className={'profile-text-name'}> {user.username}</span>
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

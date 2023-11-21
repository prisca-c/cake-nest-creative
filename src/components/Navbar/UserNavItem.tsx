import { Link } from 'react-router-dom';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { theme } from '../../theme';
import styled from 'styled-components';
import { useContext } from 'react';
import { NameContext } from '../../context/NameContext.ts';

export const UserNavItem = () => {
  const { name } = useContext(NameContext);

  return (
    <ProfileDiv>
      <div className={'text'}>
        <p className={'profile-text'}>
          Salut
          <span className={'profile-text-name'}> {name}</span>
        </p>
        <Link to={'/'} className={'profile-text-logout'}>
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

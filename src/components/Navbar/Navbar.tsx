import styled from 'styled-components';
import { Logo } from '../Logo.tsx';
import { theme } from '../../theme';
import { UserNavItem } from './UserNavItem.tsx';

export const Navbar = () => {
  return (
    <Div>
      <LogoText>
        Cake
        <Logo width={'20px'} />
        Nest
      </LogoText>
      <UserNavItem />
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  background-color: #fff;
  color: #000;
  border-radius: 10px 10px 0 0;
  padding: 0 20px;
`;

const LogoText = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  color: ${theme.colors.primary};
  gap: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

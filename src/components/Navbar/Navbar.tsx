import styled from 'styled-components';
import { UserNavItem } from './UserNavItem.tsx';
import { LogoNavItem } from './LogoNavItem.tsx';
import { theme } from '~@/theme';

export const Navbar = () => {
  return (
    <Div>
      <LogoNavItem />
      <UserNavItem />
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  background-color: #fff;
  color: #000;
  border-radius: 10px 10px 0 0;
  padding: 10px 20px;

  @media ${theme.devices.mobileL} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 10vh;
  }
`;

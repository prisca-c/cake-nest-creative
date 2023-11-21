import styled from 'styled-components';
import { UserNavItem } from './UserNavItem.tsx';
import { LogoNavItem } from './LogoNavItem.tsx';

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
  justify-content: space-between;
  align-items: center;
  height: clamp(3rem, 10vw, 5rem);
  background-color: #fff;
  color: #000;
  border-radius: 10px 10px 0 0;
  padding: 0 20px;
`;

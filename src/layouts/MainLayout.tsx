import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar } from '../components/Navbar/Navbar.tsx';
import { theme } from '../theme';

export const MainLayout = () => {
  return (
    <Div>
      <Navbar />
      <Main>
        <Outlet />
      </Main>
    </Div>
  );
};

const Div = styled.div`
  background-color: ${theme.colors.primary};
  padding: 20px;
`;

const Main = styled.main`
  background-color: #fff;
  padding: 15px 20px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.35);
  overflow: auto;
  height: calc(100vh - 10vh - 40px);
  border-radius: 0 0 10px 10px;
`;

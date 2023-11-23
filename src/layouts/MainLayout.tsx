import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar } from '../components/Navbar/Navbar.tsx';
import { theme } from '../theme';
import { useHandleCookieName } from '../hooks/useHandleCookieName.ts';

export const MainLayout = () => {
  useHandleCookieName();

  return (
    <Div>
      <Container>
        <Navbar />
        <Main>
          <Outlet />
        </Main>
      </Container>
    </Div>
  );
};

const Div = styled.div`
  background-color: ${theme.colors.primary};
  padding: 20px;
  height: calc(100vh - 40px);
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  height: 100%;
  width: clamp(300px, 100%, 1000px);
`;

const Main = styled.div`
  background-color: #fff;
  padding: 15px 20px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.35);
  border-radius: 0 0 10px 10px;
  height: 100%;
  width: auto;
  overflow: scroll;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

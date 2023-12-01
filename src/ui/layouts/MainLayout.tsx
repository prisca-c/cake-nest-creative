import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar } from '../components/Navbar/Navbar.tsx';
import { theme } from '../theme';
import { useAuthMiddleware } from '@Hooks/useAuthMiddleware.ts';
import { Cart } from '~@/ui/components/Cart/Cart.tsx';

export const MainLayout = () => {
  useAuthMiddleware();

  return (
    <Div>
      <Container>
        <Navbar />
        <Main>
          <Cart />
          <div className={'content'}>
            <Outlet />
          </div>
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
  flex: 1;
`;

const Main = styled.div`
  display: flex;
  background-color: #fff;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.35);
  border-radius: 0 0 10px 10px;
  height: 100%;
  width: auto;
  overflow: hidden;

  .content {
    display: flex;
    flex: 1;
    width: 100%;
  }
`;

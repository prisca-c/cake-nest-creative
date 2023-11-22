import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar } from '../components/Navbar/Navbar.tsx';
import { theme } from '../theme';
import { useContext, useEffect } from 'react';
import { NameContext } from '../context/NameContext.ts';

export const MainLayout = () => {
  const { name, setName } = useContext(NameContext);
  const navigate = useNavigate();

  useEffect(() => {
    const cookies = decodeURIComponent(document.cookie);
    const cookie = cookies
      .split(';')
      .find((cookie) => cookie.includes('name='));
    const cookieName = cookie?.split('=')[1];

    const getName = name || cookieName;

    if (!getName) navigate('/');

    if (!name && cookieName) setName(cookieName);
  });

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
`;

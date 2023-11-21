import { Login } from '../components/LoginPage/Login.tsx';
import styled from 'styled-components';
import { theme } from '../theme';
import { DivCenter } from '../components/DivCenter.tsx';

export const LoginPage = () => {
  const DivBackground = styled.div`
    font-family: 'Pacifico', cursive;
    background-image: url('/src/assets/images/tarts.jpg');
    background-size: cover;
    background-position: center;
    height: 100%;
    width: 100%;
  `;

  const H1 = styled.h1`
    font-size: clamp(2rem, 5vw, 5rem);
    color: #fff;
  `;

  const Separator = styled.div`
    width: clamp(100px, 50%, 500px);
    height: 1px;
    background-color: ${theme.colors.primary};
    margin: 20px 0;
  `;

  const LogoDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-family: 'Open Sans', sans-serif;
    text-transform: uppercase;
    color: ${theme.colors.primary};
    font-size: 2.5rem;
  `;

  const Logo = styled.img`
    width: clamp(50px, 10%, 100px);
  `;

  const BackgroundOpacity = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
  `;

  return (
    <DivBackground>
      <BackgroundOpacity>
        <DivCenter>
          <LogoDiv>
            <p>Cake</p>
            <Logo src="/src/assets/images/cupcake.png" alt="logo" />
            <p>Nest</p>
          </LogoDiv>
          <H1>Bienvenue chez nous ! </H1>
          <Separator />
          <Login />
        </DivCenter>
      </BackgroundOpacity>
    </DivBackground>
  );
};

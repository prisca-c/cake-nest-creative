import styled from 'styled-components';
import { LoginForm } from './LoginForm.tsx';
import { DivCenter } from '../DivCenter.tsx';

export const Login = () => {
  return (
    <DivCenter>
      <H2>Connectez-vous</H2>
      <LoginForm />
    </DivCenter>
  );
};

const H2 = styled.h2`
  color: #fff;
  text-align: center;
`;

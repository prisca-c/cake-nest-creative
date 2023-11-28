import { Logo } from '../Logo.tsx';
import styled from 'styled-components';
import { theme } from '~@/theme';
import { useNavigate } from 'react-router-dom';

export const LogoNavItem = () => {
  const navigate = useNavigate();

  const refreshPage = () => {
    navigate(0);
  };

  return (
    <LogoText onClick={refreshPage}>
      Cake
      <Logo width={'clamp(2rem, 45px, 3rem)'} />
      Nest
    </LogoText>
  );
};

const LogoText = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: clamp(1.5rem, ${theme.fonts.size.P3}, 2rem);
  font-weight: bold;
  text-transform: uppercase;
  color: ${theme.colors.primary};
  gap: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

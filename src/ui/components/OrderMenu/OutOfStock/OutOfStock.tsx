import styled from 'styled-components';
import { useContext } from 'react';
import { AdminModeContext } from '@Context/AdminModeContext.ts';
import { AdminOutOfStock } from './AdminOutOfStock.tsx';
import { PublicOutOfStock } from './PublicOutOfStock.tsx';
import { theme } from '~@/ui/theme';

export const OutOfStock = () => {
  const { adminMode } = useContext(AdminModeContext);
  return <Main>{adminMode ? <AdminOutOfStock /> : <PublicOutOfStock />}</Main>;
};

const Main = styled.div`
  font-family: 'Pacifico', cursive;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: ${theme.colors.greyDark};
  font-size: ${theme.fonts.size.P3};
  text-align: center;
  margin-top: clamp(20px, 5vw, 60px);
`;

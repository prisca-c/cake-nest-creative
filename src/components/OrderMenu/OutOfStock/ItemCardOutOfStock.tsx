import styled from 'styled-components';
import { theme } from '~@/theme';

export const ItemCardOutOfStock = () => {
  return (
    <Main>
      <p>Épuisé</p>
    </Main>
  );
};

const Main = styled.div`
  position: absolute;
  text-transform: uppercase;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  font-size: ${theme.fonts.size.P4};
  font-family: 'Open Sans', sans-serif;
  background-color: rgba(255, 255, 255, 0.71);

  p {
    transform: rotate(-20deg);
    color: ${theme.colors.white};
    background-color: ${theme.colors.red};
    padding: 10px 15px;
  }
`;

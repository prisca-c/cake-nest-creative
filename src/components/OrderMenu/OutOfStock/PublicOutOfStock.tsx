import styled from 'styled-components';

export const PublicOutOfStock = () => {
  return (
    <Main>
      <p>
        Victime de notre succès !
        <span> De nouvelles recettes sont en préparation, revenez vite !</span>
      </p>
    </Main>
  );
};

const Main = styled.div`
  width: 100%;
  display: grid;
  place-items: center;

  span {
    display: block;
  }
`;

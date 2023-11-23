import styled from 'styled-components';
import { Button } from '../../Button.tsx';
import { useContext } from 'react';
import { ManageProductStatesContext } from '../../../context/ManageProductStates.ts';

export const AdminOutOfStock = () => {
  const { openState, setOpenState, setSelectedTab } = useContext(
    ManageProductStatesContext,
  );

  const handleNewProducts = () => {
    if (!openState) setOpenState(true);
    setSelectedTab('add');
  };

  return (
    <Main>
      <p>
        Le menu est vide ?<span>Cliquez ci-dessous pour le réinitialiser</span>
      </p>
      <Button
        variant={'primary'}
        width={'fit-content'}
        onClick={handleNewProducts}
      >
        Générer de nouveaux produits
      </Button>
    </Main>
  );
};

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  span {
    display: block;
  }
`;

import { OrderMenu } from '../components/OrderMenu/OrderMenu.tsx';
import { ManageProductMenu } from '../components/ManageProductMenu/ManageProductMenu.tsx';
import { useContext } from 'react';
import { AdminModeContext } from '../context/AdminModeContext.ts';
import styled from 'styled-components';

export const OrderPage = () => {
  const { adminMode } = useContext(AdminModeContext);
  return (
    <Main>
      <OrderMenu />
      {adminMode && <ManageProductMenu />}
    </Main>
  );
};

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

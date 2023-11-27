import { OrderMenu } from '../components/OrderMenu/OrderMenu.tsx';
import { ManageProductMenu } from '../components/ManageProductMenu/ManageProductMenu.tsx';
import { useContext } from 'react';
import { AdminModeContext } from '../context/AdminModeContext.ts';
import styled from 'styled-components';

export const OrderPage = () => {
  const { adminMode } = useContext(AdminModeContext);
  return (
    <Main>
      <div className={'test'}>
        <OrderMenu />
      </div>
      {adminMode && <ManageProductMenu />}
    </Main>
  );
};

const Main = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;

  .test {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    overflow: scroll;
    width: 100%;

    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

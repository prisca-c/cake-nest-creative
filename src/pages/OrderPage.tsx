import { OrderMenu } from '../components/OrderMenu/OrderMenu.tsx';
import { DivCenter } from '../components/DivCenter.tsx';
import { ManageProductMenu } from '../components/ManageProductMenu/ManageProductMenu.tsx';
import { useContext } from 'react';
import { AdminModeContext } from '../context/AdminModeContext.ts';

export const OrderPage = () => {
  const { adminMode } = useContext(AdminModeContext);
  return (
    <DivCenter>
      <OrderMenu />
      {adminMode && <ManageProductMenu />}
    </DivCenter>
  );
};

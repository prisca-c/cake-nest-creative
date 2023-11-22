import { OrderMenu } from '../components/OrderMenu/OrderMenu.tsx';
import { DivCenter } from '../components/DivCenter.tsx';
import { ManageProductMenu } from '../components/ManageProductMenu/ManageProductMenu.tsx';

export const OrderPage = () => {
  return (
    <DivCenter>
      <OrderMenu />
      <ManageProductMenu />
    </DivCenter>
  );
};

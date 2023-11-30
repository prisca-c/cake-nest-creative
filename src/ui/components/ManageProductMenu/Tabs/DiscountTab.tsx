import { DiscountForm } from '~@/ui/components/ManageProductMenu/Tabs/DiscountForm.tsx';
import styled from 'styled-components';
import { Button } from '~@/ui/components/Button.tsx';

export const DiscountTab = () => {
  return (
    <Main>
      <Button variant={'primary'} width={'100%'} padded={false}>
        Ajouter un code promo
      </Button>
      <p>Gérer mes codes promos</p>
      <DiscountForm />
    </Main>
  );
};

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-weight: bold;
  width: 100%;
  height: 100%;
`;

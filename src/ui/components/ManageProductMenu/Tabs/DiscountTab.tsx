import { DiscountForm } from '~@/ui/components/ManageProductMenu/Tabs/DiscountForm.tsx';
import styled from 'styled-components';
import { Button } from '~@/ui/components/Button.tsx';
import { DiscountsContext } from '@Context/DiscountsContext.ts';
import { useContext } from 'react';
import { theme } from '~@/ui/theme';

export const DiscountTab = () => {
  const { discounts } = useContext(DiscountsContext);
  return (
    <Main>
      <div className={'container'}>
        <div className={'discounts_list'}>
          <p>Discounts</p>
          {discounts?.map((discount) => (
            <p key={discount.id}>
              {discount.code} - {discount.percentage}%
            </p>
          ))}
        </div>
        <DiscountForm />
      </div>
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

  .container {
    display: flex;
    height: 100%;
    width: 100%;
    overflow: hidden;
    gap: 10px;

    .discounts_list {
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      overflow-x: hidden;
      background-color: ${theme.colors.greyLight};
      width: 30%;
      height: 100%;
      padding: 10px;

      p {
        text-align: center;
      }
    }
  }
`;

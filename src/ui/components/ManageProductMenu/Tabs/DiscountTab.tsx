import { DiscountForm } from '~@/ui/components/ManageProductMenu/Tabs/DiscountForm.tsx';
import styled from 'styled-components';
import { DiscountsContext } from '@Context/DiscountsContext.ts';
import { useContext } from 'react';
import { theme } from '~@/ui/theme';
import { toLocaleDateString } from '@Utils/date.ts';
import { AdminModeContext } from '@Context/AdminModeContext.ts';
import { DiscountType } from '@Types/DiscountType.ts';

export const DiscountTab = () => {
  const { discounts } = useContext(DiscountsContext);
  const { setSelectedDiscount } = useContext(AdminModeContext);
  const handleSelectDiscount = (item: DiscountType) => {
    setSelectedDiscount(item);
  };

  return (
    <Main>
      <div className={'container'}>
        <div className={'discounts_list'}>
          <p>Discounts</p>
          {discounts?.map((discount) => (
            <div
              key={discount.id}
              className={'discount_item'}
              onClick={() => handleSelectDiscount(discount)}
            >
              <div>
                <p>
                  {discount.code} - {discount.percentage}%
                </p>
                <p>
                  {toLocaleDateString(discount.startDate)} -{' '}
                  {toLocaleDateString(discount.endDate)}
                </p>
              </div>
            </div>
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
      gap: 10px;
      overflow-y: scroll;
      overflow-x: hidden;
      background-color: ${theme.colors.greyLight};
      width: 70%;
      padding: 10px;

      .discount_item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 5px 0;
        border-bottom: 1px solid ${theme.colors.greyLight};
        font-size: 1.2rem;
        font-weight: 400;
        color: ${theme.colors.primary};
        text-transform: uppercase;
        background-color: ${theme.colors.white};
        border-radius: 5px;
        width: 100%;
        span {
          text-align: center;
        }
      }

      p {
        text-align: center;
      }
    }
  }
`;

import { DiscountForm } from '~@/ui/components/ManageProductMenu/Tabs/DiscountForm.tsx';
import styled from 'styled-components';
import { DiscountsContext } from '@Context/DiscountsContext.ts';
import { useContext } from 'react';
import { theme } from '~@/ui/theme';
import { toLocaleDateString } from '@Utils/date.ts';
import { AdminModeContext } from '@Context/AdminModeContext.ts';
import { DiscountType } from '@Types/DiscountType.ts';
import { DateTime } from 'luxon';

export const DiscountTab = () => {
  const { discounts } = useContext(DiscountsContext);
  const { setSelectedDiscount, selectedDiscount } =
    useContext(AdminModeContext);

  const handleSelectDiscount = (item: DiscountType) => {
    setSelectedDiscount(item);
  };

  const isSelected = (id: string) => {
    return selectedDiscount?.id === id;
  };

  const isActive = (discount: DiscountType) => {
    if (!discount.enabled) return false;

    const now = DateTime.now();
    const startDate = DateTime.fromISO(discount.startDate);
    const endDate = DateTime.fromISO(discount.endDate);
    if (
      startDate.toFormat('yyyy-MM-dd') === endDate.toFormat('yyyy-MM-dd') &&
      startDate.toFormat('yyyy-MM-dd') === now.toFormat('yyyy-MM-dd')
    ) {
      return true;
    }
    const isAfterOrEqualStart = now >= startDate;
    const isBeforeOrEqualEnd = now <= endDate;

    return isAfterOrEqualStart && isBeforeOrEqualEnd;
  };

  return (
    <Main>
      <div className={'container'}>
        <div className={'discounts_list'}>
          <p className={'title'}>Discounts</p>
          {discounts &&
            discounts.length !== 0 &&
            discounts?.map((discount) => (
              <DiscountItem
                key={discount.id}
                className={'discount_item'}
                onClick={() => handleSelectDiscount(discount)}
                $selected={isSelected(discount.id)}
              >
                <div className={'left'}>
                  <p>{discount.code}</p>
                  <p>{discount.percentage}%</p>
                  <p>
                    {toLocaleDateString(discount.startDate)} -{' '}
                    {toLocaleDateString(discount.endDate)}
                  </p>
                </div>
                <p className={isActive(discount) ? 'active' : 'inactive'}>
                  {isActive(discount) ? 'Actif' : 'Inactif'}
                </p>
              </DiscountItem>
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

      .title {
        text-align: center;
      }
    }
  }
`;

const DiscountItem = styled.div<{
  $selected?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${theme.colors.greyLight};
  font-weight: 400;
  color: ${({ $selected }) =>
    $selected ? theme.colors.white : theme.colors.primary};
  text-transform: uppercase;
  background-color: ${({ $selected }) =>
    $selected ? theme.colors.primary : theme.colors.white};
  border-radius: 5px;
  width: calc(100% - 20px);
  cursor: pointer;
  padding: 0 10px;

  &:hover {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
  }

  .active {
    color: ${theme.colors.success};
  }

  .inactive {
    color: ${theme.colors.red};
  }
`;

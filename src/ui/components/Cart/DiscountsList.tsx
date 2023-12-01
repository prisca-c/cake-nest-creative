import { useState } from 'react';
import styled from 'styled-components';
import { theme } from '~@/ui/theme';
import type { DiscountType } from '@Types/DiscountType.ts';
import { isValidDiscount } from '@Utils/discountHelper.ts';
import { useDeleteCartDiscountUseCase } from '~@/usecases/useDeleteCartDiscountUseCase.ts';

type DiscountsListProps = {
  item: DiscountType[];
};

export const DiscountsList = ({ item }: DiscountsListProps) => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteCartDiscount } = useDeleteCartDiscountUseCase();
  const currentDiscounts = (): number => {
    const valid = item.filter((discount) => isValidDiscount(discount));
    return valid.length;
  };

  const removeDiscount = async (discount: DiscountType) => {
    if (isDeleting) return;
    setIsDeleting(true);
    await deleteCartDiscount(discount.id).then(() => {
      setIsDeleting(false);
    });
  };

  return (
    <Main>
      <button className={'open_button'} onClick={() => setOpen(!open)}>
        Il y a {currentDiscounts()} réductions
      </button>
      <div className={`discount_list ${open ? 'open' : ''} `}>
        {item.map((discount) => {
          return (
            <div
              key={discount.id}
              className={`list_item ${open ? 'open' : ''} `}
              onClick={() => removeDiscount(discount)}
            >
              {discount.code}
            </div>
          );
        })}
      </div>
    </Main>
  );
};

const Main = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem 0.5rem 0 0.5rem;

  .open_button {
    width: 100%;
    padding: 0.5rem;
    background-color: ${theme.colors.primary};
    border-radius: ${theme.borderRadius.extraRound};
    border: none;
    cursor: pointer;
    outline: none;
    font-family: 'Open Sans', sans-serif;
  }

  .discount_list {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    max-height: 0;
    overflow: hidden;
    transition: all 1s ease-in-out;
    &.open {
      max-height: 1000px;
    }

    .list_item {
      width: fit-content;
      padding: 0 10px;
      background-color: ${theme.colors.primary};
      border-radius: ${theme.borderRadius.round};
      border: none;
      outline: none;
      margin-top: 5px;
      cursor: pointer;

      &:hover {
        background-color: ${theme.colors.red};
      }
    }
  }
`;

import styled from 'styled-components';
import { theme } from '~@/ui/theme';
import { BiSolidTrash } from 'react-icons/bi';
import type { CartItemType } from '@Types/CartType.ts';
import { useHandleCartItem } from '@Hooks/components/useHandleCartItem.ts';
import React from 'react';

type CartItemProps = {
  cartItem: CartItemType;
};

export const CartItem = ({ cartItem }: CartItemProps) => {
  const { quantity, menuId } = cartItem;
  const {
    handleDelete,
    handleOnHover,
    handleSelect,
    handleClass,
    handleActiveSelectedCard,
    product,
    selectOnOver,
    deleteOnOver,
    handleLabel,
  } = useHandleCartItem(cartItem)!;

  return (
    <Main
      $deleteOnHover={deleteOnOver}
      $selectOnHover={selectOnOver}
      $active={handleActiveSelectedCard(product.id, menuId)}
      onMouseOver={() => handleOnHover('over')}
      onMouseOut={() => handleOnHover('out')}
      onClick={(e) => handleSelect(e, product.id, menuId)}
      className={handleClass(product.id)}
    >
      <div className={'left'}>
        <img src={product.imageSource} alt={product.title} />
        <div>
          <h3>{product.title}</h3>
          <div className="information">
            <p className={'price'}>{handleLabel()}</p>
          </div>
        </div>
      </div>
      <div
        className={'action'}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => handleDelete(e)}
      >
        {deleteOnOver && <BiSolidTrash color={theme.colors.white} size={20} />}
        {!deleteOnOver && <p className={'quantity'}>x {quantity}</p>}
      </div>
    </Main>
  );
};

const Main = styled.div<{
  $deleteOnHover: boolean;
  $selectOnHover: boolean;
  $active: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  background-color: ${({ $selectOnHover, $active }) =>
    $selectOnHover
      ? theme.colors.primary
      : $active
        ? theme.colors.primary
        : theme.colors.white};
  border-radius: ${theme.borderRadius.round};
  cursor: ${({ $selectOnHover }) => ($selectOnHover ? 'pointer' : 'default')};

  .left {
    display: flex;
    align-items: center;
    gap: 20px;

    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
    }

    h3 {
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100px;
    }
    .price {
      color: ${({ $selectOnHover, $active }) =>
        $selectOnHover
          ? theme.colors.white
          : $active
            ? theme.colors.white
            : theme.colors.primary};
      font-family: 'Open Sans', sans-serif;
    }

    .information {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .action {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 100%;
    cursor: ${({ $deleteOnHover }) => ($deleteOnHover ? 'pointer' : 'default')};
    background-color: ${({ $deleteOnHover }) =>
      $deleteOnHover ? theme.colors.red : theme.colors.white};
    .quantity {
      color: ${theme.colors.primary};
    }
  }
`;

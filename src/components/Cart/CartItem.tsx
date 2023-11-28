import { useContext, useState } from 'react';
import { CartContext } from '@Context/CartContext.ts';
import { MenusContext } from '@Context/MenusContext.ts';
import styled from 'styled-components';
import { theme } from '~@/theme';
import { handleFrenchPriceFormat } from '@Utils/math.ts';
import { BiSolidTrash } from 'react-icons/bi';
import type { CartItemType } from '@Types/CartType.ts';
import { AdminModeContext } from '@Context/AdminModeContext.ts';
import { useHandleProductSelected } from '@Hooks/useHandleProductSelected.ts';

type CartItemProps = {
  cartItem: CartItemType;
};

export const CartItem = ({ cartItem }: CartItemProps) => {
  const [deleteOnOver, setDeleteOnOver] = useState(false);
  const [selectOnOver, setSelectOnOver] = useState(false);
  const { quantity, menuId } = cartItem;
  const { cart, setCart, setTotal } = useContext(CartContext);
  const { adminMode } = useContext(AdminModeContext);
  const { menus } = useContext(MenusContext);
  const { handleSelect, handleClass, handleActiveSelectedCard } =
    useHandleProductSelected();

  const menu = menus.find((menu) => menu.id === cartItem.menuId);
  const product = menu?.products.find(
    (product) => product.id === cartItem.productId,
  );

  if (!product) return null;

  const handleDelete = () => {
    if (!deleteOnOver) return;
    const newCart = cart.items.filter((item) => item.id !== cartItem.id);
    setCart({ ...cart, items: newCart });
    setTotal(
      handleFrenchPriceFormat(
        newCart.reduce((acc, item) => acc + product.price * item.quantity, 0),
      ),
    );
  };

  const handleOnHover = (type: 'over' | 'out') => {
    if (type === 'over') setDeleteOnOver(true);
    if (type === 'out') setDeleteOnOver(false);

    if (adminMode) {
      if (type === 'over') setSelectOnOver(true);
      if (type === 'out') setSelectOnOver(false);
    }
  };

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
            <p className={'price'}>{handleFrenchPriceFormat(product.price)}</p>
          </div>
        </div>
      </div>
      <div className={'action'} onClick={handleDelete}>
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

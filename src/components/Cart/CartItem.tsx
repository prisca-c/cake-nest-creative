import { CartContext } from '@Context/CartContext.ts';
import { useContext, useState } from 'react';
import { handleFrenchPriceFormat } from '@Utils/math.ts';
import styled from 'styled-components';
import { CartItemType } from '@Types/CartType.ts';
import { theme } from '~@/theme';
import { BiSolidTrash } from 'react-icons/bi';

type CartItemProps = {
  cartItem: CartItemType;
};

export const CartItem = ({ cartItem }: CartItemProps) => {
  const [onHover, setOnHover] = useState(false);
  const { product, quantity } = cartItem;
  const { cart, setCart, setTotal } = useContext(CartContext);

  const handleDelete = () => {
    const newCart = cart.items.filter((item) => item.id !== cartItem.id);
    setCart({ ...cart, items: newCart });
    setTotal(
      handleFrenchPriceFormat(
        newCart.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0,
        ),
      ),
    );
  };

  return (
    <Main
      $onHover={onHover}
      onMouseOver={() => setOnHover(true)}
      onMouseOut={() => setOnHover(false)}
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
        {onHover && <BiSolidTrash color={theme.colors.white} size={20} />}
        {!onHover && <p className={'quantity'}>x {quantity}</p>}
      </div>
    </Main>
  );
};

const Main = styled.div<{ $onHover: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.round};

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
      color: ${theme.colors.primary};
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
    cursor: pointer;
    background-color: ${({ $onHover }) =>
      $onHover ? theme.colors.red : theme.colors.white};
    .quantity {
      color: ${theme.colors.primary};
    }
  }
`;

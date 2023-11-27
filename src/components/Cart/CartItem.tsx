import { handleFrenchPriceFormat } from '@Utils/math.ts';
import styled from 'styled-components';
import { CartItemType } from '@Types/CartType.ts';
import { theme } from '~@/theme';

type CartItemProps = {
  cartItem: CartItemType;
};

export const CartItem = ({ cartItem }: CartItemProps) => {
  const { product, quantity } = cartItem;
  return (
    <Main>
      <div className={'left'}>
        <img src={product.imageSource} alt={product.title} />
        <div>
          <h3>{product.title}</h3>
          <div className="information">
            <p className={'price'}>{handleFrenchPriceFormat(product.price)}</p>
          </div>
        </div>
      </div>
      <p className={'quantity'}>x {quantity}</p>
    </Main>
  );
};

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 10px 20px;
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

  .quantity {
    color: ${theme.colors.primary};
  }
`;

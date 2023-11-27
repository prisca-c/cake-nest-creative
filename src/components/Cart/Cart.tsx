import styled from 'styled-components';
import { useContext } from 'react';
import { CartContext } from '@Context/CartContext.ts';
import { theme } from '~@/theme';
import { CartItem } from '@Components/Cart/CartItem.tsx';

export const Cart = () => {
  const { total, cart } = useContext(CartContext);
  return (
    <Main>
      <div className={'header'}>
        <p>
          <span>Total</span>
          <span>{total}€</span>
        </p>
      </div>
      {cart.items?.length > 0 ? (
        cart.items.map((item) => <CartItem key={item.id} item={item.product} />)
      ) : (
        <div className={'empty'}>
          <p>Votre panier est vide</p>
        </div>
      )}
    </Main>
  );
};

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 40vw;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.35);
  font-family: 'Pacifico', cursive;

  .header {
    p {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      background-color: ${theme.colors.background_dark};
      color: ${theme.colors.primary};
      padding: 10px 20px;
      margin: 0;
      span {
        font-size: 20px;
        font-weight: 700;
      }
    }
  }
  .empty {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: ${theme.colors.greyLight};
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.35);

    p {
      font-size: ${theme.fonts.size.P3};
      color: ${theme.colors.greyDark};
      text-align: center;
    }
  }
`;

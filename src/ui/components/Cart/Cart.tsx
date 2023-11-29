import { useContext } from 'react';
import { CartContext } from '@Context/CartContext.ts';
import styled from 'styled-components';
import { theme } from '~@/ui/theme';
import { CartItem } from '~@/ui/components/Cart/CartItem.tsx';

export const Cart = () => {
  const { total, cart } = useContext(CartContext);
  return (
    <Main>
      <div className={'header'}>
        <p>
          <span>Total</span>
          <span>{total}</span>
        </p>
      </div>
      {cart.items?.length > 0 ? (
        <div className={'list'}>
          {cart.items
            .map((item) => <CartItem key={item.id} cartItem={item} />)
            .sort((a, b) =>
              a.props.cartItem.createdAt > b.props.cartItem.createdAt ? 1 : -1,
            )}
        </div>
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
  width: 30vw;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.35);
  font-family: 'Pacifico', cursive;
  background-color: ${theme.colors.greyLight};

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

  .list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px;
    flex: 1;
    overflow: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
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

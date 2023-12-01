import { useContext } from 'react';
import { CartContext } from '@Context/CartContext.ts';
import styled from 'styled-components';
import { theme } from '~@/ui/theme';
import { CartItem } from '~@/ui/components/Cart/CartItem.tsx';
import { AddDiscount } from '~@/ui/components/Cart/AddDiscount.tsx';
import { useGetCartDiscountTotal } from '@Hooks/useGetCartDiscountTotal.ts';
import { handleFrenchPriceFormat } from '@Utils/math.ts';
import { UserContext } from '@Context/UserContext.ts';
import { DiscountsList } from '~@/ui/components/Cart/DiscountsList.tsx';

export const Cart = () => {
  const { total, cart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const discountTotal = useGetCartDiscountTotal();

  return (
    <Main>
      <div className={'header'}>
        <p className={'total'}>
          <span>Total</span>
          <span>{handleFrenchPriceFormat(total)}</span>
        </p>
        <p className={'discount'}>
          Réduction actuelle:{' '}
          <span>{handleFrenchPriceFormat(discountTotal)}</span>
        </p>
        <AddDiscount />
        <DiscountsList item={user.cart.discounts} />
      </div>
      {user.cart.items.length && user.cart.items?.length > 0 ? (
        <div className={'cart_list'}>
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
    .total {
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

  .cart_list {
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

  .discount {
    display: flex;
    gap: 10px;
    background-color: ${theme.colors.white};
    color: ${theme.colors.primary};
    border: 2px solid ${theme.colors.background_dark};
    border-bottom: none;
    padding: 10px 10px;
    span {
      font-weight: 700;
      color: ${theme.colors.background_dark};
    }
  }
`;

import React, { useContext, useState } from 'react';
import { DiscountsContext } from '@Context/DiscountsContext.ts';
import styled from 'styled-components';
import { theme } from '~@/ui/theme';
import { CartContext } from '@Context/CartContext.ts';
import { BiRightArrowCircle } from 'react-icons/bi';
import { Button } from '~@/ui/components/Button.tsx';
import { useUpdateCartUseCases } from '~@/usecases/useUpdateCartUseCases.ts';
import { isValidDiscount } from '@Utils/discountHelper.ts';
import { useTimer } from '@Hooks/useTimer.ts';

export const AddDiscount = () => {
  const { discounts } = useContext(DiscountsContext);
  const { cart } = useContext(CartContext);
  const [submitMessage, setSubmitMessage] = useState<{
    text: string;
    color: string;
  }>({
    text: '',
    color: '',
  });
  const { timerState, setTimerState } = useTimer({ time: 3000 });
  const { updateCart } = useUpdateCartUseCases();
  const handleAddDiscount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code = e.currentTarget.code.value;
    const newCart = { ...cart };
    const newCartHasNonCumulativeDiscount = newCart.discounts.some(
      (discount) => !discount.cumulative,
    );

    const discountExists = newCart.discounts.some(
      (discount) => discount.code.toLowerCase() === code.toLowerCase(),
    );

    discounts.forEach((discount) => {
      if (
        discount.code.toLowerCase() === code.toLowerCase() &&
        !discountExists &&
        (newCart.discounts.length === 0 || discount.cumulative) &&
        !newCartHasNonCumulativeDiscount
      ) {
        if (!isValidDiscount(discount)) {
          setSubmitMessage({
            text: "Le code de réduction n'est plus valide",
            color: theme.colors.red,
          });
          setTimerState(true);
          return;
        }
        newCart.discounts = [...newCart.discounts, discount];
        updateCart(newCart).catch(() =>
          console.error(() =>
            setSubmitMessage({
              text: 'Une erreur est survenue',
              color: theme.colors.red,
            }),
          ),
        );
      }
    });

    if (discountExists) {
      setSubmitMessage({
        text: 'Le code de réduction a déjà été ajouté',
        color: theme.colors.red,
      });
      setTimerState(true);
      return;
    }

    e.currentTarget.code.value = '';
  };

  return (
    <Main>
      <div className={'discount_content'}>
        <p>Code de réduction</p>
        <form onSubmit={handleAddDiscount}>
          <input type="text" placeholder="Code" id={'code'} />
          <Button variant={'white'} width={'fit-content'} padded={false}>
            <BiRightArrowCircle
              size={20}
              color={theme.colors.background_dark}
              className={'add-icon'}
            />
          </Button>
        </form>
      </div>
      {timerState && (
        <p className={'submit_message'} style={{ color: submitMessage.color }}>
          {submitMessage.text}
        </p>
      )}
    </Main>
  );
};

const Main = styled.div`
  display: flex;
  flex-direction: column;
  .discount_content {
    display: flex;
    gap: 10px;
    align-items: center;
    background-color: ${theme.colors.primary};
    padding: 15px 10px;
    height: 20px;
    width: calc(100% - 20px - 4px);
    color: ${theme.colors.background_dark};
    border: 2px solid ${theme.colors.background_dark};

    form {
      display: flex;
      gap: 10px;
      align-items: center;
      flex: 1;

      input {
        border: none;
        border-radius: 5px;
        padding: 5px;
        width: 100%;
      }

      .add-icon {
        cursor: pointer;
      }
    }
  }

  .submit_message {
    text-align: center;
  }
`;

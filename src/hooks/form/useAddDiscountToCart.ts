import React, { useContext, useState } from 'react';
import { DiscountsContext } from '@Context/DiscountsContext.ts';
import { CartContext } from '@Context/CartContext.ts';
import { useTimer } from '@Hooks/useTimer.ts';
import { useUpdateCartUseCases } from '~@/usecases/useUpdateCartUseCases.ts';
import { isValidDiscount } from '@Utils/discountHelper.ts';
import { theme } from '~@/ui/theme';

export const useAddDiscountToCart = () => {
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

  return {
    handleAddDiscount,
    submitMessage,
    timerState,
  };
};

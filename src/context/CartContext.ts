import { createContext, Dispatch, SetStateAction } from 'react';
import { CartType, initialCartState } from '@Types/CartType.ts';

export const CartContext = createContext<{
  cart: CartType;
  setCart: Dispatch<SetStateAction<CartType>>;
  total: number;
  setTotal: Dispatch<SetStateAction<number>>;
}>({
  cart: initialCartState,
  setCart: () => {},
  total: 0,
  setTotal: () => {},
});

import { createContext, Dispatch, SetStateAction } from 'react';
import { CartType, initialCartState } from '@Types/CartType.ts';

export const CartContext = createContext<{
  cart: CartType;
  setCart: Dispatch<SetStateAction<CartType>>;
  total: string;
  setTotal: Dispatch<SetStateAction<string>>;
}>({
  cart: initialCartState,
  setCart: () => {},
  total: '0,00',
  setTotal: () => {},
});

import { createContext, Dispatch, SetStateAction } from 'react';
import { CartType } from '@Types/CartType.ts';

export const CartContext = createContext<{
  cart: CartType;
  setCart: Dispatch<SetStateAction<CartType>>;
  total: string;
  setTotal: Dispatch<SetStateAction<string>>;
}>({
  cart: {
    id: '',
    user: '',
    items: [],
  },
  setCart: () => {},
  total: '0,00',
  setTotal: () => {},
});

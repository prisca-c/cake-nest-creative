import { createContext } from 'react';
import { DiscountType } from '@Types/DiscountType.ts';

export const DiscountsContext = createContext<{
  discounts: DiscountType[];
  setDiscounts: (discounts: DiscountType[]) => void;
}>({
  discounts: [],
  setDiscounts: () => {},
});

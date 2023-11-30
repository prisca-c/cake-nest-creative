import React, { createContext } from 'react';
import { DiscountType } from '@Types/DiscountType.ts';

export const DiscountsContext = createContext<{
  discounts: DiscountType[];
  setDiscounts: React.Dispatch<React.SetStateAction<DiscountType[]>>;
}>({
  discounts: [],
  setDiscounts: () => {},
});

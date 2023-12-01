import { createContext, Dispatch, SetStateAction } from 'react';
import { DiscountType } from '@Types/DiscountType.ts';
export const AdminModeContext = createContext<{
  adminMode: boolean;
  setAdminMode: Dispatch<SetStateAction<boolean>>;
  selectedProduct: { menuId: string; productId: string };
  setSelectedProduct: Dispatch<
    SetStateAction<{ menuId: string; productId: string }>
  >;
  selectedDiscount: DiscountType | null;
  setSelectedDiscount: Dispatch<SetStateAction<DiscountType | null>>;
}>({
  adminMode: false,
  setAdminMode: () => {},
  selectedProduct: { menuId: '', productId: '' },
  setSelectedProduct: () => {},
  selectedDiscount: null,
  setSelectedDiscount: () => {},
});

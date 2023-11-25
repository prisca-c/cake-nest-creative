import { createContext, Dispatch, SetStateAction } from 'react';
export const AdminModeContext = createContext<{
  adminMode: boolean;
  setAdminMode: Dispatch<SetStateAction<boolean>>;
  selectedProduct: { menuId: string; productId: string };
  setSelectedProduct: Dispatch<
    SetStateAction<{ menuId: string; productId: string }>
  >;
}>({
  adminMode: false,
  setAdminMode: () => {},
  selectedProduct: { menuId: '', productId: '' },
  setSelectedProduct: () => {},
});

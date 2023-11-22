import { createContext, Dispatch, SetStateAction } from 'react';
export const AdminModeContext = createContext<{
  adminMode: boolean;
  setAdminMode: Dispatch<SetStateAction<boolean>>;
}>({
  adminMode: false,
  setAdminMode: () => {},
});

import { createContext, Dispatch, SetStateAction } from 'react';

export const IsAdminContext = createContext<{
  isAdmin: boolean;
  setIsAdmin: Dispatch<SetStateAction<boolean>>;
}>({
  isAdmin: false,
  setIsAdmin: () => {},
});

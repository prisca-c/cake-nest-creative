import { createContext, Dispatch, SetStateAction } from 'react';
import { initialUserState, UserType } from '@Types/UserType.ts';
export const UserContext = createContext<{
  user: UserType;
  setUser: Dispatch<SetStateAction<UserType>>;
}>({
  user: initialUserState,
  setUser: () => {},
});

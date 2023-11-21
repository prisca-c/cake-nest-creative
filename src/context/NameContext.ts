import { createContext, Dispatch, SetStateAction } from 'react';
export const NameContext = createContext<{
  name: string;
  setName: Dispatch<SetStateAction<string>>;
}>({
  name: '',
  setName: () => {},
});

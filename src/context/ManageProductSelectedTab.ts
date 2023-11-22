import { createContext, Dispatch, SetStateAction } from 'react';

export const ManageProductSelectedTabContext = createContext<{
  selectedTab: 'add' | 'edit';
  setSelectedTab: Dispatch<SetStateAction<'add' | 'edit'>>;
}>({
  selectedTab: 'add',
  setSelectedTab: () => {},
});

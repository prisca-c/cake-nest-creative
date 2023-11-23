import { createContext, Dispatch, SetStateAction } from 'react';

export const ManageProductStatesContext = createContext<{
  selectedTab: 'add' | 'edit';
  setSelectedTab: Dispatch<SetStateAction<'add' | 'edit'>>;
  openState: boolean;
  setOpenState: Dispatch<SetStateAction<boolean>>;
}>({
  selectedTab: 'add',
  setSelectedTab: () => {},
  openState: false,
  setOpenState: () => {},
});

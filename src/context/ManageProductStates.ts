import { createContext, Dispatch, SetStateAction } from 'react';
import { ManageProductTabType } from '@Types/ManageProductTabType.ts';

export const ManageProductStatesContext = createContext<{
  selectedTab: ManageProductTabType;
  setSelectedTab: Dispatch<SetStateAction<ManageProductTabType>>;
  openState: boolean;
  setOpenState: Dispatch<SetStateAction<boolean>>;
}>({
  selectedTab: 'add',
  setSelectedTab: () => {},
  openState: false,
  setOpenState: () => {},
});

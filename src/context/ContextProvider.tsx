import React, { useState } from 'react';
import { AdminModeContext } from './AdminModeContext.ts';
import { NameContext } from './NameContext.ts';
import { ManageProductStatesContext } from './ManageProductStates.ts';
import { IsAdminContext } from './IsAdminContext.ts';

type ContextProviderProps = {
  children: React.ReactNode;
};

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [name, setName] = useState('');
  const [adminMode, setAdminMode] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'add' | 'edit'>('add');
  const [openState, setOpenState] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <IsAdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      <ManageProductStatesContext.Provider
        value={{ openState, setOpenState, selectedTab, setSelectedTab }}
      >
        <AdminModeContext.Provider value={{ adminMode, setAdminMode }}>
          <NameContext.Provider value={{ name, setName }}>
            {children}
          </NameContext.Provider>
        </AdminModeContext.Provider>
      </ManageProductStatesContext.Provider>
    </IsAdminContext.Provider>
  );
};

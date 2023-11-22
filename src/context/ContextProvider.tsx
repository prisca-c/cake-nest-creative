import React, { useState } from 'react';
import { AdminModeContext } from './AdminModeContext.ts';
import { NameContext } from './NameContext.ts';
import { ManageProductSelectedTabContext } from './ManageProductSelectedTab.ts';

type ContextProviderProps = {
  children: React.ReactNode;
};

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [name, setName] = useState('');
  const [adminMode, setAdminMode] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'add' | 'edit'>('add');

  return (
    <ManageProductSelectedTabContext.Provider
      value={{ selectedTab, setSelectedTab }}
    >
      <AdminModeContext.Provider value={{ adminMode, setAdminMode }}>
        <NameContext.Provider value={{ name, setName }}>
          {children}
        </NameContext.Provider>
      </AdminModeContext.Provider>
    </ManageProductSelectedTabContext.Provider>
  );
};

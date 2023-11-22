import { AdminModeContext } from './AdminModeContext.ts';
import { NameContext } from './NameContext.ts';
import { useState } from 'react';

type ContextProviderProps = {
  children: React.ReactNode;
};

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [name, setName] = useState('');
  const [adminMode, setAdminMode] = useState(false);

  return (
    <AdminModeContext.Provider value={{ adminMode, setAdminMode }}>
      <NameContext.Provider value={{ name, setName }}>
        {children}
      </NameContext.Provider>
    </AdminModeContext.Provider>
  );
};

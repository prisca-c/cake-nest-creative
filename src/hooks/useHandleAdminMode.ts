import { AdminToastInfo } from '~@/ui/components/Toast/AdminToast.ts';
import { useContext } from 'react';
import { AdminModeContext } from '@Context/AdminModeContext.ts';

export const useHandleAdminMode = () => {
  const { adminMode, setAdminMode } = useContext(AdminModeContext);

  const handleAdminMode = () => {
    setAdminMode((prevMode) => {
      const newMode = !prevMode;
      AdminToastInfo(`Mode admin ${newMode ? 'activé' : 'désactivé'}`);
      return newMode;
    });
  };

  return {
    handleAdminMode,
    setAdminMode,
    adminMode,
  };
};

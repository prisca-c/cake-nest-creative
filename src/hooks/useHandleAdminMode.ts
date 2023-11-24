import { AdminToastInfo } from '@Components/Toast/AdminToast.ts';
import { useContext } from 'react';
import { AdminModeContext } from '@Context/AdminModeContext.ts';

export const useHandleAdminMode = () => {
  const { adminMode, setAdminMode } = useContext(AdminModeContext);

  const handleAdminMode = () => {
    setAdminMode(!adminMode);

    if (adminMode) {
      AdminToastInfo('Mode admin désactivé');
    } else {
      AdminToastInfo('Mode admin activé');
    }
  };

  return {
    handleAdminMode,
    setAdminMode,
    adminMode,
  };
};

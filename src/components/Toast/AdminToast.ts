import { toast, ToastOptions } from 'react-toastify';
import { theme } from '~@/theme';

export const AdminToastInfo = (text: string) => {
  const toastOptions: ToastOptions = {
    position: 'bottom-right',
    style: {
      backgroundColor: theme.colors.incognito,
      color: theme.colors.primary,
    },
  };

  return toast.info(text, toastOptions);
};

export const AdminToastError = (text: string) => {
  const toastOptions: ToastOptions = {
    position: 'bottom-right',
    style: {
      backgroundColor: theme.colors.background_dark,
      color: theme.colors.red,
    },
  };

  return toast.error(text, toastOptions);
};

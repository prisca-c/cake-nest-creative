export const getDateNowNumber = () => {
  return new Date().getTime().toString();
};

export const convertDateToInput = (date: Date | string) => {
  return new Date(date).toISOString().split('T')[0];
};

export const toLocaleDateString = (date: Date | string) => {
  return new Date(date).toLocaleDateString();
};

import { DateTime } from 'luxon';

export const getDateNowNumber = () => {
  return new Date().getTime().toString();
};

export const convertDateToInput = (date: DateTime | string) => {
  return DateTime.fromISO(date.toString()).toFormat('yyyy-MM-dd');
};

export const toLocaleDateString = (date: DateTime | string) => {
  return DateTime.fromISO(date.toString()).toLocaleString(DateTime.DATE_SHORT);
};

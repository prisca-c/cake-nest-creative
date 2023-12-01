import { DateTime } from 'luxon';

export const initialDiscountState: DiscountType = {
  id: '',
  code: '',
  enabled: false,
  startDate: DateTime.now().toFormat('yyyy-MM-dd'),
  endDate: DateTime.now().toFormat('yyyy-MM-dd'),
  percentage: 0,
  cumulative: false,
};

export type DiscountType = {
  id: string;
  code: string;
  enabled: boolean;
  startDate: string;
  endDate: string;
  percentage: number;
  cumulative: boolean;
};

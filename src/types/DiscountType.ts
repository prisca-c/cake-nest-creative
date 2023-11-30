export const initialDiscountState = {
  id: '',
  code: '',
  enabled: false,
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
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

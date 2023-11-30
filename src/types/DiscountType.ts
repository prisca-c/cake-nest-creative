export const initialDiscountState = {
  id: crypto.randomUUID(),
  code: '',
  enabled: false,
  startDate: new Date(),
  endDate: new Date(),
  percentage: 0,
  cumulative: false,
};

export type DiscountType = {
  id: string;
  code: string;
  enabled: boolean;
  startDate: Date;
  endDate: Date;
  percentage: number;
  cumulative: boolean;
};

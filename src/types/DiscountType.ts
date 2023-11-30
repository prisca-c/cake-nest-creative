export type DiscountType = {
  id: string;
  code: string;
  enabled: boolean;
  startDate: Date;
  endDate: Date;
  percentage: number;
  cumulative: boolean;
};

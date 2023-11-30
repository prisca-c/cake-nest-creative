import { DiscountType } from '@Types/DiscountType.ts';
import { DateTime } from 'luxon';

export const isValidDiscount = (discount: DiscountType) => {
  if (!discount.enabled) return false;

  const now = DateTime.now();
  const startDate = DateTime.fromISO(discount.startDate);
  const endDate = DateTime.fromISO(discount.endDate);
  if (
    startDate.toFormat('yyyy-MM-dd') === endDate.toFormat('yyyy-MM-dd') &&
    startDate.toFormat('yyyy-MM-dd') === now.toFormat('yyyy-MM-dd')
  ) {
    return true;
  }
  const isAfterOrEqualStart = now >= startDate;
  const isBeforeOrEqualEnd = now <= endDate;

  return isAfterOrEqualStart && isBeforeOrEqualEnd;
};

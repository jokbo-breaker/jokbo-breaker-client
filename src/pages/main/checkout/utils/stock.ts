import { STOCK_LOW_THRESHOLD } from '@/pages/main/constants/checkout';

export const getRemainingBadge = (stockLeft: number | null | undefined) => {
  if (stockLeft == null) return '재고 확인';
  if (stockLeft <= 0) return '품절';
  if (stockLeft <= STOCK_LOW_THRESHOLD) return `${stockLeft}개 남음`;
  return `${stockLeft}개 남음`;
};

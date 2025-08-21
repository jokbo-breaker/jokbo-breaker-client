import type { OrderType } from '@/pages/main/constants/checkout';
import type { Product } from '@/shared/types';

export function getUnitPrice(p: Product, orderType: OrderType) {
  if (orderType === 'pickup' && p.pickupPrice) return p.pickupPrice;
  return p.price;
}

export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

import type { OrderItemApi } from '@/shared/apis/order/order';
import { ORDER_STATUS } from '@/pages/order/constants/order';
import type { OrderItem } from '@/pages/order/types/order';

const toIsoKst = (s: string) => {
  try {
    const [date, time] = s.split(' ');
    if (!date || !time) {
      console.error('Invalid date format:', s);
      return new Date().toISOString();
    }

    const y = parseInt(date.slice(0, 4));
    const m = parseInt(date.slice(4, 6)) - 1;
    const d = parseInt(date.slice(6, 8));

    const [hour, minute, second] = time.split(':').map(Number);

    if (
      isNaN(y) ||
      isNaN(m) ||
      isNaN(d) ||
      isNaN(hour) ||
      isNaN(minute) ||
      isNaN(second)
    ) {
      console.error('Invalid date components:', {
        y,
        m,
        d,
        hour,
        minute,
        second,
      });
      return new Date().toISOString();
    }

    const dateString = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}.000Z`;
    const utcDate = new Date(dateString);

    if (isNaN(utcDate.getTime())) {
      console.error('Invalid Date object created from:', dateString);
      return new Date().toISOString();
    }

    const koreaTime = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);

    return koreaTime.toISOString();
  } catch (error) {
    console.error('Error in toIsoKst:', error, 'Input:', s);
    return new Date().toISOString(); // 기본값 반환
  }
};

const mapStatus = (api: OrderItemApi): OrderItem['status'] => {
  const soldOut = api.items?.some((it) => it.currentStockLeft === 0);
  if (soldOut) return ORDER_STATUS.SOLD_OUT;
  if (api.status === 'delivered') return ORDER_STATUS.DELIVERED;
  if (api.status === 'pending') return ORDER_STATUS.IN_PROGRESS;
  return ORDER_STATUS.IN_PROGRESS;
};

export const mapOrderToUI = (o: OrderItemApi): OrderItem => {
  const first = o.items?.[0];
  const qty = first?.quantity ?? o.totalQuantity ?? 1;
  const discountRate = first?.discountedPercentage ?? 0;
  const salePrice = o.totalAmount ?? first?.totalPrice ?? 0;
  const originalPrice =
    first?.originalTotalPrice ?? (first?.originalMenuPrice ?? 0) * qty;

  const pickupPriceText =
    o.orderType === 'pickup' && first?.pickupPrice
      ? `픽업 시 ${first.pickupPrice.toLocaleString()}원`
      : undefined;

  return {
    id: o.orderId,
    orderedAt: toIsoKst(o.orderDate),
    method: o.orderType,
    status: mapStatus(o),
    image: first?.menuImageUrls?.[0] ?? '',
    store: o.storeName,
    name: first?.menuName ?? '',
    discountRate,
    salePrice,
    originalPrice,
    qty,
    savedGram: o.totalGrams ?? first?.totalGrams ?? 0,
    pickupPriceText,
  };
};

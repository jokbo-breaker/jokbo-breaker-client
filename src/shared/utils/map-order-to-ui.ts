// src/shared/utils/mapOrderToUI.ts  (API → UI 모델 매핑 유틸)
import type { OrderItemApi } from '@/shared/apis/order/order';
import { ORDER_STATUS } from '@/pages/order/constants/order';
import type { OrderItem } from '@/pages/order/types/order';

// "YYYYMMDD HH:mm:ss" → ISO
const toIsoKst = (s: string) => {
  // 20250822 11:18:56
  const [date, time] = s.split(' ');
  const y = date.slice(0, 4);
  const m = date.slice(4, 6);
  const d = date.slice(6, 8);
  // KST로 해석해 ISO로 변환
  return new Date(`${y}-${m}-${d}T${time}+09:00`).toISOString();
};

// API status → UI status 대략 매핑
const mapStatus = (api: OrderItemApi): OrderItem['status'] => {
  const soldOut = api.items?.some((it) => it.currentStockLeft === 0);
  if (soldOut) return ORDER_STATUS.SOLD_OUT;
  if (api.status === 'delivered') return ORDER_STATUS.DELIVERED;
  // cancel 가능 여부가 따로 오지 않으므로 pending은 진행중으로 처리
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
    method: o.orderType, // 'pickup' | 'delivery'
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

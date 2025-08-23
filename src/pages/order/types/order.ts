export interface OrderItem {
  id: string;
  orderedAt: string; // ISO string
  method: 'delivery' | 'pickup';
  status: import('../constants/order').OrderStatus;

  // 상품
  image: string;
  store: string;
  name: string;

  // 가격
  discountRate: number; // 20
  salePrice: number; // 10800
  originalPrice: number; // 13500
  qty: number; // 2

  // 픽업 탭 전용 문구 (ex. "픽업 시 9,800원")
  pickupPriceText?: string;

  // 절약 무게 배지
  savedGram: number; // 560
}

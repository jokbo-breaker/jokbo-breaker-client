export interface OrderItem {
  id: string;
  orderedAt: string;
  method: 'delivery' | 'pickup';
  status: import('../constants/order').OrderStatus;
  image: string;
  store: string;
  name: string;
  discountRate: number;
  salePrice: number;
  originalPrice: number;
  qty: number;
  pickupPriceText?: string;
  savedGram: number;
}

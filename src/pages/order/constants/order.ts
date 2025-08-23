export const ORDER_TABS = [
  { key: 'delivery', label: '배달' },
  { key: 'pickup', label: '픽업' },
] as const;

export type OrderTabKey = (typeof ORDER_TABS)[number]['key'];

export const ORDER_STATUS = {
  IN_PROGRESS: 'IN_PROGRESS', // 주문 진행 중
  DELIVERED: 'DELIVERED', // 배달완료
  CANCELLABLE: 'CANCELLABLE', // 취소 가능(진행 중)
  SOLD_OUT: 'SOLD_OUT', // 품절
} as const;
export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

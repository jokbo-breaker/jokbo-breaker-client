export type OrderType = 'team' | 'pickup';
export type PaymentMethod = 'card' | 'cash';

export const DEFAULT_QTY = 1 as const;

export const PAYMENT_LABEL: Record<PaymentMethod, string> = {
  card: '카드 결제',
  cash: '현장 결제',
};

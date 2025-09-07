import { OrderItem } from '@/pages/order/types/order';

export const ORDER_TABS = [
  { key: 'delivery', label: '배달' },
  { key: 'pickup', label: '픽업' },
] as const;

export type OrderTabKey = (typeof ORDER_TABS)[number]['key'];

export const ORDER_STATUS = {
  IN_PROGRESS: 'IN_PROGRESS',
  DELIVERED: 'DELIVERED',
  CANCELLABLE: 'CANCELLABLE',
  SOLD_OUT: 'SOLD_OUT',
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export const formatDateLine = (
  iso: string,
  status: OrderItem['status'],
  method: OrderItem['method'],
) => {
  const d = new Date(iso);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = d.getHours() % 12 || 12;
  const ap = d.getHours() >= 12 ? '오후' : '오전';
  const mi = String(d.getMinutes()).padStart(2, '0');

  const statusText =
    status === ORDER_STATUS.CANCELLABLE || status === ORDER_STATUS.IN_PROGRESS
      ? '주문 진행 중'
      : method === 'delivery'
        ? '배달완료'
        : undefined;

  return `${yyyy}. ${mm}. ${dd} ${ap} ${hh}시 ${mi}분${statusText ? ' ・ ' + statusText : ''}`;
};

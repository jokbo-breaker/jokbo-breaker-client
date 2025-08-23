import { useMemo, useState } from 'react';
import TopBar from '@/shared/layouts/top-bar';
import { ORDER_STATUS, ORDER_TABS, type OrderTabKey } from './constants/order';
import type { OrderItem } from './types/order';
import OrderCard from './components/order-card';
import { useNavigate } from 'react-router-dom';

// --- 샘플 데이터 (API 연동 전 UI 확인용) ---
const base: Omit<OrderItem, 'id' | 'orderedAt' | 'method' | 'status'> = {
  image: '/sample/order-thumb.jpg', // 실제 이미지 경로로 교체
  store: '스타벅스 송실대입구역점',
  name: '시크릿 런치 밀박스',
  discountRate: 20,
  salePrice: 10800,
  originalPrice: 13500,
  qty: 2,
  savedGram: 560,
  pickupPriceText: '픽업 시 9,800원',
};

const mockOrders: OrderItem[] = [
  {
    id: 'd1',
    orderedAt: '2025-08-16T22:16:00+09:00',
    method: 'delivery',
    status: ORDER_STATUS.CANCELLABLE,
    ...base,
  },
  {
    id: 'd2',
    orderedAt: '2025-08-16T22:16:00+09:00',
    method: 'delivery',
    status: ORDER_STATUS.IN_PROGRESS,
    ...base,
  },
  {
    id: 'd3',
    orderedAt: '2025-08-16T22:16:00+09:00',
    method: 'delivery',
    status: ORDER_STATUS.DELIVERED,
    ...base,
  },
  {
    id: 'd4',
    orderedAt: '2025-08-16T22:16:00+09:00',
    method: 'delivery',
    status: ORDER_STATUS.SOLD_OUT,
    ...base,
  },

  {
    id: 'p1',
    orderedAt: '2025-08-16T22:16:00+09:00',
    method: 'pickup',
    status: ORDER_STATUS.CANCELLABLE,
    ...base,
  },
  {
    id: 'p2',
    orderedAt: '2025-08-16T22:16:00+09:00',
    method: 'pickup',
    status: ORDER_STATUS.IN_PROGRESS,
    ...base,
  },
  {
    id: 'p3',
    orderedAt: '2025-08-16T22:16:00+09:00',
    method: 'pickup',
    status: ORDER_STATUS.DELIVERED,
    ...base,
  },
  {
    id: 'p4',
    orderedAt: '2025-08-16T22:16:00+09:00',
    method: 'pickup',
    status: ORDER_STATUS.SOLD_OUT,
    ...base,
  },
];

const formatDateLine = (
  iso: string,
  status: string,
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

export default function OrderHistoryPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<OrderTabKey>('delivery');

  const list = useMemo(() => mockOrders.filter((o) => o.method === tab), [tab]);

  const onCancel = (id: string) => {
    // TODO: 주문취소 모달/API 연결
    console.log('cancel', id);
  };
  const onReorder = (id: string) => {
    // TODO: 같은상품 주문하기 이동
    console.log('reorder', id);
  };

  return (
    <div className="scrollbar-hide h-dvh flex-col overflow-y-auto bg-white">
      <TopBar title="주문내역" showBack onBack={() => navigate(-1)} sticky />

      {/* 탭 */}
      <div className="px-[2rem]">
        <div className="flex h-[4.8rem] items-center gap-[2.4rem]">
          {ORDER_TABS.map((t) => {
            const active = t.key === tab;
            return (
              <button
                key={t.key}
                type="button"
                className="relative pb-[1.2rem]"
                onClick={() => setTab(t.key)}
              >
                <span
                  className={`body2 ${active ? 'text-black' : 'text-gray-400'}`}
                >
                  {t.label}
                </span>
                {active && (
                  <span className="absolute right-0 bottom-0 left-0 h-[0.2rem] rounded-[999px] bg-black" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 리스트 */}
      <main className="flex flex-col gap-[2rem] px-[2rem] pb-[8rem]">
        {list.map((item) => (
          <section key={item.id} className="flex flex-col gap-[0.8rem]">
            <p className="caption1 text-gray-400">
              {formatDateLine(item.orderedAt, item.status, item.method)}
            </p>
            <OrderCard item={item} onCancel={onCancel} onReorder={onReorder} />
          </section>
        ))}
      </main>
    </div>
  );
}

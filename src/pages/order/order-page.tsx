import { useMemo, useState } from 'react';
import TopBar from '@/shared/layouts/top-bar';
import { ORDER_TABS, type OrderTabKey } from './constants/order';
import EmptyRecommend from '@/pages/recommend/components/empty-recommend';
import type { OrderItem } from './types/order';
import OrderCard from './components/order-card';
import OrderTabs from './components/order-tabs';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/shared/contexts/ToastContext';
import { useOrdersQuery } from '@/shared/apis/order/order-queries';
import { useCancelOrderMutation } from '@/shared/apis/order/order-mutations';
import { mapOrderToUI } from '@/shared/utils/map-order-to-ui';
import { ORDER_STATUS } from './constants/order';

const formatDateLine = (
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

export default function OrderHistoryPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<OrderTabKey>('delivery');

  const { data, isFetching } = useOrdersQuery();
  const { mutate: cancelOrder } = useCancelOrderMutation();
  const { showToast } = useToast();

  const list: OrderItem[] = useMemo(() => {
    const orders = data?.orders ?? [];
    return orders.filter((o) => o.orderType === tab).map(mapOrderToUI);
  }, [data?.orders, tab]);

  const onCancel = (id: string) => {
    cancelOrder(
      { orderId: id },
      {
        onSuccess: () => {
          showToast('주문이 취소되었습니다.', 'success');
        },
        onError: () => {
          showToast('주문 취소에 실패했습니다. 다시 시도해주세요.', 'error');
        },
      },
    );
  };

  const onReorder = (id: string) => {
    // TODO: 재주문 흐름 연결
    console.log('reorder', id);
  };

  return (
    <div className="scrollbar-hide h-dvh flex-col overflow-y-auto bg-white">
      <TopBar title="주문내역" showBack onBack={() => navigate(-1)} sticky />

      <OrderTabs
        tabs={ORDER_TABS}
        active={tab}
        onChange={setTab}
        topOffsetRem={4.4}
      />

      <main className="flex-col gap-[2rem] px-[2rem] py-[1.6rem]">
        {list.map((item) => (
          <section key={item.id} className="flex-col gap-[1.6rem]">
            <p className="caption1 text-gray-400">
              {formatDateLine(item.orderedAt, item.status, item.method)}
            </p>
            <OrderCard item={item} onCancel={onCancel} onReorder={onReorder} />
          </section>
        ))}

        {!isFetching && list.length === 0 && (
          <div className="py-[6rem]">
            <EmptyRecommend
              title="주문 내역이 없어요"
              subtitle="상품을 주문하여 음식물류 폐기물 절약에 참여하세요!"
            />
          </div>
        )}
      </main>
    </div>
  );
}

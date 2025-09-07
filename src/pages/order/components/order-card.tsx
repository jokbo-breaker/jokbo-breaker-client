import Button from '@/shared/components/button/button';
import { formatKRW } from '@/shared/utils/format-krw';
import type { OrderItem } from '@/pages/order/types/order';
import { ORDER_STATUS } from '@/pages/order/constants/order';

interface Props {
  item: OrderItem;
  onCancel?: (id: string) => void;
  onReorder?: (id: string) => void;
}

const SavedBadge = ({ g }: { g: number }) => (
  <span className="caption1 bg-secondary text-primary flex w-[10.6rem] items-center rounded-[20px] px-[1.2rem] py-[0.5rem] whitespace-nowrap">
    {g.toLocaleString()}g 절약했어요
  </span>
);

export default function OrderCard({ item, onCancel, onReorder }: Props) {
  const total = item.salePrice * item.qty;
  const originalTotal = item.originalPrice * item.qty;

  const isOrderOver10Minutes = () => {
    if (!item.orderedAt) return false;
    try {
      const orderDate = new Date(item.orderedAt);
      const now = new Date();
      const koreaTimeOffset = 9 * 60;
      const koreaTime = new Date(now.getTime() + koreaTimeOffset * 60 * 1000);
      const diffInMinutes =
        (koreaTime.getTime() - orderDate.getTime()) / (1000 * 60);
      return diffInMinutes > 10;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const canCancel =
    (item.status === ORDER_STATUS.CANCELLABLE ||
      item.status === ORDER_STATUS.IN_PROGRESS) &&
    !isOrderOver10Minutes();
  const showReorder =
    item.status === ORDER_STATUS.DELIVERED ||
    item.status === ORDER_STATUS.SOLD_OUT;

  return (
    <article className="flex-col gap-[1.2rem] rounded-[12px] border border-gray-200 bg-white p-[1.6rem] shadow-[0_0.2rem_0.6rem_rgba(0,0,0,0.04)]">
      <div className="flex gap-[1rem]">
        <img
          src={item.image}
          alt=""
          className="h-[8rem] w-[8rem] rounded-[8px] object-cover"
          draggable={false}
        />
        <div className="min-w-0 flex-1">
          <p className="caption1 truncate text-black">{item.store}</p>
          <p className="body4 truncate text-black">{item.name}</p>

          <div className="flex flex-wrap items-center">
            <div className="flex flex-wrap items-center gap-[0.4rem]">
              <span className="caption1 text-primary">
                {item.discountRate}%
              </span>
              <span className="body3 text-black">
                {formatKRW(item.salePrice)}
              </span>
              <s className="caption2 text-gray-300">
                {formatKRW(item.originalPrice)}
              </s>
            </div>
            <span className="caption1 text-gray-700">・</span>
            <span className="caption2 text-gray-700">{item.qty}개</span>
          </div>
          {item.pickupPriceText && (
            <span className="caption1 rounded-[6px] bg-[#eaf2ff] px-[0.6rem] py-[0.2rem] text-[#2f6dff]">
              {item.pickupPriceText}
            </span>
          )}
        </div>
      </div>

      <div className="h-[0.1rem] w-full bg-gray-200/80" />

      <div className="w-full flex-col gap-[0.6rem]">
        <div className="flex items-center justify-between gap-[0.8rem]">
          <span className="body1 whitespace-nowrap text-black">
            총 결제금액
          </span>
          <div className="flex items-baseline gap-[0.6rem]">
            <span className="body1 text-black">{formatKRW(total)}</span>
            <s className="body3 text-gray-400">{formatKRW(originalTotal)}</s>
          </div>
        </div>
        <div className="w-full flex-col items-end justify-start">
          <SavedBadge g={item.savedGram} />
        </div>
      </div>

      <div>
        {showReorder ? (
          <Button
            variant="black"
            className="w-full"
            disabled={item.status === ORDER_STATUS.SOLD_OUT}
            onClick={() => onReorder?.(item.id)}
          >
            {item.status === ORDER_STATUS.SOLD_OUT
              ? '품절된 상품이에요'
              : '같은 상품 주문하기'}
          </Button>
        ) : (
          <Button
            variant={canCancel ? 'black' : 'white'}
            className="w-full"
            disabled={!canCancel}
            onClick={() => onCancel?.(item.id)}
          >
            {canCancel ? '주문 취소하기' : '주문 취소 불가 (10분 초과)'}
          </Button>
        )}
      </div>
    </article>
  );
}

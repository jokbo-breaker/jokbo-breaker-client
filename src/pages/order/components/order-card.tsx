import Button from '@/shared/components/button/button';
import { formatKRW } from '@/shared/utils/format-krw';
import type { OrderItem } from '../types/order';
import { ORDER_STATUS } from '../constants/order';

interface Props {
  item: OrderItem;
  onCancel?: (id: string) => void;
  onReorder?: (id: string) => void;
}

const SavedBadge = ({ g }: { g: number }) => (
  <span className="caption1 inline-flex items-center rounded-[999px] bg-[#ffe7e4] px-[1.2rem] py-[0.6rem] text-[#ff6a6a]">
    {g.toLocaleString()}g 절약했어요
  </span>
);

export default function OrderCard({ item, onCancel, onReorder }: Props) {
  const total = item.salePrice * item.qty;
  const originalTotal = item.originalPrice * item.qty;

  const canCancel =
    item.status === ORDER_STATUS.CANCELLABLE ||
    item.status === ORDER_STATUS.IN_PROGRESS;
  const showReorder =
    item.status === ORDER_STATUS.DELIVERED ||
    item.status === ORDER_STATUS.SOLD_OUT;
  const disabledMsg =
    item.status === ORDER_STATUS.SOLD_OUT
      ? '품절된 상품이에요'
      : '주문 취소하기';

  return (
    <article className="rounded-[12px] border border-gray-200 bg-white p-[1.6rem] shadow-[0_0.2rem_0.6rem_rgba(0,0,0,0.04)]">
      {/* 상단: 썸네일 + 텍스트 */}
      <div className="flex gap-[1.2rem]">
        <img
          src={item.image}
          alt=""
          className="h-[7.2rem] w-[7.2rem] rounded-[8px] object-cover"
          draggable={false}
        />
        <div className="min-w-0 flex-1">
          <p className="body3 truncate text-gray-500">{item.store}</p>
          <p className="body2 truncate text-black">{item.name}</p>

          <div className="mt-[0.6rem] flex flex-wrap items-center gap-x-[0.8rem] gap-y-[0.4rem]">
            <span className="body4 text-[#ff6a6a]">{item.discountRate}%</span>
            <span className="head4 text-black">
              {formatKRW(item.salePrice)}
            </span>
            <s className="caption1 text-gray-400">
              {formatKRW(item.originalPrice)}
            </s>
            <span className="caption1 text-gray-400">· {item.qty}개</span>
          </div>

          {item.pickupPriceText && (
            <div className="mt-[0.4rem]">
              <span className="caption1 rounded-[6px] bg-[#eaf2ff] px-[0.6rem] py-[0.2rem] text-[#2f6dff]">
                {item.pickupPriceText}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 구분선 */}
      <div className="my-[1.2rem] h-[0.1rem] w-full bg-gray-200/80" />

      {/* 총 결제금액 + 절약 배지 */}
      <div className="flex items-end justify-between gap-[1.2rem]">
        <div className="flex items-end gap-[0.8rem]">
          <span className="body2 text-black">총 결제금액</span>
          <div className="flex items-baseline gap-[0.6rem]">
            <span className="head3 text-black">{formatKRW(total)}</span>
            <s className="caption1 text-gray-400">{formatKRW(originalTotal)}</s>
          </div>
        </div>
        <SavedBadge g={item.savedGram} />
      </div>

      {/* 하단 버튼 */}
      <div className="mt-[1.2rem]">
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
            variant="black"
            className="w-full"
            disabled={!canCancel}
            onClick={() => onCancel?.(item.id)}
          >
            {canCancel ? '주문 취소하기' : disabledMsg}
          </Button>
        )}
      </div>
    </article>
  );
}

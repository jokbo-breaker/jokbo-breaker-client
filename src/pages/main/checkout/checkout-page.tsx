import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TopBar from '@/shared/layouts/top-bar';
import ProductSummaryCard from '@/pages/main/checkout/components/product-summary-card';
import PayBar from '@/pages/main/checkout/components/pay-bar';
import QtyStepper from '@/pages/main/checkout/components/qty-stepper';
import { getUnitPrice } from '@/pages/main/checkout/utils/checkout';
import {
  DEFAULT_QTY,
  type OrderType,
  type PaymentMethod,
  PAYMENT_LABEL,
} from '@/pages/main/constants/checkout';
import { mockDeliveryProducts, mockPickupProducts } from '@/shared/mocks';
import { formatKRW } from '@/shared/utils/format-krw';
import RadioTileGroup from '@/shared/components/text-field/radio-tile-group';

export default function CheckoutPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = useMemo(() => {
    const all = [...mockDeliveryProducts, ...mockPickupProducts];
    return all.find((p) => p.id === id);
  }, [id]);

  if (!product) {
    return (
      <div className="p-[2rem]">
        <TopBar showBack onBack={() => navigate(-1)} />
        <p className="body3 pt-[2rem]">상품을 찾을 수 없습니다.</p>
      </div>
    );
  }

  const [qty, setQty] = useState<number>(DEFAULT_QTY);

  const [orderType, setOrderType] = useState<OrderType | ''>('');
  const [payment, setPayment] = useState<PaymentMethod | ''>('');

  const unit = orderType ? getUnitPrice(product, orderType) : product.price;
  const total = unit * qty;

  const teamDeliveryRight = product.teamDeliveryAfter
    ? `${product.teamDeliveryAfter} 이후에 출발합니다`
    : '팀배달 시간 미정';

  const ORDER_TYPE_OPTIONS = [
    { value: 'team' as const, label: '팀배달', right: teamDeliveryRight },
    {
      value: 'pickup' as const,
      label: '픽업',
      right: product.hours ? product.hours.replace('~', ' ~ ') : '영업 시간 내',
    },
  ];

  const PAYMENT_OPTIONS = [
    { value: 'card' as const, label: PAYMENT_LABEL.card },
    { value: 'cash' as const, label: PAYMENT_LABEL.cash },
  ];

  const canPay = !!orderType && !!payment;

  return (
    <div className="flex-col">
      <TopBar title="주문하기" showBack onBack={() => navigate(-1)} sticky />

      <main className="scrollbar-hide flex-1 overflow-y-auto px-[2rem] pb-[10rem]">
        <section className="flex-col gap-[1.6rem] pt-[2rem]">
          <h3 className="body1 text-black">상품 정보</h3>
          <ProductSummaryCard product={product} />
          <div className="flex-row-between">
            <div className="flex-col">
              <div className="flex-items-center gap-[0.4rem]">
                {product.discount > 0 && (
                  <span className="body1 text-primary">
                    {product.discount}%
                  </span>
                )}
                <span className="head3 font-bold">
                  {formatKRW(product.price)}원
                </span>
                {product.originalPrice && (
                  <span className="body2 text-gray-300 line-through">
                    {formatKRW(product.originalPrice)}원
                  </span>
                )}
              </div>

              {product.pickupPrice && (
                <div className="flex-items-center text-blue gap-[0.4rem]">
                  <span className="body2">픽업 시</span>
                  <span className="head3">
                    {formatKRW(product.pickupPrice)}원
                  </span>
                </div>
              )}
            </div>
            <QtyStepper value={qty} onChange={setQty} />
          </div>
        </section>

        <section className="flex-col gap-[1.2rem] pt-[3.2rem]">
          <h3 className="body1 text-black">주문 유형</h3>
          <RadioTileGroup
            name="orderType"
            value={orderType}
            onChange={(v) => setOrderType(v)}
            options={ORDER_TYPE_OPTIONS}
            rounded="rounded-[1.2rem]"
          />
          {orderType === 'team' && (
            <p className="caption1 text-primary mt-[0.8rem] px-[0.4rem]">
              *출발 시각에 맞추어 순차적으로 배달됩니다
            </p>
          )}
        </section>

        <section className="flex-col gap-[1.2rem] pt-[3.2rem]">
          <h3 className="body1 text-black">결제 방법</h3>
          <RadioTileGroup
            name="payment"
            value={payment}
            onChange={(v) => setPayment(v)}
            options={PAYMENT_OPTIONS}
            rounded="rounded-[1.2rem]"
          />
        </section>
      </main>

      <PayBar
        total={total}
        canPay={canPay}
        onPay={() => {
          if (!canPay) return;
          alert(`결제 완료: ${formatKRW(total)}원`);
          navigate(-1);
        }}
      />
    </div>
  );
}

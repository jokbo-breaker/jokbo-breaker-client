import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TopBar from '@/shared/layouts/top-bar';
import ProductSummaryCard from '@/pages/main/checkout/components/product-summary-card';
import PayBar from '@/pages/main/checkout/components/pay-bar';
import QtyStepper from '@/pages/main/checkout/components/qty-stepper';
import PaymentCompleteView from '@/pages/main/checkout/components/payment-complete-view';
import { getRemainingBadge } from '@/pages/main/checkout/utils/stock';
import {
  DEFAULT_QTY,
  type OrderType,
  type PaymentMethod,
  PAYMENT_LABEL,
} from '@/pages/main/constants/checkout';
import { formatKRW } from '@/shared/utils/format-krw';
import RadioTileGroup from '@/shared/components/text-field/radio-tile-group';
import { useMenuDetailQuery } from '@/shared/apis/discover/discover-queries';
import { useCreateOrderMutation } from '@/shared/apis/order/order-mutations';

const hhmm = (ts?: string | null) => {
  if (!ts) return '';
  const t = ts.split(' ')[1] || '';
  const [h = '00', m = '00'] = t.split(':');
  return `${h}:${m}`;
};

export default function CheckoutPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [stage, setStage] = useState<'form' | 'done'>('form');
  const [savedG, setSavedG] = useState(0);
  const [qty, setQty] = useState<number>(DEFAULT_QTY);
  const [orderType, setOrderType] = useState<OrderType | ''>(''); // 'team' | 'pickup'
  const [payment, setPayment] = useState<PaymentMethod | ''>(''); // 'card' | 'cash'

  const { data, isLoading, isError } = useMenuDetailQuery(id ?? '');

  const vm = useMemo(() => {
    if (!data) return null;
    const images = data.menuImageUrls?.length ? data.menuImageUrls : [''];

    return {
      id: data.menuId,
      image: images[0],
      images,
      store: data.storeName,
      name: data.menuName,
      discount: data.discountedPercentage ?? 0,
      price: data.discountedMenuPrice ?? 0,
      originalPrice: data.originalMenuPrice ?? 0,
      pickupPrice: data.pickupPrice ?? 0,
      stockLeft: data.stockLeft ?? null,
      pickupStart: data.pickUpStartTime,
      pickupEnd: data.pickUpEndTime,
      deliveryStart: data.deliveryStartTime,
      storeClose: data.storeCloseTime,
      isDeliveryAvailable: !!data.isDeliveryAvailable,
      gramPerUnit: data.gramPerUnit ?? 0,
      address: data.storeAddress ?? '',
      phone: data.storePhoneNumber ?? '',
    };
  }, [data]);

  const teamStart = useMemo(
    () => (vm ? hhmm(vm.deliveryStart || vm.pickupStart) : ''),
    [vm],
  );
  const teamDeliveryRight = useMemo(() => {
    if (!vm) return '';
    return vm.isDeliveryAvailable
      ? `${teamStart || '시간 미정'} 이후에 출발합니다`
      : '팀배달 미지원';
  }, [vm, teamStart]);

  const pickupRight = useMemo(() => {
    if (!vm) return '';
    const s = hhmm(vm.pickupStart);
    const e = hhmm(vm.pickupEnd);
    return s || e ? `${s} ~ ${e}` : '시간 미정';
  }, [vm]);

  const unit = useMemo(() => {
    if (!vm) return 0;
    if (orderType === 'team') return vm.price;
    if (orderType === 'pickup') return vm.pickupPrice || vm.price;
    return vm.price;
  }, [vm, orderType]);

  const total = unit * qty;

  const ORDER_TYPE_OPTIONS = [
    {
      value: 'team' as const,
      label: '팀배달 · 17-32분',
      right: teamDeliveryRight,
      below: (
        <p className="caption1 text-primary">
          *출발 시각에 맞추어 순차적으로 배달됩니다
        </p>
      ),
    },
    { value: 'pickup' as const, label: '픽업', right: pickupRight },
  ];
  const PAYMENT_OPTIONS = [
    { value: 'card' as const, label: PAYMENT_LABEL.card },
    { value: 'cash' as const, label: PAYMENT_LABEL.cash },
  ];
  const canPay = !!orderType && !!payment && !!vm && !isLoading && !isError;

  const { mutate, isPending } = useCreateOrderMutation();

  const SAVED_PER_ORDER_G = 34;
  const handlePay = () => {
    if (!canPay || !vm || !id) return;

    const apiOrderType = orderType === 'team' ? 'delivery' : 'pickup';
    const apiPayment = payment === 'cash' ? 'onsite' : 'card';

    mutate(
      {
        menuId: id,
        quantity: qty,
        orderType: apiOrderType,
        paymentMethod: apiPayment,
      },
      {
        onSuccess: () => {
          const g = orderType === 'team' ? SAVED_PER_ORDER_G * qty : 0;
          setSavedG(Math.max(0, Math.round(g)));
          setStage('done');
        },
      },
    );
  };

  return stage === 'done' && vm ? (
    <PaymentCompleteView
      savedG={savedG}
      remainingBadge={getRemainingBadge(vm.stockLeft)}
      onBack={() => setStage('form')}
      onPrimary={() => setStage('form')}
    />
  ) : (
    <div className="h-dvh flex-col">
      <TopBar title="주문하기" showBack onBack={() => navigate(-1)} sticky />

      <main className="scrollbar-hide flex-1 overflow-y-auto px-[2rem] pb-[1rem]">
        {isLoading && (
          <p className="body3 pt-[2rem] text-gray-500">
            상품 정보를 불러오는 중…
          </p>
        )}
        {isError && (
          <p className="body3 pt-[2rem] text-red-600">
            상품을 찾을 수 없습니다.
          </p>
        )}

        {vm && (
          <>
            <section className="pt>[2rem] flex-col gap-[1.6rem]">
              <h3 className="body1 text-black">상품 정보</h3>
              <ProductSummaryCard
                product={{
                  id: vm.id,
                  image: vm.image,
                  store: vm.store,
                  name: vm.name,
                  discount: vm.discount,
                  price: vm.price,
                  originalPrice: vm.originalPrice,
                  pickupPrice: vm.pickupPrice,
                  stockLeft: vm.stockLeft,
                  hours: '',
                  distanceKm: 0,
                }}
              />
              <div className="flex-row-between">
                <div className="flex-col">
                  <div className="flex-items-center gap-[0.4rem]">
                    {vm.discount > 0 && (
                      <span className="body1 text-primary">{vm.discount}%</span>
                    )}
                    <span className="head3 font-bold">
                      {formatKRW(vm.price)}원
                    </span>
                    {!!vm.originalPrice && (
                      <span className="body2 text-gray-300 line-through">
                        {formatKRW(vm.originalPrice)}원
                      </span>
                    )}
                  </div>

                  {!!vm.pickupPrice && (
                    <div className="flex-items-center text-blue gap-[0.4rem]">
                      <span className="body2">픽업 시</span>
                      <span className="head3">
                        {formatKRW(vm.pickupPrice)}원
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
                rounded="rounded-[4px]"
              />
            </section>

            <section className="flex-col gap-[1.2rem] pt-[3.2rem]">
              <h3 className="body1 text-black">결제 방법</h3>
              <RadioTileGroup
                name="payment"
                value={payment}
                onChange={(v) => setPayment(v)}
                options={PAYMENT_OPTIONS}
                rounded="rounded-[4px]"
              />
            </section>
          </>
        )}
      </main>

      <PayBar total={total} canPay={canPay && !isPending} onPay={handlePay} />
    </div>
  );
}

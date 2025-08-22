import { useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TopBar from '@/shared/layouts/top-bar';
import BottomCTA from '@/pages/main/product-detail/components/bottom-cta';
import InfoRow from '@/pages/main/product-detail/components/info-row';
import Indicator from '@/pages/main/product-detail/components/indicator';
import { mockDeliveryProducts, mockPickupProducts } from '@/shared/mocks';
import Icon from '@/shared/components/icon';
import { formatKRW } from '@/shared/utils/format-krw';
import InfoTooltipButton from '@/pages/main/product-detail/components/info-tooltip';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = useMemo(() => {
    const all = [...mockDeliveryProducts, ...mockPickupProducts];
    return all.find((p) => p.id === id);
  }, [id]);

  if (!product) return <div className="p-6">상품을 찾을 수 없습니다.</div>;

  const {
    image,
    images = [image],
    store,
    name,
    discount,
    price,
    originalPrice,
    pickupPrice,
    address,
    hours,
    teamDeliveryAfter,
    phone,
    remainingBadge,
    description,
  } = product as typeof product & { images?: string[] };

  const [idx, setIdx] = useState(0);
  const startX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    const thresh = 30;
    if (dx <= -thresh && idx < images.length - 1) setIdx(idx + 1);
    else if (dx >= thresh && idx > 0) setIdx(idx - 1);
    startX.current = null;
  };

  return (
    <div className="h-dvh flex-col">
      <TopBar showBack onBack={() => navigate(-1)} sticky />

      <main className="scrollbar-hide flex-1 overflow-y-auto">
        <div
          className="relative overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(${-idx * 100}%)` }}
          >
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${name} ${i + 1}`}
                className="aspect-square w-full object-cover pt-[0.8rem]"
              />
            ))}
          </div>

          {images.length > 1 && (
            <div className="absolute inset-x-0 bottom-2 flex justify-center">
              <Indicator
                total={images.length}
                index={idx}
                onSelect={setIdx}
                className="bg-transparent"
              />
            </div>
          )}
        </div>

        <div className="flex-col gap-[2.4rem] px-[2rem] pt-[2rem]">
          <section className="space-y-2">
            <div className="flex-row-between">
              <div className="flex-col gap-[0.2rem]">
                <div className="body3 text-black">{store}</div>
                <h1 className="body2 text-black">{name}</h1>
              </div>
              <InfoTooltipButton
                text="구성이 궁금해요"
                side="bottom"
                align="start"
                content={
                  <div className="leading-[1.35]">
                    매장에서 지정한 g 수를 바탕으로 구성돼요
                    <br />
                    매장의 상황에 따라 조금씩 달라질 수 있어요
                  </div>
                }
              />
            </div>
            <div className="flex-col gap-[0.8rem]">
              <div className="flex-items-center gap-[0.4rem]">
                {discount > 0 && <span className="text-primary body1">{discount}%</span>}
                <span className="head3 font-bold">{formatKRW(price)}원</span>
                {originalPrice && (
                  <span className="body2 text-gray-300 line-through">
                    {formatKRW(originalPrice)}원
                  </span>
                )}
              </div>

              {pickupPrice && (
                <div className="text-blue flex-items-center gap-[0.4rem]">
                  <span className="body2">픽업 시</span>
                  <span className="head3">{formatKRW(pickupPrice)}원</span>
                </div>
              )}
            </div>
          </section>
          <section className="flex-col gap-[0.8rem]">
            {address && (
              <InfoRow
                icon="location"
                text={address}
                trailing={
                  <button
                    onClick={() => navigate('/map-view')}
                    className="text-primary flex-row-center cursor-pointer gap-[0.4rem]"
                  >
                    <Icon name="map" size={2.4} />
                    <span className="caption2">지도에서 보기</span>
                  </button>
                }
              />
            )}
            {hours && <InfoRow icon="clock" text={hours} />}
            {teamDeliveryAfter && <InfoRow icon="cart" text={teamDeliveryAfter} />}
            {phone && <InfoRow icon="phone" text={phone} />}
          </section>
          {teamDeliveryAfter && (
            <section>
              <div className="body4 rounded-[4px] bg-gray-50 p-[1.6rem] text-center text-black">
                {teamDeliveryAfter} 팀배달이 가능한 상품이에요
              </div>
            </section>
          )}
          <section className="flex-col gap-[1.2rem]">
            <h2 className="body1 text-black">상품 설명</h2>
            <p className="body4 text-black">{description}</p>
            <p className="caption1 text-primary pb-[2rem] break-words">
              *본 업소는 (서비스명)의 신선도 관리 기준을 준수합니다. 신선한 재료로 준비된 밀키트를
              안심하고 드셔보세요.
            </p>
          </section>
        </div>
        <BottomCTA
          label={`주문하기 · ${remainingBadge ?? '재고 확인'}`}
          onClick={() => navigate(`/checkout/${id}`)}
        />
      </main>
    </div>
  );
}

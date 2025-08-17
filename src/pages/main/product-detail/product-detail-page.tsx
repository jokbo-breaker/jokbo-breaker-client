import { useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TopBar from '@/shared/layouts/top-bar';
import BottomCTA from '@/pages/main/product-detail/components/bottom-cta';
import InfoRow from '@/pages/main/product-detail/components/info-row';
import Indicator from '@/pages/main/product-detail/components/indicator';
import { mockDeliveryProducts, mockPickupProducts } from '@/shared/mocks';
import { formatKRW } from '@/shared/utils/format-krw';

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
    address = '서울시 동작구 사당로 4 1-2층',
    hours = '00:00 ~ 18:00',
    teamDeliveryAfter = '오후 5시 15분 이후',
    phone = '010-1111-3333',
    remainingBadge = '1개 남음',
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
    <div className="bg-white">
      <TopBar
        title={name}
        showBack
        onBack={() => navigate(-1)}
        sticky
        className="border-b border-gray-100"
      />

      <div className="px-5 pt-4">
        <div
          className="relative overflow-hidden rounded-[12px]"
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
                className="aspect-[4/3] w-full shrink-0 object-cover"
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
      </div>

      <div className="space-y-16 px-5 pt-7 pb-28">
        <section className="space-y-2">
          <div className="text-caption3 text-gray-800">{store}</div>
          <h1 className="text-[20px] font-semibold">{name}</h1>

          <div className="mt-1 flex items-baseline gap-2">
            {discount > 0 && (
              <span className="text-primary text-[16px] font-bold">
                {discount}%
              </span>
            )}
            <span className="text-[20px] font-bold">{formatKRW(price)}</span>
            {originalPrice && (
              <span className="text-[16px] text-gray-300 line-through">
                {formatKRW(originalPrice)}
              </span>
            )}
          </div>

          {pickupPrice && (
            <div className="text-[16px] font-semibold text-blue-600">
              픽업 시 {formatKRW(pickupPrice)}
            </div>
          )}
        </section>

        <section className="space-y-4">
          <InfoRow
            icon="pin"
            text={address}
            trailing={<button className="text-red-500">지도에서 보기</button>}
          />
          <InfoRow icon="clock" text={hours} />
          <InfoRow icon="cart" text={teamDeliveryAfter} />
          <InfoRow icon="phone" text={phone} />
        </section>

        <section>
          <div className="rounded-[12px] bg-gray-50 px-4 py-4 text-center text-[14px] text-gray-700">
            18시 15분 이후 팀배달이 가능한 상품이에요
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-[16px] font-semibold">상품 설명</h2>
          <p className="text-[14px] leading-6 text-gray-800">
            레스토랑 루미에르의 스페셜 디너 밀키트로 특별한 미식을 만나보세요.
            신선한 재료로 정성껏 준비한 트러플 크림 파스타, 깊은 풍미의 허브그릴
            스테이크, 그리고 계절 재료를 활용한 시트러스 해산물 샐러드를 최대
            50% 할인된 가격에 제공합니다...
          </p>
          <p className="text-[12px] leading-5 text-red-600">
            *본 업소는 (서비스명)의 신선도 관리 기준을 준수합니다. 신선한 재료로
            준비된 밀키트를 안심하고 드셔보세요.
          </p>
        </section>
      </div>

      <BottomCTA
        label={`주문하기 · ${remainingBadge}`}
        onClick={() => alert('주문하기')}
      />
    </div>
  );
}

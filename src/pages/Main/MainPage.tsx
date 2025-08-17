import React, { useMemo, useState } from 'react';
import Icon from '@/shared/components/icon';
import Header, { type Mode } from '@/pages/Main/components/Header';
import ProductCard from '@/pages/Main/components/ProductCard';
import Section from '@/pages/Main/components/Section';
import HeroBanner from '@/pages/Main/components/HeroBanner';
import { mockDeliveryProducts, mockPickupProducts } from '@/shared/mocks';

export default function MainPage() {
  const [mode, setMode] = useState<Mode>('delivery');

  const current = useMemo(
    () => (mode === 'delivery' ? mockDeliveryProducts : mockPickupProducts),
    [mode],
  );

  return (
    <div className="h-full w-full bg-white pb-[2.8rem]">
      <Header mode={mode} onModeChange={setMode} />

      <div className="space-y-[2.4rem]">
        <div className="flex-col gap-[1.6rem] px-[2rem] pt-[1.6rem]">
          <div className="flex items-center gap-[0.4rem]">
            <Icon name="location" size={2.4} className="text-primary" />
            <span className="text-body3 text-black">서울시 동작구</span>
          </div>
          <HeroBanner />
        </div>

        <div className="flex-col gap-[2.8rem] pl-[2rem]">
          <Section title="내 주변 상점을 둘러보세요">
            {current.map((p) => (
              <ProductCard key={`s1-${p.id}`} product={p} variant="compact" />
            ))}
          </Section>

          <Section title="새로 입점했어요">
            {current.map((p) => (
              <ProductCard key={`s2-${p.id}`} product={p} variant="compact" />
            ))}
          </Section>

          <Section title="곧 품절이에요">
            {current.map((p) => (
              <ProductCard key={`s3-${p.id}`} product={p} variant="compact" />
            ))}
          </Section>

          <Section title="아침 드실 시간이에요">
            {current.map((p) => (
              <ProductCard key={`s4-${p.id}`} product={p} variant="compact" />
            ))}
          </Section>

          <Section title="달달한 게 땡길 때">
            {current.map((p) => (
              <ProductCard key={`s5-${p.id}`} product={p} variant="compact" />
            ))}
          </Section>

          <Section
            title={
              mode === 'delivery'
                ? '지금 바로 배달 받아보세요'
                : '지금 바로 픽업 가능해요'
            }
          >
            {current.map((p) => (
              <ProductCard key={`s6-${p.id}`} product={p} variant="compact" />
            ))}
          </Section>
        </div>
      </div>
    </div>
  );
}

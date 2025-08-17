import Icon from '@/shared/components/icon';
import Header from '@/pages/Main/components/Header';
import ProductCard from '@/pages/Main/components/ProductCard';
import Section from '@/pages/Main/components/Section';
import HeroBanner from '@/pages/Main/components/HeroBanner';
import { mockProducts as sample } from '@/shared/mocks';

export default function MainPage() {
  return (
    <div className="h-full w-full bg-white pb-[2.8rem]">
      <Header />
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
            {sample.map((p) => (
              <ProductCard key={p.id} product={p} variant="compact" />
            ))}
          </Section>

          <Section title="새로 입점했어요">
            {sample.map((p) => (
              <ProductCard key={`new-${p.id}`} product={p} variant="compact" />
            ))}
          </Section>

          <Section title="곧 품절이에요">
            {sample.map((p) => (
              <ProductCard key={p.id} product={p} variant="compact" />
            ))}
          </Section>

          <Section title="아침 드실 시간이에요">
            {sample.map((p) => (
              <ProductCard key={p.id} product={p} variant="compact" />
            ))}
          </Section>

          <Section title="달달한 게 땡길 때">
            {sample.map((p) => (
              <ProductCard key={p.id} product={p} variant="compact" />
            ))}
          </Section>

          <Section title="지금 바로 배달 받아보세요">
            {sample.map((p) => (
              <ProductCard key={p.id} product={p} variant="compact" />
            ))}
          </Section>
        </div>
      </div>
    </div>
  );
}

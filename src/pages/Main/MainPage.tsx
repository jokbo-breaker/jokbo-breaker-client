import Icon from '@/shared/components/icon';
import { Product } from '@/shared/types';
import Header from '@/pages/Main/components/Header';
import ProductCard from '@/pages/Main/components/ProductCard';
import Section from '@/pages/Main/components/Section';
import HeroBanner from '@/pages/Main/components/HeroBanner';

const sample: Product[] = [
  {
    id: '1',
    image:
      'https://images.unsplash.com/photo-1548940740-204726a19be3?q=80&w=1880&auto=format&fit=crop',
    store: '스타벅스 숭실대입구역점',
    name: '시크릿 런치 밀박스',
    discount: 20,
    price: 10800,
    originalPrice: 13500,
    remainingBadge: '9개 남음',
    hours: '00:00 ~ 17:00',
    distanceKm: 1.8,
  },
  {
    id: '2',
    image:
      'https://images.unsplash.com/photo-1548940740-204726a19be3?q=80&w=1880&auto=format&fit=crop',
    store: '케이크팜',
    name: '스페셜 디저트박스',
    discount: 20,
    price: 10800,
    originalPrice: 13500,
    remainingBadge: '9개 남음',
    hours: '00:00 ~ 17:00',
    distanceKm: 1.8,
  },
  {
    id: '3',
    image:
      'https://images.unsplash.com/photo-1548940740-204726a19be3?q=80&w=1880&auto=format&fit=crop',
    store: '스타벅스 숭실대입구역점',
    name: '시크릿 런치 밀박스',
    discount: 20,
    price: 10800,
    originalPrice: 13500,
    remainingBadge: '9개 남음',
    hours: '00:00 ~ 17:00',
    distanceKm: 1.8,
  },
];
export default function MainPage() {
  return (
    <div className="h-full w-full bg-white">
      <Header />
      <div className="px-[2rem]">
        <div className="flex-col gap-[1.6rem] pt-[1.6rem]">
          <div className="flex items-center gap-[0.4rem]">
            <Icon name="location" size={2.4} className="text-primary" />
            <span className="text-body3 text-black">서울시 동작구</span>
          </div>
          <HeroBanner />
        </div>
        <div className="flex-col gap-[2.8rem]">
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

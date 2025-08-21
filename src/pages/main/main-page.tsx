import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/shared/components/icon';
import Header, { type Mode } from '@/pages/main/components/main-header';
import ProductCard from '@/pages/main/components/product/product-card';
import Section from '@/pages/main/components/section-list';
import HeroBanner from '@/pages/main/components/banner';
import { mockDeliveryProducts, mockPickupProducts } from '@/shared/mocks';
import { SECTION_META, type SectionKey } from '@/shared/constants/sections';
import {
  MAIN_SECTIONS_ORDER,
  getSectionTitle,
  DEFAULT_LOCATION_LABEL,
} from '@/pages/main/constants/section';

export default function MainPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>('delivery');

  const data = useMemo(
    () => (mode === 'delivery' ? mockDeliveryProducts : mockPickupProducts),
    [mode],
  );

  const ordered: SectionKey[] = [
    'nearby',
    'new',
    'lastcall',
    'breakfast',
    'dessert',
    'now',
  ];

  const getTitle = (key: SectionKey) => {
    const t = SECTION_META[key].title;
    return typeof t === 'string' ? t : t[mode];
  };

  return (
    <div className="h-full w-full bg-white pb-[2rem]">
      <Header
        mode={mode}
        onModeChange={setMode}
        rightSlot={
          <>
            <button
              onClick={() => navigate('/menu')}
              aria-label="메뉴"
              className="cursor-pointer text-gray-700"
            >
              <Icon name="bag" width={2.4} />
            </button>
            <button
              onClick={() => navigate('/search')}
              aria-label="검색"
              className="cursor-pointer text-gray-700"
            >
              <Icon name="search" width={2.4} />
            </button>
            <button
              onClick={() => navigate('/mypage')}
              aria-label="프로필"
              className="cursor-pointer text-gray-200"
            >
              <Icon name="header-profile" width={2.4} />
            </button>
          </>
        }
      />

      <div className="space-y-[2.4rem]">
        <div className="flex-col gap-[1.6rem] px-[2rem] pt-[1.6rem]">
          <div className="flex items-center gap-[0.4rem]">
            <Icon name="location" size={2.4} className="text-primary" />
            <span className="body3 text-black">{DEFAULT_LOCATION_LABEL}</span>
          </div>
          <HeroBanner />
        </div>

        <div className="flex-col gap-[2.8rem] pl-[2rem]">
          {MAIN_SECTIONS_ORDER.map((key) => (
            <Section
              key={key}
              sectionKey={key}
              title={getSectionTitle(key, mode)}
              mode={mode}
              itemWidthClass="w-[16.5rem]"
            >
              {data.map((p) => (
                <ProductCard
                  key={`${key}-${p.id}`}
                  product={p}
                  variant="compact"
                />
              ))}
            </Section>
          ))}
        </div>
      </div>
    </div>
  );
}

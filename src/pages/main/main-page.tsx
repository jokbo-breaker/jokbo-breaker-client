import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/shared/components/icon';
import Header, { type Mode } from '@/pages/main/components/main-header';
import ProductCard, {
  ProductCardSkeleton,
} from '@/pages/main/components/product/product-card';
import Section from '@/pages/main/components/section-list';
import Banner from '@/pages/main/components/banner-contents';
import { ProfileModal } from './components/profile-modal';
import {
  SECTION_KEYS,
  SECTION_META,
  type SectionKey,
} from '@/shared/constants/sections';
import { DEFAULT_LOCATION_LABEL } from '@/pages/main/constants/section';

import { useDiscoverQuery } from '@/shared/apis/discover/discover-queries';
import { toProductCardModel } from '@/pages/main/checkout/utils/map-discover-to-product';
import type { DiscoverResponse } from '@/shared/apis/discover/discover';

const PLACE = '동작';
const DEFAULT_LAT = 37.563;
const DEFAULT_LNG = 126.978;

type ApiSectionKey = keyof Pick<
  DiscoverResponse,
  'nearBy' | 'brandNew' | 'lowInStock' | 'mealTime' | 'sweet' | 'pickUpRightNow'
>;

// UI 섹션키 → API 응답키 매핑
const UI_TO_API: Record<SectionKey, ApiSectionKey> = {
  nearby: 'nearBy',
  new: 'brandNew',
  lastcall: 'lowInStock',
  breakfast: 'mealTime',
  dessert: 'sweet',
  now: 'pickUpRightNow',
};

export default function MainPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>('pickup'); // 'delivery' | 'pickup'

  const { data, isLoading, isError } = useDiscoverQuery({
    type: mode,
    place: PLACE,
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  });

  const getTitle = (key: SectionKey) => {
    const t = SECTION_META[key].title;
    return typeof t === 'string' ? t : t[mode];
  };

  // 섹션별 리스트 (UI 키 기준으로 접근)
  const lists = useMemo(() => {
    const d = data ?? ({} as DiscoverResponse);
    return Object.fromEntries(
      SECTION_KEYS.map((uiKey) => {
        const apiKey = UI_TO_API[uiKey];
        return [uiKey, (d[apiKey] as unknown as Array<any>) ?? []];
      }),
    ) as Record<SectionKey, any[]>;
  }, [data]);

  const SKELETON_COUNT = 8;
  const skeletons = Array.from({ length: SKELETON_COUNT });

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
            <ProfileModal
              user={{ name: '닉네임', email: 'aaaa@gmail.com' }}
              onLogout={() => console.log('logout')}
            />
          </>
        }
      />

      <div className="space-y-[2.4rem]">
        <div className="flex-col gap-[1.6rem] pt-[1.6rem]">
          <div className="flex items-center gap-[0.4rem] px-[2rem]">
            <Icon name="location" size={2.4} className="text-primary" />
            <span className="body3 text-black">{DEFAULT_LOCATION_LABEL}</span>
          </div>
          <Banner />
        </div>

        <div className="flex-col gap-[2.8rem] pl-[2rem]">
          {isError && (
            <div className="px-[2rem] text-red-600">
              데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
            </div>
          )}

          {SECTION_KEYS.map((uiKey) => {
            const list = lists[uiKey] ?? [];
            return (
              <Section
                key={uiKey}
                sectionKey={uiKey}
                title={getTitle(uiKey)}
                mode={mode}
                itemWidthClass="w-[16.5rem]"
              >
                {isLoading
                  ? skeletons.map((_, i) => (
                      <ProductCardSkeleton
                        key={`s-${uiKey}-${i}`}
                        variant="compact"
                      />
                    ))
                  : list.map((item: any) => (
                      <ProductCard
                        key={`${uiKey}-${item.menuId}`}
                        product={toProductCardModel(item)}
                        variant="compact"
                      />
                    ))}
              </Section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

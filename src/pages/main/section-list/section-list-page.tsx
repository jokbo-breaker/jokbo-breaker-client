import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import {
  SECTION_META,
  SECTION_KEYS,
  type SectionKey,
} from '@/shared/constants/sections';
import ProductCard, {
  ProductCardSkeleton,
} from '@/pages/main/components/product/product-card';
import TopBar from '@/shared/layouts/top-bar';

import { useDiscoverQuery } from '@/shared/apis/discover/discover-queries';
import type { DiscoverResponse } from '@/shared/apis/discover/discover';
import { toProductCardModel } from '@/pages/main/checkout/utils/map-discover-to-product';

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

export default function SectionListPage() {
  const { section } = useParams<{ section: SectionKey }>();
  const [sp] = useSearchParams();
  const navigate = useNavigate();

  const mode = (sp.get('mode') ?? 'delivery') as 'delivery' | 'pickup';

  if (!section || !SECTION_KEYS.includes(section)) {
    return <div className="p-6">존재하지 않는 섹션입니다.</div>;
  }

  const rawTitle = SECTION_META[section].title;
  const title = typeof rawTitle === 'string' ? rawTitle : rawTitle[mode];

  // 데이터 요청
  const { data, isLoading, isError } = useDiscoverQuery({
    type: mode,
    place: PLACE,
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  });

  // 현재 섹션에 해당하는 리스트 추출
  const list = useMemo(() => {
    const apiKey = UI_TO_API[section];
    return (data?.[apiKey] ?? []) as DiscoverResponse[ApiSectionKey];
  }, [data, section]);

  return (
    <div className="pb-8">
      <TopBar title={title} showBack onBack={() => navigate(-1)} sticky />

      {isError && (
        <div className="px-[2rem] pt-[1rem] text-red-600">
          데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
        </div>
      )}

      <div className="flex-col gap-[2rem] px-[2rem] pt-[0.8rem]">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={`sk-${i}`} variant="wide" />
          ))
        ) : list.length > 0 ? (
          list.map((item) => (
            <ProductCard
              key={item.menuId}
              product={toProductCardModel(item)}
              variant="wide"
            />
          ))
        ) : (
          <div className="py-10 text-center text-gray-500">
            표시할 상품이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}

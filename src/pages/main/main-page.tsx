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
import { useMeQuery } from '@/shared/apis/auth/auth-queries';
import { useLogoutMutation } from '@/shared/apis/auth/auth-mutations';

const PLACE = '동작';
const DEFAULT_LAT = 37.563;
const DEFAULT_LNG = 126.978;

type ApiSectionKey = keyof Pick<
  DiscoverResponse,
  'nearBy' | 'brandNew' | 'lowInStock' | 'mealTime' | 'sweet' | 'pickUpRightNow'
>;

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
  const { data: meData } = useMeQuery();

  const { mutate: logout, isPending: logoutLoading } = useLogoutMutation();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        navigate('/login', { replace: true });
        setTimeout(() => window.location.reload(), 0);
      },
    });
  };

  const profileUser = {
    name: meData?.user?.name ?? '게스트',
    email: meData?.user?.email ?? '로그인 전',
  };

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

  const lists = useMemo(() => {
    const d = data ?? ({} as DiscoverResponse);
    return Object.fromEntries(
      SECTION_KEYS.map((uiKey) => {
        const apiKey = UI_TO_API[uiKey];
        return [uiKey, (d[apiKey] as unknown as Array<any>) ?? []];
      }),
    ) as Record<SectionKey, any[]>;
  }, [data]);

  const keysToRender = useMemo(
    () =>
      isLoading
        ? [...SECTION_KEYS]
        : SECTION_KEYS.filter((k) => (lists[k]?.length ?? 0) > 0),
    [isLoading, lists],
  );

  const MAX_PER_SECTION = 3;
  const SKELETON_COUNT = 3;

  return (
    <div className="h-full w-full bg-white pb-[2rem]">
      <Header
        mode={mode}
        onModeChange={setMode}
        rightSlot={
          <>
            <button
              onClick={() => navigate('/orders')}
              aria-label="주문내역"
              className="cursor-pointer text-gray-700"
            >
              <Icon name="order" width={2.4} />
            </button>
            <button
              onClick={() => navigate('/search')}
              aria-label="검색"
              className="cursor-pointer text-gray-700"
            >
              <Icon name="search" width={2.4} />
            </button>
            <ProfileModal user={profileUser} onLogout={handleLogout} />
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

          {keysToRender.map((uiKey) => {
            const fullList = lists[uiKey] ?? [];
            const list = fullList.slice(0, MAX_PER_SECTION);

            return (
              <Section
                key={uiKey}
                sectionKey={uiKey}
                title={getTitle(uiKey)}
                mode={mode}
                itemWidthClass="w-[16.5rem]"
              >
                {isLoading
                  ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
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

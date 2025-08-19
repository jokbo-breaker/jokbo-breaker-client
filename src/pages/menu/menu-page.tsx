import { useMemo, useState } from 'react';
import { Container as MapDiv, NaverMap, Marker } from 'react-naver-maps';
import { useGeolocation } from '@/shared/hooks/use-geolocation';
import { useNavigate } from 'react-router-dom';
import Icon from '@/shared/components/icon';
import { renderToString } from 'react-dom/server';
import SearchTextField from '@/shared/components/text-field/search-text-field';
import BottomSheet from '@/shared/components/bottom-sheet';
import Tag from '@/shared/components/chips/tag';
import FilterChip from '@/shared/components/chips/filter-chip';

import ProductCard from '@/pages/main/components/product/product-card';
import { mockPickupProducts } from '@/shared/mocks';

export default function MenuPage() {
  const { loc, loading, error, request } = useGeolocation({
    immediate: true,
    watch: false,
    options: { enableHighAccuracy: true, timeout: 8000, maximumAge: 30_000 },
  });

  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState('');

  const soongsilBase = { lat: 37.4963, lng: 126.9575 };
  const center = loc ?? soongsilBase;

  const navigate = useNavigate();

  const testRestaurants = [
    {
      id: 1,
      name: '정문돈까스',
      lat: soongsilBase.lat + 0.0018,
      lng: soongsilBase.lng - 0.0012,
    },
    {
      id: 2,
      name: '상도라멘',
      lat: soongsilBase.lat + 0.001,
      lng: soongsilBase.lng + 0.001,
    },
    {
      id: 3,
      name: '숭실카레집',
      lat: soongsilBase.lat - 0.0012,
      lng: soongsilBase.lng + 0.0008,
    },
    {
      id: 4,
      name: '상도불백',
      lat: soongsilBase.lat - 0.0018,
      lng: soongsilBase.lng - 0.001,
    },
    {
      id: 5,
      name: '홍콩반점 숭실',
      lat: soongsilBase.lat + 0.0006,
      lng: soongsilBase.lng - 0.0015,
    },
    {
      id: 6,
      name: '밥버거 숭실',
      lat: soongsilBase.lat - 0.0005,
      lng: soongsilBase.lng + 0.0016,
    },
  ];

  const myMarkerIcon = useMemo(
    () => ({
      content: renderToString(
        <div style={{ transform: 'translate(-50%, -100%)' }}>
          <Icon
            name="location"
            size={2.4}
            className="text-primary"
            ariaHidden
          />
        </div>,
      ),
    }),
    [],
  );

  const restaurantMarkerIcon = useMemo(
    () => ({
      content: renderToString(
        <div style={{ transform: 'translate(-50%, -100%)' }}>
          <Icon
            name="location"
            size={2.4}
            className="text-primary"
            ariaHidden
          />
        </div>,
      ),
    }),
    [],
  );

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden">
      <div className="absolute top-0 right-0 left-0 z-[var(--z-header)]">
        <SearchTextField
          value={query}
          onChange={setQuery}
          onSubmit={(v) => setSubmitted(v)}
          onBack={() => navigate(-1)}
          onClear={() => setQuery('')}
          autoFocus={false}
          showBackButton
          showSearchIcon
          className="bg-white"
          placeholder="검색어를 입력해주세요."
        />

        <div className="mt-[1.2rem] flex items-center gap-[0.8rem] px-[2rem]">
          <Tag selected>인기순</Tag>
          <FilterChip />
        </div>
      </div>

      <MapDiv
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
        fallback={
          <div className="grid h-full place-items-center">지도 로딩 중…</div>
        }
      >
        <NaverMap defaultCenter={soongsilBase} center={center} defaultZoom={16}>
          <Marker position={center} icon={myMarkerIcon as any} />
          {testRestaurants.map((p) => (
            <Marker
              key={p.id}
              position={{ lat: p.lat, lng: p.lng }}
              icon={restaurantMarkerIcon as any}
            />
          ))}
        </NaverMap>
      </MapDiv>

      <BottomSheet height={80} minHeight={82}>
        <section className="mx-auto w-full">
          <div className="scrollbar-hide flex-col gap-[2.0rem]">
            {mockPickupProducts.slice(0, 10).map((p) => (
              <ProductCard key={p.id} product={p} variant="wide" />
            ))}
          </div>
        </section>
      </BottomSheet>

      {error && (
        <div className="absolute top-[1.2rem] left-1/2 -translate-x-1/2 rounded bg-white/90 px-[1.2rem] py-[0.8rem] shadow">
          위치 권한/가져오기 실패: {error.message}
          <button
            className="ml-[0.8rem] underline"
            onClick={request}
            disabled={loading}
          >
            다시 시도
          </button>
        </div>
      )}
    </div>
  );
}

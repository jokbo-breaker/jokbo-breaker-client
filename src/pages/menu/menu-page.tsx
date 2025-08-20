import { useMemo, useState, useRef, useEffect } from 'react';
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
import type { Product } from '@/shared/types';
import { mockPickupProducts, testRestaurants } from '@/shared/mocks';

export default function MenuPage() {
  const { loc, loading, error, request } = useGeolocation({
    immediate: true,
    watch: false,
    options: { enableHighAccuracy: true, timeout: 8000, maximumAge: 30_000 },
  });

  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [preview, setPreview] = useState<Product | null>(null);

  const [mode, setMode] = useState<'map' | 'list'>('map');

  const soongsilBase = { lat: 37.4963, lng: 126.9575 };
  const center = loc ?? soongsilBase;
  const mapRef = useRef<any>(null);
  const navigate = useNavigate();

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

  const getMapInstance = (ref: any) => ref?.instance ?? ref?.map ?? ref ?? null;
  const [mapInstance, setMapInstance] = useState<any>(null);

  const handleMapRef = (node: any) => {
    mapRef.current = node;
    const inst = getMapInstance(node);
    if (inst) setMapInstance(inst);
  };

  useEffect(() => {
    const n = (window as any).naver;
    if (!n?.maps || !mapInstance) return;

    const off: any[] = [];
    off.push(
      n.maps.Event.addListener(mapInstance, 'click', () => setPreview(null)),
    );
    off.push(
      n.maps.Event.addListener(mapInstance, 'tap', () => setPreview(null)),
    );

    return () => off.forEach((h) => n.maps.Event.removeListener(h));
  }, [mapInstance]);

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
  function SortFilterRow({ className = '' }: { className?: string }) {
    return (
      <div
        className={`mt-[1.2rem] flex items-center gap-[0.8rem] px-[2rem] ${className}`}
      >
        <Tag selected>인기순</Tag>
        <FilterChip />
      </div>
    );
  }
  const Header = (
    <div className="absolute top-0 right-0 left-0 z-[var(--z-header)]">
      <SearchTextField
        value={query}
        onChange={setQuery}
        onSubmit={(v) => setSubmitted(v)}
        onBack={() => (mode === 'list' ? setMode('map') : navigate(-1))}
        onClear={() => setQuery('')}
        autoFocus={false}
        showBackButton
        showSearchIcon
        className="bg-white"
        placeholder="검색어를 입력해주세요."
      />
      {mode === 'map' && <SortFilterRow />}
    </div>
  );

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden">
      <div>{Header}</div>

      {mode === 'map' ? (
        <>
          <MapDiv
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
            }}
            fallback={
              <div className="grid h-full place-items-center">
                지도 로딩 중…
              </div>
            }
          >
            <NaverMap
              defaultCenter={soongsilBase}
              center={center}
              defaultZoom={16}
              ref={handleMapRef}
            >
              <Marker position={center} icon={myMarkerIcon as any} />
              {testRestaurants.map((p, idx) => (
                <Marker
                  key={p.id}
                  position={{ lat: p.lat, lng: p.lng }}
                  icon={restaurantMarkerIcon as any}
                  onClick={() =>
                    setPreview(
                      mockPickupProducts[idx % mockPickupProducts.length],
                    )
                  }
                />
              ))}
            </NaverMap>
          </MapDiv>

          {preview && (
            <div
              className="absolute right-0 bottom-[3rem] z-[var(--z-bottom-nav)]"
              onClick={() => setPreview(null)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="pointer-events-auto mx-[2rem] mt-auto mb-[8rem] rounded-[1.2rem] bg-white px-[1rem] shadow-[0_0.4rem_2.0rem_rgba(0,0,0,0.16)] ring-1 ring-gray-200"
              >
                <div className="p-[1.2rem]">
                  <ProductCard product={preview} variant="wide" />
                </div>
              </div>
            </div>
          )}

          {!preview && (
            <BottomSheet
              maxHeightRem={80}
              minHeightRem={10}
              onOverExpand={() => setMode('list')}
            >
              <section className="mx-auto w-full">
                <div className="flex-col gap-[2.0rem]">
                  {mockPickupProducts.slice(0, 10).map((p) => (
                    <ProductCard key={p.id} product={p} variant="wide" />
                  ))}
                </div>
              </section>
            </BottomSheet>
          )}
        </>
      ) : (
        <div className="scrollbar-hide relative h-[100dvh] w-full flex-col gap-[1.2rem] overflow-y-auto pt-[5rem] pb-[6rem]">
          <SortFilterRow />
          <div className="px-[2rem] pb-[4rem]">
            <div className="flex-col gap-[2.0rem]">
              {mockPickupProducts.slice(0, 20).map((p) => (
                <ProductCard key={p.id} product={p} variant="wide" />
              ))}
            </div>
          </div>
        </div>
      )}

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

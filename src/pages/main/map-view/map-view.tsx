import { useMemo, useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { Product } from '@/shared/types';
import { hasActiveFilters } from '@/pages/menu/utils/has-active-filters';
import {
  FILTER_DEFAULT,
  type FilterState,
} from '@/pages/menu/constants/filter';
import { SortKey } from '@/pages/menu/constants/sort';

import { useGeolocation } from '@/shared/hooks/use-geolocation';
import BottomSheet from '@/shared/components/bottom-sheet';
import EmptyRecommend from '@/pages/recommend/components/empty-recommend';
import ProductCard from '@/pages/main/components/product/product-card';
import FilterModal from '@/pages/menu/components/filter-modal';
import MenuHeader from '@/pages/menu/components/menu-header';
import MapSection from '@/pages/menu/components/map-section';
import PreviewCard from '@/pages/menu/components/preview-card';
import SortModal from '@/pages/menu/components/sort-modal';
import ListSection from '@/pages/menu/components/list-section';

import { SOONGSIL_BASE, SHEET } from '@/pages/menu/constants/menu';
import { useDiscoverFilterQuery } from '@/shared/apis/discover/discover-queries';
import { toProductCardModel } from '@/pages/main/checkout/utils/map-discover-to-product';

const mapSortKeyToApi = (
  k: SortKey,
): '인기순' | '가격 낮은 순' | '가격 높은 순' | '거리순' => {
  switch (k) {
    case 'popular':
      return '인기순';
    case 'priceAsc':
      return '가격 낮은 순';
    case 'priceDesc':
      return '가격 높은 순';
    case 'distance':
      return '거리순';
    default:
      return '인기순';
  }
};
type ApiFoodType = '식사' | '디저트';
type ApiDeliveryMethod = '배달' | '픽업' | '지금 바로' | '나중에';

const toApiFoodType = (v: any): ApiFoodType | null => {
  if (v === 'meal') return '식사';
  if (v === 'dessert') return '디저트';
  if (v === '식사' || v === '디저트') return v;
  return null;
};

const toApiDeliveryMethod = (v: any): ApiDeliveryMethod | null => {
  if (v === 'team' || v === 'delivery') return '배달';
  if (v === 'pickup') return '픽업';
  if (v === 'now') return '지금 바로';
  if (v === 'later') return '나중에';
  if (v === '배달' || v === '픽업' || v === '지금 바로' || v === '나중에')
    return v;
  return null;
};

const pickCategory = (filter: any): string | null => {
  if (typeof filter?.category === 'string' && filter.category.trim())
    return filter.category;
  if (Array.isArray(filter?.categories) && filter.categories[0])
    return String(filter.categories[0]);
  if (typeof filter?.categoryInput === 'string' && filter.categoryInput.trim())
    return filter.categoryInput;
  return null;
};

const pickPriceRange = (filter: any): string | null => {
  if (typeof filter?.priceRange === 'string') return filter.priceRange;
  if (typeof filter?.price === 'string') return filter.price;
  const r = filter?.price;
  if (r && (typeof r.min === 'number' || typeof r.max === 'number')) {
    const min = typeof r.min === 'number' ? r.min : 0;
    const max = typeof r.max === 'number' ? r.max : Infinity;
    if (!isFinite(max)) return `${min.toLocaleString()}원 이상`;
    if (min === 0) return `${max.toLocaleString()}원 이하`;
    return `${min.toLocaleString()} ~ ${max.toLocaleString()}원`;
  }
  return null;
};

const buildFilterParams = (
  lat: number,
  lng: number,
  submitted: string,
  filter: unknown,
  sort: SortKey,
) => {
  const f: any = filter;
  return {
    lat,
    lng,
    query: submitted || null,
    category: pickCategory(f),
    foodType: toApiFoodType(f?.foodType),
    priceRange: pickPriceRange(f),
    deliveryMethod: toApiDeliveryMethod(f?.deliveryMethod ?? f?.method),
    sortBy: mapSortKeyToApi(sort),
  };
};

export default function MenuPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { loc } = useGeolocation({
    immediate: true,
    watch: false,
    options: { enableHighAccuracy: true, timeout: 8000, maximumAge: 30_000 },
  });

  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [preview, setPreview] = useState<Product | null>(null);
  const [mode, setMode] = useState<'map' | 'list'>('map');
  const [sort, setSort] = useState<SortKey>('popular');
  const [sortOpen, setSortOpen] = useState(false);
  const [filter, setFilter] = useState<FilterState>(FILTER_DEFAULT);
  const [filterOpen, setFilterOpen] = useState(false);
  const [includeSoldOut, setIncludeSoldOut] = useState(false);
  const [focusedStoreName, setFocusedStoreName] = useState<string | null>(
    location.state?.storeName || null,
  );

  // focusedStoreName 상태 변경 로깅
  useEffect(() => {
    console.log('focusedStoreName changed to:', focusedStoreName);
  }, [focusedStoreName]);
  const filterSelected = hasActiveFilters(filter);

  const center = loc ?? SOONGSIL_BASE;
  const lat = center.lat;
  const lng = center.lng;

  const { data, isLoading, isError } = useDiscoverFilterQuery(
    buildFilterParams(lat, lng, submitted, filter, sort),
  );

  // location.state가 변경될 때 focusedStoreName 업데이트
  useEffect(() => {
    console.log('location.state:', location.state);
    if (location.state?.storeName) {
      console.log('Setting focusedStoreName to:', location.state.storeName);
      setFocusedStoreName(location.state.storeName);
      // 스토어가 포커스되면 자동으로 첫 번째 상품을 프리뷰로 설정
      if (data?.results && data.results.length > 0) {
        const firstProduct = toProductCardModel(data.results[0]);
        setPreview(firstProduct);
      }
    }
  }, [location.state?.storeName, data?.results]);

  const allProducts: Product[] = useMemo(() => {
    const rows = data?.results ?? [];
    const mapped = rows.map(toProductCardModel);
    let filtered = includeSoldOut
      ? mapped
      : mapped.filter((p) => (p.stockLeft ?? 0) > 0);

    // 스토어 이름으로 필터링
    if (focusedStoreName !== null) {
      filtered = filtered.filter((p) => p.store === focusedStoreName);
    }

    return filtered;
  }, [data?.results, includeSoldOut, focusedStoreName]);

  const isEmpty = !isLoading && !isError && allProducts.length === 0;
  // === API 결과 -> 지도 마커 변환 ===
  type RestaurantCandidate = {
    id: number;
    name: string;
    lat: number;
    lng: number;
  };

  const markers = useMemo<RestaurantCandidate[]>(() => {
    const rows: any[] = data?.results ?? [];
    const seen = new Set<string>();
    let seq = 1;

    const toNum = (v: any): number | null => {
      if (typeof v === 'number' && Number.isFinite(v)) return v;
      const n = Number(v);
      return Number.isFinite(n) ? n : null;
    };

    const pickNum = (...vals: any[]) => {
      for (const v of vals) {
        const n = toNum(v);
        if (n !== null) return n;
      }
      return null;
    };

    const out: RestaurantCandidate[] = [];

    for (const row of rows) {
      const store = row.store ?? {};

      const lat = pickNum(
        row.storeLat,
        row.lat,
        store.lat,
        store.latitude,
        store?.location?.lat,
        row.store?.location?.lat,
      );
      const lng = pickNum(
        row.storeLng,
        row.lng,
        store.lng,
        store.longitude,
        store?.location?.lng,
        row.store?.location?.lng,
      );
      if (lat === null || lng === null) continue;

      const name =
        row.storeName ??
        store.name ??
        row.store?.storeName ??
        row.name ??
        '매장';

      const key = `${row.storeId ?? store.id ?? row.id ?? name}|${lat}|${lng}`;
      if (seen.has(key)) continue;
      seen.add(key);

      const id =
        pickNum(row.storeId, store.id, row.store?.storeId, row.id) ??
        toNum(row.storeCode) ??
        toNum(row.menuId) ??
        seq++;

      out.push({ id, name, lat, lng });
    }

    // focusedStoreName이 있을 때 해당 스토어만 필터링
    if (focusedStoreName !== null) {
      // focusedStoreName과 일치하는 상품들의 위치만 마커로 표시
      const focusedStoreProducts = rows.filter(
        (row) => row.storeName === focusedStoreName,
      );
      const focusedLocations = new Set<string>();

      focusedStoreProducts.forEach((row) => {
        const lat = pickNum(
          row.storeLat,
          row.lat,
          row.store?.lat,
          row.store?.latitude,
          row.store?.location?.lat,
          row.store?.location?.lat,
        );
        const lng = pickNum(
          row.storeLng,
          row.lng,
          row.store?.lng,
          row.store?.longitude,
          row.store?.location?.lng,
          row.store?.location?.lng,
        );

        if (lat !== null && lng !== null) {
          focusedLocations.add(`${lat},${lng}`);
        }
      });

      return out.filter((marker) =>
        focusedLocations.has(`${marker.lat},${marker.lng}`),
      );
    }

    return out;
  }, [data?.results, focusedStoreName]);

  const handleSearchSubmit = useCallback(
    (v: string) => {
      const trimmedQuery = v.trim();
      if (trimmedQuery) {
        // 검색어가 있을 때 menu-page로 이동
        navigate('/menu', { state: { searchQuery: trimmedQuery } });
      } else {
        // 검색어가 없을 때는 기존 로직 유지
        setQuery(v);
        setSubmitted(v);
      }
    },
    [navigate],
  );

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden">
      <MenuHeader
        mode={mode}
        query={query}
        setQuery={setQuery}
        onSubmit={handleSearchSubmit}
        onBack={() => (mode === 'list' ? setMode('map') : navigate(-1))}
        onClear={() => {
          setQuery('');
          setSubmitted('');
        }}
        sort={sort}
        onOpenSort={() => setSortOpen(true)}
        onOpenFilter={() => setFilterOpen(true)}
        filterSelected={filterSelected}
        includeSoldOut={includeSoldOut}
        onToggleSoldOut={() => setIncludeSoldOut((v) => !v)}
      />

      {mode === 'map' ? (
        <>
          <MapSection
            center={center}
            defaultCenter={SOONGSIL_BASE}
            restaurants={markers}
            products={allProducts}
            focusedStoreId={focusedStoreName}
            onPickPreview={(p) => setPreview(p)}
            onMapTap={() => {
              setPreview(null);
              setFocusedStoreName(null); // 지도 탭 시 스토어 포커스 해제
            }}
            onStoreFocus={(storeName: string) => setFocusedStoreName(storeName)}
          />

          {preview ? (
            <PreviewCard product={preview} onClose={() => setPreview(null)} />
          ) : (
            <BottomSheet
              initialVisibleRem={SHEET.maxHeightRem}
              maxHeightRem={SHEET.maxHeightRem}
              minHeightRem={SHEET.minHeightRem}
              onOverExpand={() => setMode('list')}
            >
              <section className="mx-auto w-full">
                {isEmpty ? (
                  <div className="flex-col-center h-full">
                    <EmptyRecommend
                      title="조건에 맞는 메뉴가 없어요"
                      subtitle="검색어나 필터를 조정해 보세요!"
                    />
                  </div>
                ) : (
                  <div className="flex-col gap-[2.0rem]">
                    {(isLoading ? [] : allProducts).slice(0, 10).map((p) => (
                      <div key={p.id}>
                        <ProductCard product={p} variant="wide" />
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </BottomSheet>
          )}
        </>
      ) : isEmpty ? (
        <div className="flex-col-center h-full">
          <EmptyRecommend
            title="조건에 맞는 메뉴가 없어요"
            subtitle="검색어나 필터를 조정해 보세요!"
          />
        </div>
      ) : (
        <ListSection
          products={(isLoading ? [] : allProducts).slice(0, 20)}
          sort={sort}
          onOpenSort={() => setSortOpen(true)}
          onOpenFilter={() => setFilterOpen(true)}
          filterSelected={filterSelected}
          includeSoldOut={includeSoldOut}
          onToggleSoldOut={() => setIncludeSoldOut((v) => !v)}
        />
      )}

      <SortModal
        open={sortOpen}
        value={sort}
        onChange={setSort}
        onClose={() => setSortOpen(false)}
      />

      <FilterModal
        open={filterOpen}
        value={filter}
        onApply={(next) => setFilter(next)}
        onClose={() => setFilterOpen(false)}
      />
    </div>
  );
}

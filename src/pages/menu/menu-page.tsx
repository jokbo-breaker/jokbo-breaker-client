import { useMemo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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
import FilterModal from './components/filter-modal';
import MenuHeader from '@/pages/menu/components/menu-header';
import MapSection from '@/pages/menu/components/map-section';
import PreviewCard from '@/pages/menu/components/preview-card';
import SortModal from '@/pages/menu/components/sort-modal';
import ListSection from '@/pages/menu/components/list-section';

import { testRestaurants } from '@/shared/mocks';
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
  const filterSelected = hasActiveFilters(filter);

  const center = loc ?? SOONGSIL_BASE;
  const lat = center.lat;
  const lng = center.lng;

  const { data, isLoading, isError } = useDiscoverFilterQuery(
    buildFilterParams(lat, lng, submitted, filter, sort),
  );

  const allProducts: Product[] = useMemo(() => {
    const rows = data?.results ?? [];
    const mapped = rows.map(toProductCardModel);
    return includeSoldOut
      ? mapped
      : mapped.filter((p) => (p.stockLeft ?? 0) > 0);
  }, [data?.results, includeSoldOut]);

  const isEmpty = !isLoading && !isError && allProducts.length === 0;

  const handleSearchSubmit = useCallback(
    (v: string) => {
      setQuery(v);
      setSubmitted(v);
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
            restaurants={testRestaurants}
            products={allProducts}
            onPickPreview={(p) => setPreview(p)}
            onMapTap={() => setPreview(null)}
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

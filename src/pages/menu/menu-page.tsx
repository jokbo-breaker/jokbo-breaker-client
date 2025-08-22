import { useMemo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '@/shared/types';
import { hasActiveFilters } from '@/pages/menu/utils/has-active-filters';
import { FILTER_DEFAULT, type FilterState } from '@/pages/menu/constants/filter';
import { SortKey } from '@/pages/menu/constants/sort';

import { useGeolocation } from '@/shared/hooks/use-geolocation';
import BottomSheet from '@/shared/components/bottom-sheet';

import ProductCard from '@/pages/main/components/product/product-card';
import FilterModal from './components/filter-modal';
import MenuHeader from '@/pages/menu/components/menu-header';
import MapSection from '@/pages/menu/components/map-section';
import PreviewCard from '@/pages/menu/components/preview-card';
import SortModal from '@/pages/menu/components/sort-modal';
import ListSection from '@/pages/menu/components/list-section';

import { mockPickupProducts, testRestaurants } from '@/shared/mocks';
import { SOONGSIL_BASE, SHEET } from '@/pages/menu/constants/menu';

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
  const [sort, setSort] = useState<SortKey>('popular');
  const [sortOpen, setSortOpen] = useState(false);
  const [filter, setFilter] = useState<FilterState>(FILTER_DEFAULT);
  const [filterOpen, setFilterOpen] = useState(false);
  const [includeSoldOut, setIncludeSoldOut] = useState(false);
  const filterSelected = hasActiveFilters(filter);
  const navigate = useNavigate();
  const center = loc ?? SOONGSIL_BASE;

  const products = useMemo(() => mockPickupProducts, []);

  const handleSearchSubmit = useCallback(
    (v: string) => {
      setQuery(v);
      setSubmitted(v);
      navigate(`/search?q=${encodeURIComponent(v)}`);
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
        onClear={() => setQuery('')}
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
            products={products}
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
                <div className="flex-col gap-[2.0rem]">
                  {products.slice(0, 10).map((p) => (
                    <div key={p.id}>
                      <ProductCard product={p} variant="wide" />
                    </div>
                  ))}
                </div>
              </section>
            </BottomSheet>
          )}
        </>
      ) : (
        <ListSection
          products={products.slice(0, 20)}
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

      {error && (
        <div className="absolute top-[1.2rem] left-1/2 -translate-x-1/2 rounded bg-white/90 px-[1.2rem] py-[0.8rem] shadow">
          위치 권한/가져오기 실패: {error.message}
          <button className="ml-[0.8rem] underline" onClick={request} disabled={loading}>
            다시 시도
          </button>
        </div>
      )}
    </div>
  );
}

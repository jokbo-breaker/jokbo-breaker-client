import { useEffect, useMemo, useState, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchTextField from '@/shared/components/text-field/search-text-field';
import ProductCard from '@/pages/main/components/product/product-card';
import Tag from '@/shared/components/chips/tag';
import FilterChip from '@/shared/components/chips/filter-chip';
import { mockDeliveryProducts, mockPickupProducts } from '@/shared/mocks';

type Sort = 'recommend';

export default function SearchPage() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const initialQ = params.get('q') ?? '';
  const [query, setQuery] = useState(initialQ);
  const [submitted, setSubmitted] = useState(initialQ);

  const [sort, setSort] = useState<Sort>('recommend');
  const [hasFilter, setHasFilter] = useState(false);

  const all = useMemo(() => [...mockDeliveryProducts, ...mockPickupProducts], []);

  useEffect(() => {
    const q = params.get('q') ?? '';
    setQuery(q);
    setSubmitted(q);
  }, [params]);

  const handleSubmit = useCallback(
    (v: string) => {
      setQuery(v);
      setSubmitted(v);
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (v) next.set('q', v);
          else next.delete('q');
          return next;
        },
        { replace: false },
      );
    },
    [setParams],
  );

  const results = useMemo(() => {
    const q = submitted.trim().toLowerCase();
    if (!q) return [];
    return all.filter((p) => [p.store, p.name].some((s) => s?.toLowerCase().includes(q)));
  }, [submitted, all]);

  return (
    <div className="min-h-dvh w-full bg-white">
      <SearchTextField
        value={query}
        onChange={setQuery}
        onSubmit={handleSubmit}
        onBack={() => navigate(-1)}
        onClear={() => handleSubmit('')}
        autoFocus
        showBackButton
        showSearchIcon
        className="sticky top-0 z-[var(--z-header)] bg-white"
        placeholder="검색어를 입력해주세요."
      />

      {!submitted ? (
        <main className="flex-1 bg-white" />
      ) : (
        <main className="flex-1 flex-col gap-[1.2rem] bg-white px-[2rem] pb-[2.4rem]">
          <div className="flex-items-center gap-[0.8rem] pt-[0.8rem]">
            <Tag selected={sort === 'recommend'} onClick={() => setSort('recommend')}>
              추천순
            </Tag>

            <FilterChip selected={hasFilter} onClick={() => setHasFilter((v) => !v)} />
          </div>

          <section className="flex-col gap-[2rem] pb-[7rem]">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} variant="wide" />
            ))}
            {!results.length && (
              <p className="py-[12rem] text-center text-gray-500">검색 결과가 없습니다.</p>
            )}
          </section>
        </main>
      )}
    </div>
  );
}

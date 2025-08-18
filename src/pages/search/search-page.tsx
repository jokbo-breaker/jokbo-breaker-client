import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchTextField from '@/shared/components/text-field/search-text-field';
import ProductCard from '@/pages/main/components/product/product-card';
import Icon from '@/shared/components/icon';
import { mockDeliveryProducts, mockPickupProducts } from '@/shared/mocks';

export default function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState('');

  // 전체 데이터(배달+픽업)
  const all = useMemo(
    () => [...mockDeliveryProducts, ...mockPickupProducts],
    [],
  );

  // 검색
  const results = useMemo(() => {
    const q = submitted.trim().toLowerCase();
    if (!q) return [];
    return all.filter((p) =>
      [p.store, p.name].some((s) => s?.toLowerCase().includes(q)),
    );
  }, [submitted, all]);

  return (
    <div className="min-h-dvh w-full bg-white">
      {/* 상단 검색창만 보이게 – sticky */}
      <SearchTextField
        value={query}
        onChange={setQuery}
        onSubmit={(v) => setSubmitted(v)}
        onBack={() => navigate(-1)}
        onClear={() => setQuery('')}
        autoFocus
        showBackButton
        showSearchIcon
        className="sticky top-0 z-[var(--z-header)] bg-white"
        placeholder="검색어를 입력해주세요."
      />

      {/* 아직 제출 전: 하단은 흰 화면(키보드 올라오면 여백처럼 보임) */}
      {!submitted ? (
        <main className="flex-1 bg-white" />
      ) : (
        <main className="flex-1 bg-white px-[2rem] pb-[2.4rem]">
          {/* 칩 영역 (추천순 / 필터) – 이미지와 동일 레이아웃 */}
          <div className="mt-[0.8rem] mb-[1.6rem] flex items-center gap-[0.8rem]">
            <button className="text-body3 text-primary ring-primary/20 rounded-full bg-white px-[1.6rem] py-[0.8rem] ring-1">
              추천순
            </button>
            <button className="text-body3 flex items-center gap-[0.4rem] rounded-full bg-white px-[1.6rem] py-[0.8rem] text-black ring-1 ring-gray-300">
              필터
              <Icon name="filter" size={2} ariaHidden />
            </button>
          </div>

          {/* 결과 리스트 – 와이드 카드 */}
          <section className="space-y-[2.4rem]">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} variant="wide" />
            ))}
            {!results.length && (
              <p className="py-12 text-center text-gray-500">
                검색 결과가 없습니다.
              </p>
            )}
          </section>
        </main>
      )}
    </div>
  );
}

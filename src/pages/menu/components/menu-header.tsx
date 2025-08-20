// pages/menu/components/menu-header.tsx
import SearchTextField from '@/shared/components/text-field/search-text-field';
import SortFilterRow from '@/pages/menu/components/sort-filter-row';
import type { SortKey } from '@/pages/menu/constants/sort';

type Props = {
  mode: 'map' | 'list';
  query: string;
  setQuery: (v: string) => void;
  onSubmit: (v: string) => void;
  onBack: () => void;
  onClear: () => void;
  sort: SortKey; // ✅ 추가
  onOpenSort: () => void; // ✅ 추가
};

export default function MenuHeader({
  mode,
  query,
  setQuery,
  onSubmit,
  onBack,
  onClear,
  sort,
  onOpenSort,
}: Props) {
  return (
    <div className="absolute top-0 right-0 left-0 z-[var(--z-header)]">
      <SearchTextField
        value={query}
        onChange={setQuery}
        onSubmit={onSubmit}
        onBack={onBack}
        onClear={onClear}
        autoFocus={false}
        showBackButton
        showSearchIcon
        className="bg-white"
        placeholder="검색어를 입력해주세요."
      />
      {mode === 'map' && <SortFilterRow sort={sort} onOpenSort={onOpenSort} />}
    </div>
  );
}

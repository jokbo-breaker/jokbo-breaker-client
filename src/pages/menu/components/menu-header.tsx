import SearchTextField from '@/shared/components/text-field/search-text-field';
import SortFilterRow from '@/pages/menu/components/sort-filter-row';

type Props = {
  mode: 'map' | 'list';
  query: string;
  setQuery: (v: string) => void;
  onSubmit: (v: string) => void;
  onBack: () => void;
  onClear: () => void;
};

export default function MenuHeader({
  mode,
  query,
  setQuery,
  onSubmit,
  onBack,
  onClear,
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
      {mode === 'map' && <SortFilterRow />}
    </div>
  );
}

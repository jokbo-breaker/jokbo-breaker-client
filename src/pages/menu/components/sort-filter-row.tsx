import Tag from '@/shared/components/chips/tag';
import FilterChip from '@/shared/components/chips/filter-chip';
import { SORT_LABEL, type SortKey } from '@/pages/menu/constants/sort';

export default function SortFilterRow({
  className = '',
  sort,
  onOpenSort,
  onOpenFilter,
  filterSelected,
  includeSoldOut,
  onToggleSoldOut,
}: {
  className?: string;
  sort: SortKey;
  onOpenSort: () => void;
  onOpenFilter: () => void;
  filterSelected: boolean;
  includeSoldOut: boolean;
  onToggleSoldOut: () => void;
}) {
  return (
    <div
      className={`mt-[1.2rem] flex items-center gap-[0.8rem] px-[2rem] ${className}`}
    >
      <Tag selected onClick={onOpenSort}>
        {SORT_LABEL[sort]}
      </Tag>

      <Tag selected={includeSoldOut} onClick={onToggleSoldOut}>
        품절 포함
      </Tag>

      <FilterChip selected={filterSelected} onClick={onOpenFilter} />
    </div>
  );
}

import Tag from '@/shared/components/chips/tag';
import FilterChip from '@/shared/components/chips/filter-chip';
import { SORT_LABEL, type SortKey } from '@/pages/menu/constants/sort';

export default function SortFilterRow({
  className = '',
  sort,
  onOpenSort,
  onOpenFilter,
  filterSelected,
}: {
  className?: string;
  sort: SortKey;
  onOpenSort: () => void;
  onOpenFilter: () => void;
  filterSelected: boolean;
}) {
  return (
    <div className={`mt-[1.2rem] flex items-center gap-[0.8rem] px-[2rem] ${className}`}>
      <Tag selected onClick={onOpenSort}>
        {SORT_LABEL[sort]}
      </Tag>
      <FilterChip selected={filterSelected} onClick={onOpenFilter} />
    </div>
  );
}

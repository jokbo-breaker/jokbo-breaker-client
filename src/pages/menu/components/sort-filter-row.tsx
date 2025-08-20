import Tag from '@/shared/components/chips/tag';
import FilterChip from '@/shared/components/chips/filter-chip';

export default function SortFilterRow({
  className = '',
}: {
  className?: string;
}) {
  return (
    <div
      className={`mt-[1.2rem] flex items-center gap-[0.8rem] px-[2rem] ${className}`}
    >
      <Tag selected>인기순</Tag>
      <FilterChip />
    </div>
  );
}

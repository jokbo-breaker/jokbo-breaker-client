import ProductCard from '@/pages/main/components/product/product-card';
import type { Product } from '@/shared/types';
import SortFilterRow from '@/pages/menu/components/sort-filter-row';
import type { SortKey } from '@/pages/menu/constants/sort';

type Props = {
  products: Product[];
  sort: SortKey;
  onOpenSort: () => void;
  onOpenFilter: () => void;
  filterSelected: boolean;
};

export default function ListSection({
  products,
  sort,
  onOpenSort,
  onOpenFilter,
  filterSelected,
}: Props) {
  return (
    <div className="scrollbar-hide relative h-[100dvh] w-full flex-col gap-[1.2rem] overflow-y-auto pt-[5rem] pb-[6rem]">
      <SortFilterRow
        sort={sort}
        onOpenSort={onOpenSort}
        onOpenFilter={onOpenFilter}
        filterSelected={filterSelected}
      />
      <div className="px-[2rem] pb-[4rem]">
        <div className="flex-col gap-[2.0rem]">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} variant="wide" />
          ))}
        </div>
      </div>
    </div>
  );
}

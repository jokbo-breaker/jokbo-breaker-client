import type { FilterState } from '@/pages/menu/constants/filter';

export function hasActiveFilters(f: FilterState) {
  return Boolean(f.foodType || f.priceMax || f.categories.length || f.receive.length);
}

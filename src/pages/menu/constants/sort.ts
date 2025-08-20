export type SortKey = 'popular' | 'priceAsc' | 'priceDesc' | 'distance';

export const SORT_LABEL: Record<SortKey, string> = {
  popular: '인기순',
  priceAsc: '가격 낮은 순',
  priceDesc: '가격 높은 순',
  distance: '거리순',
};

export const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'popular', label: SORT_LABEL.popular },
  { key: 'priceAsc', label: SORT_LABEL.priceAsc },
  { key: 'priceDesc', label: SORT_LABEL.priceDesc },
  { key: 'distance', label: SORT_LABEL.distance },
];

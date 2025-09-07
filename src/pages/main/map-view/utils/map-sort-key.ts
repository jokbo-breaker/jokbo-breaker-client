import { SortKey } from '@/pages/menu/constants/sort';

export const mapSortKeyToApi = (
  k: SortKey,
): '인기순' | '가격 낮은 순' | '가격 높은 순' | '거리순' => {
  switch (k) {
    case 'popular':
      return '인기순';
    case 'priceAsc':
      return '가격 낮은 순';
    case 'priceDesc':
      return '가격 높은 순';
    case 'distance':
      return '거리순';
    default:
      return '인기순';
  }
};

type ApiFoodType = '식사' | '디저트';
type ApiDeliveryMethod = '배달' | '픽업' | '지금 바로' | '나중에';

export const toApiFoodType = (v: any): ApiFoodType | null => {
  if (v === 'meal') return '식사';
  if (v === 'dessert') return '디저트';
  if (v === '식사' || v === '디저트') return v;
  return null;
};

export const toApiDeliveryMethod = (v: any): ApiDeliveryMethod | null => {
  if (v === 'team' || v === 'delivery') return '배달';
  if (v === 'pickup') return '픽업';
  if (v === 'now') return '지금 바로';
  if (v === 'later') return '나중에';
  if (v === '배달' || v === '픽업' || v === '지금 바로' || v === '나중에')
    return v;
  return null;
};

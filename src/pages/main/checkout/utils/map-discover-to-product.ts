import type { DiscoverItem } from '@/shared/apis/discover/discover';
import type { Product } from '@/shared/types/product';

const formatHHmm = (ts?: string) => {
  if (!ts) return '';
  const time = ts.split(' ')[1] || '';
  const [hh = '00', mm = '00'] = time.split(':');
  return `${hh}:${mm}`;
};

export const toProductCardModel = (x: DiscoverItem): Product => {
  const start = formatHHmm(x.pickUpStartTime);
  const end = formatHHmm(x.pickUpEndTime);
  const hours = start && end ? `${start}~${end}` : '';

  return {
    id: x.menuId,
    name: x.menuName,
    store: x.storeName,
    image: x.menuImageUrls?.[0] ?? '',
    images: x.menuImageUrls ?? [],
    price: x.discountedMenuPrice,
    originalPrice: x.originalMenuPrice,
    discount: x.discountedPercentage,
    stockLeft: x.stockLeft,
    hours,
    distanceKm: x.storeDistance,
  };
};

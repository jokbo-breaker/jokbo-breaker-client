import type { DiscoverItem } from '@/shared/apis/discover/discover';

export type ProductCardModel = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  storeName: string;
  distanceKm?: number;
  pickup?: { start: string; end: string };
  stockLeft?: number;
};

export const toProductCardModel = (x: DiscoverItem): ProductCardModel => ({
  id: x.menuId,
  name: x.menuName,
  imageUrl: x.menuImageUrls?.[0] ?? '',
  price: x.discountedMenuPrice ?? x.pickupPrice,
  originalPrice: x.originalMenuPrice,
  discountPercent: x.discountedPercentage,
  storeName: x.storeName,
  distanceKm: x.storeDistance,
  pickup: { start: x.pickUpStartTime, end: x.pickUpEndTime },
  stockLeft: x.stockLeft,
});

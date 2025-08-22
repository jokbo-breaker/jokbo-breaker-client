import { END_POINT } from '@/shared/apis/constants/endpoints';
import type { HttpClient } from '@/shared/apis/base/http';

export type DiscoverItem = {
  storeId: string;
  storeName: string;
  menuId: string;
  menuName: string;
  menuImageUrls: string[];
  stockLeft: number;
  originalMenuPrice: number;
  discountedMenuPrice: number;
  discountedPercentage: number;
  pickUpStartTime: string; // "YYYYMMDD HH:mm:ss"
  pickUpEndTime: string; // ^
  storeDistance: number; // km
  category?: string;
  supportsDelivery: boolean;
  gramPerUnit: number;
  pickupPrice: number;
  totalSoldCount: number;
};

export type DiscoverResponse = {
  success: boolean;
  nearBy: DiscoverItem[];
  brandNew: DiscoverItem[];
  lowInStock: DiscoverItem[];
  mealTime: DiscoverItem[];
  sweet: DiscoverItem[];
  pickUpRightNow: DiscoverItem[];
};

export type DiscoverParams = {
  type: 'pickup' | 'delivery';
  place: string; // 예: "동작"
  lat: number; // 위도 (필수)
  lng: number; // 경도 (필수)
};

export const createDiscoverApi = (http: HttpClient) => ({
  search: ({ type, place, lat, lng }: DiscoverParams) =>
    http.post<DiscoverResponse, { lat: number; lng: number }>(
      END_POINT.DISCOVER(type, place),
      { lat, lng },
    ),
});

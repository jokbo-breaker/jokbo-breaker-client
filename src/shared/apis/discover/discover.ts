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
  pickUpEndTime: string; // "
  storeDistance: number; // km
  pickupPrice: number;

  // ✅ 응답에 항상 오지 않을 수 있는 필드들은 optional 로
  category?: string;
  supportsDelivery?: boolean;
  gramPerUnit?: number;
  totalSoldCount?: number;
};

export type DiscoverResponse = {
  success: boolean;
  totalMenus: number; // ✅ 샘플 응답에 존재
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
  lat: number;
  lng: number;
};

export const createDiscoverApi = (http: HttpClient) => ({
  search: ({ type, place, lat, lng }: DiscoverParams) =>
    http.post<DiscoverResponse, { lat: number; lng: number }>(
      END_POINT.DISCOVER(type, place),
      { lat, lng },
    ),
});

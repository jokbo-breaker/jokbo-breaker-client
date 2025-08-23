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
  pickUpStartTime: string;
  pickUpEndTime: string;
  storeDistance: number;
  pickupPrice: number;
  foodType?: string;
  category?: string;
  supportsDelivery?: boolean;
  gramPerUnit?: number;
  totalSoldCount?: number;
};

export type DiscoverResponse = {
  success: boolean;
  totalMenus: number;
  nearBy: DiscoverItem[];
  brandNew: DiscoverItem[];
  lowInStock: DiscoverItem[];
  mealTime: DiscoverItem[];
  sweet: DiscoverItem[];
  pickUpRightNow: DiscoverItem[];
};

export type DiscoverParams = {
  type: 'pickup' | 'delivery';
  place: string;
  lat: number;
  lng: number;
};
export type MenuDetailResponse = {
  success: boolean;
  storeId: string;
  storeName: string;
  storeOpenTime: string;
  storeCloseTime: string;
  storeAddress: string;
  storeLat: number;
  storeLng: number;
  storePhoneNumber: string;
  menuId: string;
  menuName: string;
  menuImageUrls: string[];
  menuDescription: string;
  stockLeft: number;
  originalMenuPrice: number;
  discountedMenuPrice: number;
  discountedPercentage: number;
  gramPerUnit: number;
  pickupPrice: number;
  deliveryPrice: number;
  totalSoldCount: number;
  pickUpStartTime: string;
  pickUpEndTime: string;
  deliveryStartTime: string;
  isDeliveryAvailable: boolean;
  supportsDelivery: boolean;
};
export type DiscoverFilterRequest = {
  lat: number;
  lng: number;
  query?: string | null;
  category?: string | null;
  foodType?: '식사' | '디저트' | null;
  sortBy?: '인기순' | '가격 낮은 순' | '가격 높은 순' | '거리순' | null;
  priceRange?: string | null;
  deliveryMethod?: '배달' | '픽업' | '지금 바로' | '나중에' | null;
};

export type DiscoverFilterResponse = {
  success: boolean;
  filters: Partial<{
    query: string | null;
    foodType: string | null;
    category: string | null;
    priceRange: string | null;
    deliveryMethod: string | null;
    sortBy: string | null;
  }>;
  count: number;
  results: DiscoverItem[];
};

export type AiRecommendRequest = {
  categories: string[]; // ['일식','한식']
  maxPrice?: number | null; // 최대 가격 (없으면 null)
  deliveryMethod: 'all' | 'delivery' | 'pickup';
  lat: number;
  lng: number;
  limit?: number;
};

export type AiRecommendResponse = {
  success: boolean;
  message?: string;
  recommendations: DiscoverItem[];
};

export const createDiscoverApi = (http: HttpClient) => ({
  search: ({ type, place, lat, lng }: DiscoverParams) =>
    http.post<DiscoverResponse, { lat: number; lng: number }>(
      END_POINT.DISCOVER(type, place),
      { lat, lng },
    ),
  menuDetail: (menuId: string) =>
    http.get<MenuDetailResponse>(END_POINT.DISCOVER_MENU_DETAIL(menuId)),
  filter: (body: DiscoverFilterRequest) =>
    http.post<DiscoverFilterResponse, DiscoverFilterRequest>(
      END_POINT.DISCOVER_FILTER,
      body,
    ),
  aiRecommend: (body: AiRecommendRequest) =>
    http.post<AiRecommendResponse, AiRecommendRequest>(
      END_POINT.DISCOVER_AI_RECOMMEND,
      body,
    ),
});

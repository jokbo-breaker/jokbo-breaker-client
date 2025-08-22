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

export const createDiscoverApi = (http: HttpClient) => ({
  search: ({ type, place, lat, lng }: DiscoverParams) =>
    http.post<DiscoverResponse, { lat: number; lng: number }>(
      END_POINT.DISCOVER(type, place),
      { lat, lng },
    ),
  menuDetail: (menuId: string) =>
    http.get<MenuDetailResponse>(END_POINT.DISCOVER_MENU_DETAIL(menuId)),
});

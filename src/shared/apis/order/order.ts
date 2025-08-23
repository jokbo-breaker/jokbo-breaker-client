// src/shared/apis/order/order.ts
import { END_POINT } from '@/shared/apis/constants/endpoints';
import type { HttpClient } from '@/shared/apis/base/http';

/** 주문 생성 */
export type CreateOrderBody = {
  menuId: string;
  quantity: number;
  orderType: 'pickup' | 'delivery';
  paymentMethod: 'card' | 'onsite';
  phoneNumber?: string;
};

export type CreateOrderResponse = {
  success: boolean;
  message: string;
  order: {
    orderId: string;
    storeName: string;
    items: Array<{
      menuId: string;
      menuName: string;
      quantity: number;
      gramPerUnit: number;
      unitPrice: number;
      totalPrice: number;
      totalGrams: number;
    }>;
    orderType: 'pickup' | 'delivery';
    paymentMethod: 'card' | 'onsite';
    totalQuantity: number;
    totalAmount: number;
    totalGrams: number;
    deliveryFee: number;
    finalAmount: number;
    status: string;
    orderDate: string;
    pickupStartTime?: string;
    pickupEndTime?: string;
    phoneNumber?: string;
  };
};

/** 주문 공통 모델 (목록/상세용) */
export type OrderItemApi = {
  orderId: string;
  storeId: string;
  storeName: string;
  items: Array<{
    menuId: string;
    menuName: string;
    quantity: number;
    gramPerUnit: number;
    unitPrice: number;
    totalPrice: number;
    totalGrams: number;
    menuImageUrls?: string[];
    originalMenuPrice?: number;
    originalTotalPrice?: number;
    discountedMenuPrice?: number;
    discountedPercentage?: number;
    pickupPrice?: number;
    currentStockLeft?: number;
  }>;
  orderType: 'pickup' | 'delivery';
  paymentMethod: 'card' | 'onsite';
  totalQuantity: number;
  totalAmount: number;
  totalGrams: number;
  finalAmount: number;
  status: string; // ex) 'pending' | 'delivered' ...
  orderDate: string; // "YYYYMMDD HH:mm:ss"
};

export type OrdersResponse = {
  success: boolean;
  message: string;
  orders: OrderItemApi[];
  totalCount: number;
};

export type OrderDetailResponse = {
  success: boolean;
  message: string;
  order: OrderItemApi;
};

export type CancelOrderResponse = {
  success: boolean;
  message: string;
  cancelledOrder: {
    orderId: string;
    storeName: string;
    finalAmount: number;
    cancelledAt: string; // "YYYYMMDD HH:mm:ss"
  };
};

export const createOrderApi = (http: HttpClient) => ({
  /** 주문 생성 */
  create: (body: CreateOrderBody) =>
    http.post<CreateOrderResponse, CreateOrderBody>(
      END_POINT.ORDER_CREATE,
      body,
    ),

  /** 주문 목록 */
  list: () => http.get<OrdersResponse>(END_POINT.ORDER_LIST),

  /** 주문 상세 */
  detail: (orderId: string) =>
    http.get<OrderDetailResponse>(END_POINT.ORDER_DETAIL(orderId)),

  /** 주문 취소 */
  cancel: (orderId: string) =>
    http.delete<CancelOrderResponse>(END_POINT.ORDER_CANCEL(orderId)),
});

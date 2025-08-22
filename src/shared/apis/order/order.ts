import { END_POINT } from '@/shared/apis/constants/endpoints';
import type { HttpClient } from '@/shared/apis/base/http';

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

export const createOrderApi = (http: HttpClient) => ({
  create: (body: CreateOrderBody) =>
    http.post<CreateOrderResponse, CreateOrderBody>(
      END_POINT.ORDER_CREATE,
      body,
    ),
});

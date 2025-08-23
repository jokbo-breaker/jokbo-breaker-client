// src/shared/apis/order/order-mutations.ts  (취소 훅)
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/apis/factory';
import { ORDER_KEY } from '@/shared/apis/constants/keys';
import type { CancelOrderResponse } from './order';

export const useCancelOrderMutation = () => {
  const qc = useQueryClient();
  return useMutation<CancelOrderResponse, Error, { orderId: string }>({
    mutationFn: ({ orderId }) => api.order.cancel(orderId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ORDER_KEY.LIST() });
    },
  });
};

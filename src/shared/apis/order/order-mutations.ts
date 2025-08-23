import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/apis/factory';
import { ORDER_KEY } from '@/shared/apis/constants/keys';
import type { CancelOrderResponse } from './order';
import type { CreateOrderBody, CreateOrderResponse } from './order';

export const useCancelOrderMutation = () => {
  const qc = useQueryClient();
  return useMutation<CancelOrderResponse, Error, { orderId: string }>({
    mutationFn: ({ orderId }) => api.order.cancel(orderId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ORDER_KEY.LIST() });
    },
  });
};

export const useCreateOrderMutation = () =>
  useMutation<CreateOrderResponse, unknown, CreateOrderBody>({
    mutationFn: (body) => api.order.create(body),
  });

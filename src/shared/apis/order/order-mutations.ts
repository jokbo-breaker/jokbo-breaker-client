import { useMutation } from '@tanstack/react-query';
import { api } from '../factory';
import type { CreateOrderBody, CreateOrderResponse } from './order';

export const useCreateOrderMutation = () =>
  useMutation<CreateOrderResponse, unknown, CreateOrderBody>({
    mutationFn: (body) => api.order.create(body),
  });

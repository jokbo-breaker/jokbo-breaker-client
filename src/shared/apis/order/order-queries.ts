import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/apis/factory';
import { ORDER_KEY } from '@/shared/apis/constants/keys';
import type { OrdersResponse } from './order';

export const useOrdersQuery = () =>
  useQuery<OrdersResponse>({
    queryKey: ORDER_KEY.LIST(),
    queryFn: () => api.order.list(),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

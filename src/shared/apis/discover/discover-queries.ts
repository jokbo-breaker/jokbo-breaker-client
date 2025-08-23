import { useQuery } from '@tanstack/react-query';
import { api } from '../factory';
import type {
  DiscoverParams,
  DiscoverResponse,
  MenuDetailResponse,
  DiscoverFilterRequest,
  DiscoverFilterResponse,
} from './discover';

export const useDiscoverQuery = (params: DiscoverParams) =>
  useQuery<DiscoverResponse>({
    queryKey: ['discover', params.type, params.place, params.lat, params.lng],
    queryFn: () => api.discover.search(params),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
export const useMenuDetailQuery = (menuId: string) =>
  useQuery<MenuDetailResponse>({
    queryKey: ['menu-detail', menuId],
    queryFn: () => api.discover.menuDetail(menuId),
    enabled: !!menuId,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
export const useDiscoverFilterQuery = (params: DiscoverFilterRequest) =>
  useQuery<DiscoverFilterResponse>({
    queryKey: [
      'discover-filter',
      params.lat,
      params.lng,
      params.query ?? '',
      params.category ?? '',
      params.foodType ?? '',
      params.sortBy ?? '',
      params.priceRange ?? '',
      params.deliveryMethod ?? '',
    ],
    queryFn: () => api.discover.filter(params),
    enabled: Number.isFinite(params.lat) && Number.isFinite(params.lng),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

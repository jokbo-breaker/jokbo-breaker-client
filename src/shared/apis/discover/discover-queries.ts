import { useQuery } from '@tanstack/react-query';
import { api } from '../factory';
import type {
  DiscoverParams,
  DiscoverResponse,
  MenuDetailResponse,
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

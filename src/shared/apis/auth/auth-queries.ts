import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/apis/factory';
import { AUTH_KEY } from '@/shared/apis/constants/keys';
import type { MeResponse, AuthStatusResponse } from '@/shared/apis/auth/auth';

export const useMeQuery = () =>
  useQuery<MeResponse>({
    queryKey: AUTH_KEY.ME(),
    queryFn: () => api.auth.me(),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

export const useAuthStatusQuery = () =>
  useQuery<AuthStatusResponse>({
    queryKey: AUTH_KEY.STATUS(),
    queryFn: () => api.auth.getStatus(),
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });

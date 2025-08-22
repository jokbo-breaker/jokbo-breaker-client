import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '../factory';
import { AUTH_KEY } from '../constants/keys';
import type { MeResponse } from './auth';

/**
 * 현재 사용자 정보 조회
 * - 기본 옵션: staleTime 1분, 포커스시 재실행 없음
 * - 필요 시 options로 덮어쓰기 가능
 */
export const useMeQuery = (
  options?: Omit<
    UseQueryOptions<
      MeResponse,
      Error,
      MeResponse,
      ReturnType<typeof AUTH_KEY.ME>
    >,
    'queryKey' | 'queryFn'
  >,
) =>
  useQuery({
    queryKey: AUTH_KEY.ME(),
    queryFn: () => api.auth.me(),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    ...options,
  });

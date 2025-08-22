import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { api } from '../factory';
import { AUTH_KEY } from '../constants/keys';
import type {
  LogoutResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from './auth';
import { clearAccessToken } from '@/shared/utils/token';

/**
 * 로그아웃
 * - 서버 세션/쿠키 정리 + 클라이언트 토큰 제거(예비)
 * - 성공 시 ME 쿼리 무효화
 */
export const useLogoutMutation = (
  options?: UseMutationOptions<LogoutResponse, Error, void>,
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => api.auth.logout(),
    onSuccess: (data, vars, ctx) => {
      clearAccessToken();
      qc.invalidateQueries({ queryKey: AUTH_KEY.ME() });
      options?.onSuccess?.(data, vars, ctx);
    },
    ...options,
  });
};

/**
 * 프로필 업데이트 (preferences 등)
 * - 성공 시 ME 쿼리 무효화로 최신화
 */
export const useUpdateProfileMutation = (
  options?: UseMutationOptions<
    UpdateProfileResponse,
    Error,
    UpdateProfileRequest
  >,
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateProfileRequest) =>
      api.auth.updateProfile(payload),
    onSuccess: (data, vars, ctx) => {
      qc.invalidateQueries({ queryKey: AUTH_KEY.ME() });
      options?.onSuccess?.(data, vars, ctx);
    },
    ...options,
  });
};

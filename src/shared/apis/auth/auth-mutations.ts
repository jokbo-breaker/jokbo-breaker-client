import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/apis/factory';
import { AUTH_KEY } from '@/shared/apis/constants/keys';
import type {
  LogoutResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from '@/shared/apis/auth/auth';
import { clearAccessToken } from '@/shared/utils/token';

export const useLogoutMutation = () => {
  const qc = useQueryClient();
  return useMutation<LogoutResponse, Error, void>({
    mutationFn: () => api.auth.logout(),
    onSuccess: () => {
      clearAccessToken();
      qc.invalidateQueries({ queryKey: AUTH_KEY.ME() });
    },
  });
};

export const useUpdateProfileMutation = () => {
  const qc = useQueryClient();
  return useMutation<UpdateProfileResponse, Error, UpdateProfileRequest>({
    mutationFn: (payload) => api.auth.updateProfile(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: AUTH_KEY.ME() });
    },
  });
};

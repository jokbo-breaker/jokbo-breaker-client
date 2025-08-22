import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../factory';
import { AUTH_KEY } from '../constants/keys';
import type {
  LogoutResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  AppleLoginResponse,
} from './auth';
import { clearAccessToken, setAccessToken } from '@/shared/utils/token';

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

export const useAppleLoginMutation = () => {
  const qc = useQueryClient();
  return useMutation<AppleLoginResponse, Error, { identityToken: string }>({
    mutationFn: ({ identityToken }) => api.auth.loginWithApple(identityToken),
    onSuccess: (data) => {
      if (data?.token) setAccessToken(data.token);
      qc.invalidateQueries({ queryKey: AUTH_KEY.ME() });
    },
  });
};

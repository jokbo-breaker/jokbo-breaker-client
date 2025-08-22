export const AUTH_KEY = {
  ALL: ['auth'] as const,
  ME: () => [...AUTH_KEY.ALL, 'me'] as const,
  LOGOUT: () => [...AUTH_KEY.ALL, 'logout'] as const,
  PROFILE_UPDATE: () => [...AUTH_KEY.ALL, 'profile-update'] as const,
} as const;

export type AuthQueryKey = ReturnType<typeof AUTH_KEY.ME>;

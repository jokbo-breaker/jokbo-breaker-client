export const AUTH_KEY = {
  ALL: ['auth'] as const,
  ME: () => [...AUTH_KEY.ALL, 'me'] as const,
  STATUS: () => [...AUTH_KEY.ALL, 'status'] as const,
  LOGOUT: () => [...AUTH_KEY.ALL, 'logout'] as const,
  PROFILE_UPDATE: () => [...AUTH_KEY.ALL, 'profile-update'] as const,
} as const;

export type AuthQueryKey = ReturnType<typeof AUTH_KEY.ME>;

export const ORDER_KEY = {
  ALL: ['order'] as const,
  LIST: () => [...ORDER_KEY.ALL, 'list'] as const,
  DETAIL: (orderId: string) => [...ORDER_KEY.ALL, 'detail', orderId] as const,
} as const;

export type OrderListKey = ReturnType<typeof ORDER_KEY.LIST>;
export type OrderDetailKey = ReturnType<typeof ORDER_KEY.DETAIL>;

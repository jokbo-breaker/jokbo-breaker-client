export const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const END_POINT = {
  AUTH_GOOGLE_START: '/auth/google',
  AUTH_GOOGLE_CALLBACK: (code: string) =>
    `/auth/google/callback?code=${encodeURIComponent(code)}`,

  AUTH_ME: '/auth/me',
  AUTH_STATUS: '/auth/status',
  AUTH_LOGOUT: '/auth/logout',
  AUTH_PROFILE_UPDATE: '/auth/profile',
  DISCOVER: (type: 'pickup' | 'delivery', place: string) =>
    `/discover?type=${type}&place=${encodeURIComponent(place)}`,
  DISCOVER_MENU_DETAIL: (menuId: string) => `/discover/menu/${menuId}`,
  DISCOVER_FILTER: `/discover/filter`,
  DISCOVER_AI_RECOMMEND: `/discover/ai-recommend`,
  ORDER_CREATE: '/order',
  ORDER_LIST: '/order',
  ORDER_DETAIL: (orderId: string) => `\/order/${orderId}`,
  ORDER_CANCEL: (orderId: string) => `/order/${orderId}`,
} as const;

export const withBase = (path: string): string =>
  `${BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

import axios, { AxiosInstance, AxiosError } from 'axios';
import { BASE_URL } from '../constants/endpoints';
import { HTTP_STATUS, RESPONSE_MESSAGE } from '../constants/http';
import { getAccessToken, clearAccessToken } from '@/shared/utils/token';

const pickMessage = (
  status?: number,
  serverMessage?: unknown,
): string | undefined => {
  if (typeof serverMessage === 'string' && serverMessage.trim())
    return serverMessage;
  if (status && RESPONSE_MESSAGE[status]) return RESPONSE_MESSAGE[status];
  return undefined;
};

export const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 15_000,
    withCredentials: true,
  });

  instance.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
      config.headers = config.headers ?? {};
      (config.headers as Record<string, string>).Authorization =
        `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (res) => res,
    (error: AxiosError<{ message?: unknown }>) => {
      const status = error.response?.status;
      const msg = pickMessage(status, error.response?.data?.message);
      if (msg) console.warn(`[API ${status ?? 'ERR'}] ${msg}`);

      if (status === HTTP_STATUS.UNAUTHORIZED) {
        clearAccessToken();
        // 필요 시 라우팅: window.location.replace('/login');
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

export const axiosInstance = createAxiosInstance();

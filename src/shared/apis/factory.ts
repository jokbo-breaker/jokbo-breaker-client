import { axiosInstance } from '@/shared/apis/base/instance';
import { HttpClient } from '@/shared/apis/base/http';
import { createAuthApi } from '@/shared/apis/auth/auth';

const http = new HttpClient(axiosInstance);

export const api = {
  auth: createAuthApi(http),
} as const;

export type Api = typeof api;

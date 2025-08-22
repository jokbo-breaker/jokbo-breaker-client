import { axiosInstance } from '@/shared/apis/base/instance';
import { HttpClient } from '@/shared/apis/base/http';
import { createAuthApi } from '@/shared/apis/auth/auth';
import { createDiscoverApi } from '@/shared/apis/discover/discover';

const http = new HttpClient(axiosInstance);

export const api = {
  auth: createAuthApi(http),
  discover: createDiscoverApi(http),
} as const;

export type Api = typeof api;

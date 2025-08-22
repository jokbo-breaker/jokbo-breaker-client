import { axiosInstance } from './base/instance';
import { HttpClient } from './base/http';
import { createAuthApi } from './auth/auth';

const http = new HttpClient(axiosInstance);

export const api = {
  auth: createAuthApi(http),
} as const;

export type Api = typeof api;

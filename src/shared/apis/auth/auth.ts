// src/apis/auth/auth.ts
import { END_POINT, BASE_URL } from '../constants/endpoints';
import type { HttpClient } from '../base/http';

export type Preferences = {
  favoriteCategories?: string[];
  allergens?: string[];
  dietaryRestrictions?: string[];
};

export type User = {
  id: string;
  email: string;
  name: string;
  picture: string;
  totalPurchaseCount: number;
  totalFoodAmount: number;
  preferences: Preferences;
};

export type MeResponse = { success: boolean; message: string; user: User };
export type LogoutResponse = { success: boolean; message: string };
export type UpdateProfileRequest = { preferences?: Preferences };
export type UpdateProfileResponse = {
  success: boolean;
  message: string;
  user?: User;
};

export const createAuthApi = (http: HttpClient) =>
  ({
    // 리다이렉트: 절대 URL 필요
    getGoogleLoginUrl: () => `${BASE_URL}${END_POINT.AUTH_GOOGLE_START}`,
    getGoogleCallbackUrl: (code: string) =>
      `${BASE_URL}${END_POINT.AUTH_GOOGLE_CALLBACK(code)}`,

    // axios 경유: 경로만 넘김
    me: () => http.get<MeResponse>(END_POINT.AUTH_ME),
    logout: () => http.post<LogoutResponse>(END_POINT.AUTH_LOGOUT),
    updateProfile: (body: UpdateProfileRequest) =>
      http.put<UpdateProfileResponse>(END_POINT.AUTH_PROFILE_UPDATE, body),
  }) as const;

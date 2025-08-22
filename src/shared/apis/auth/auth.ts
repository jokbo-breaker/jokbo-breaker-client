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

export type MeResponse = { success: boolean; message?: string; user: User };
export type LogoutResponse = { success: boolean; message: string };
export type UpdateProfileRequest = { preferences?: Preferences };
export type UpdateProfileResponse = {
  success: boolean;
  message: string;
  user?: User;
};

export type AuthStatusResponse = {
  success: boolean;
  authenticated: boolean;
  message?: string;
  user?: User;
};

export const createAuthApi = (http: HttpClient) =>
  ({
    getGoogleLoginUrl: () => `${BASE_URL}${END_POINT.AUTH_GOOGLE_START}`,
    getGoogleCallbackUrl: (code: string) =>
      `${BASE_URL}${END_POINT.AUTH_GOOGLE_CALLBACK(code)}`,

    me: () => http.get<MeResponse>(END_POINT.AUTH_ME),
    getStatus: () => http.get<AuthStatusResponse>(END_POINT.AUTH_STATUS),
    logout: () => http.post<LogoutResponse>(END_POINT.AUTH_LOGOUT),
    updateProfile: (body: UpdateProfileRequest) =>
      http.put<UpdateProfileResponse>(END_POINT.AUTH_PROFILE_UPDATE, body),
  }) as const;

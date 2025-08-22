const ACCESS_TOKEN_KEY = 'access_token';

export const getAccessToken = (): string => {
  try {
    return localStorage.getItem(ACCESS_TOKEN_KEY) ?? '';
  } catch {
    return '';
  }
};

export const setAccessToken = (token: string): void => {
  try {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  } catch {}
};

export const clearAccessToken = (): void => {
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  } catch {}
};

export const getAuthHeader = (): { Authorization?: string } => {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

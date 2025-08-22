import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class HttpClient {
  constructor(private readonly axios: AxiosInstance) {}

  private unwrap<T>(p: Promise<AxiosResponse<T>>): Promise<T> {
    return p.then((r) => r.data);
  }

  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.unwrap<T>(this.axios.get<T>(url, config));
  }

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.unwrap<T>(this.axios.delete<T>(url, config));
  }

  post<T, B = unknown>(
    url: string,
    body?: B,
    config?: AxiosRequestConfig<B>,
  ): Promise<T> {
    return this.unwrap<T>(this.axios.post<T>(url, body, config));
  }

  put<T, B = unknown>(
    url: string,
    body?: B,
    config?: AxiosRequestConfig<B>,
  ): Promise<T> {
    return this.unwrap<T>(this.axios.put<T>(url, body, config));
  }

  patch<T, B = unknown>(
    url: string,
    body?: B,
    config?: AxiosRequestConfig<B>,
  ): Promise<T> {
    return this.unwrap<T>(this.axios.patch<T>(url, body, config));
  }

  postForm<T>(
    url: string,
    form: FormData,
    config?: AxiosRequestConfig<FormData>,
  ): Promise<T> {
    const cfg: AxiosRequestConfig<FormData> = {
      ...(config ?? {}),
      headers: {
        ...(config?.headers ?? {}),
        'Content-Type': 'multipart/form-data',
      },
    };
    return this.unwrap<T>(this.axios.post<T>(url, form, cfg));
  }
}

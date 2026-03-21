import type { InternalAxiosRequestConfig } from 'axios';

// リクエストヘッダにトークンを設定する
export const addAuthorizationHeader = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}
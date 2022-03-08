import { message } from 'antd';
import Axios from 'axios';
import Storage from './storage';

const instance = Axios.create({
  timeout: 5000,
  baseURL: '/api',
});

const storage = Storage.new<string>('__token');

instance.interceptors.request.use(config => {
  const token = storage.get();
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

instance.interceptors.response.use(res => {
  if (res.status === 401) {
    message.error('登录已过期，请重新登录');
    location.href = '/login';
  }

  if (res.status !== 200) {
    message.error(res.data?.message || '未知错误');
    return Promise.reject(res);
  }

  const { token } = res.data || {};

  if (token) {
    storage.set(token);
  }

  return Promise.resolve(res.data);
});

export function get<T>(url: string, params: any = {}) {
  return instance({
    method: 'get',
    url,
    params,
  }) as unknown as Promise<T>;
}

export function post<T>(url: string, data: any = {}) {
  return instance({
    method: 'post',
    url,
    data,
  }) as unknown as Promise<T>;
}

export function put<T>(url: string, data: any = {}) {
  return instance({
    method: 'put',
    url,
    data,
  }) as unknown as Promise<T>;
}

export function del<T>(url: string, data: any = {}) {
  return instance({
    method: 'delete',
    url,
    data,
  }) as unknown as Promise<T>;
}

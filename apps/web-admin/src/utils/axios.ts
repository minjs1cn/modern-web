import { message } from 'antd';
import Axios from 'axios';

const instance = Axios.create({
  timeout: 5000,
  baseURL: '/api',
});

instance.interceptors.response.use(res => {
  if (res.status !== 200) {
    message.error(res.data || '未知错误');
    return Promise.reject(res);
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

export type ApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};

export type ApiListResponse<T> = ApiResponse<{
  list: T[];
  total: number;
}>;

export type ApiEntityResponse<T> = ApiResponse<T | null>;

export function apiResponse<T>(data: T, message = 'success', code = 0) {
  return {
    code,
    message,
    data,
  };
}

export const HOST = 'http://localhost:3000';

export const API_HOST = `${HOST}/api`;

export const API_USER = `${API_HOST}/user`;
export const API_USER_CREATE = `${API_HOST}/user/create`;

export const API_USER_ID = (id: number) => `${API_USER}/${id}`;

export const API_PERMISSION = `${API_HOST}/permission`;
export const API_PERMISSION_CREATE = `${API_HOST}/permission/create`;

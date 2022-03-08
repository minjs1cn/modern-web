import type { Permission, User } from './type';
import type { ApiResponse } from '@/utils/api';
import { post } from '@/utils/axios';

export type LoginRequest = {
  account: string;
  password: string;
};

export type LoginResponse = ApiResponse<{
  token: string;
  info: null | User;
  permissions: Permission[];
}>;

export function login({ account, password }: LoginRequest) {
  return post<LoginResponse>('/login', {
    account,
    password,
  });
}

export type ApiGetUserPermissionResponse = ApiResponse<Permission[]>;

export function isLogin() {
  return post<LoginResponse>('/isLogin');
}

export const AuthService = {
  login,
  isLogin,
};

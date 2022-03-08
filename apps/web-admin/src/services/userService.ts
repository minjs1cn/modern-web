import type { User } from './type';
import type { ApiResponse } from '@/utils/api';
import { del, get, post, put } from '@/utils/axios';

const UserApi = '/system/user';

export type GetSystemUserRequest = {
  id?: number;
  page?: number;
  size?: number;
  name?: string;
};

type GetSystemUserResponse = ApiResponse<User[]>;

export function getSystemUser(params: GetSystemUserRequest) {
  return get<GetSystemUserResponse>(UserApi, params);
}

export type CreateSystemUserRequest = Optional<User>;

type CreateSystemUserResponse = ApiResponse<User>;

export function createSystemUser(data: CreateSystemUserRequest) {
  return post<CreateSystemUserResponse>(UserApi, data);
}

type UpdateSystemUserResponse = ApiResponse<User>;

export function updateSystemUser(data: CreateSystemUserRequest) {
  return put<UpdateSystemUserResponse>(UserApi, data);
}

export type DeleteSystemUserRequest = {
  ids: number[];
};

type DeleteSystemUserResponse = ApiResponse<User>;

export function deleteSystemUser(params: DeleteSystemUserRequest) {
  return del<DeleteSystemUserResponse>(UserApi, params);
}

export const UserService = {
  getSystemUser,
  createSystemUser,
  updateSystemUser,
  deleteSystemUser,
};

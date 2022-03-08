import type { Permission } from './type';
import type { ApiResponse } from '@/utils/api';
import { del, get, post, put } from '@/utils/axios';

const PermissionApi = '/system/permission';

export type GetSystemPermissionRequest = {
  id?: number;
};

type GetSystemPermissionResponse = ApiResponse<Permission[]>;

export function getSystemPermission(params: GetSystemPermissionRequest) {
  return get<GetSystemPermissionResponse>(PermissionApi, params);
}

export type CreateSystemPermissionRequest = Optional<Permission>;

type CreateSystemPermissionResponse = ApiResponse<Permission>;

export function createSystemPermission(data: CreateSystemPermissionRequest) {
  return post<CreateSystemPermissionResponse>(PermissionApi, data);
}

type UpdateSystemPermissionResponse = ApiResponse<Permission>;

export function updateSystemPermission(data: CreateSystemPermissionRequest) {
  return put<UpdateSystemPermissionResponse>(PermissionApi, data);
}

export type DeleteSystemPermissionRequest = {
  ids: number[];
};

type DeleteSystemPermissionResponse = ApiResponse<Permission>;

export function deleteSystemPermission(params: DeleteSystemPermissionRequest) {
  return del<DeleteSystemPermissionResponse>(PermissionApi, params);
}

export const PermissionService = {
  getSystemPermission,
  createSystemPermission,
  updateSystemPermission,
  deleteSystemPermission,
};

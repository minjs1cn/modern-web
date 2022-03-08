import { useEffect, useMemo, useState } from 'react';
import { message } from 'antd';
import { menuPermissionsFilter, actionPermissionsFilter } from './utils';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  addPermission,
  getSystemPermissionThunk,
  removePermission,
  updatePermission,
} from '@/store/permissionSlice';
import {
  CreateSystemPermissionRequest,
  PermissionService,
} from '@/services/permissionService';

export function usePermission() {
  const { list, loading } = useAppSelector(state => state.permission);
  const dispath = useAppDispatch();
  const menus = useMemo(
    () =>
      menuPermissionsFilter(
        list.map(item => ({
          ...item,
          key: item.id,
        })),
      ),
    [list],
  );
  const actions = useMemo(
    () =>
      actionPermissionsFilter(
        list.map(item => ({
          ...item,
          key: item.id,
        })),
      ),
    [list],
  );

  useEffect(() => {
    dispath(getSystemPermissionThunk({}));
  }, []);

  return {
    list,
    menus,
    actions,
    loading,
  };
}

export function useCreateOrUpdatePermission() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const createOrUpdate = async (data: CreateSystemPermissionRequest) => {
    try {
      setLoading(true);
      if (data.id) {
        await PermissionService.updateSystemPermission(data);
        dispatch(updatePermission(data));
      } else {
        await PermissionService.createSystemPermission(data);
        dispatch(addPermission(data));
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createOrUpdate,
  };
}

export function useDeletePermission() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const deleteAction = async (data: CreateSystemPermissionRequest) => {
    try {
      setLoading(true);
      await PermissionService.deleteSystemPermission({
        ids: [data.id!],
      });
      dispatch(removePermission(data));
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    deleteAction,
  };
}

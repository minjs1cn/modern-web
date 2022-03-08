import { useMemo } from 'react';
import { useAppSelector } from '@/store';
import { Permission, PermissionCategory } from '@/services/type';

type PermissionItem = Permission & {
  children?: PermissionItem[];
};

export function createData(data: Permission[]) {
  const result: PermissionItem[] = [];
  data.forEach(item => {
    if (item.parentId === -1) {
      result.push(item);
    }
  });
  data.forEach(item => {
    if (item.parentId !== -1) {
      result.forEach(parent => {
        if (parent.id === item.parentId) {
          parent.children = [...(parent.children || []), item];
        }
      });
    }
  });
  return result;
}

export function useAuthMenus() {
  const permissions = useAppSelector(state => state.auth.permissions);

  const userMenus = useMemo(
    () =>
      createData(
        permissions
          .filter(item => item.category === PermissionCategory.Menu)
          .map(item => ({
            ...item,
            key: item.path,
          })),
      ),
    [permissions],
  );

  return {
    userMenus,
  };
}

export function useAuthActions() {
  const permissions = useAppSelector(state => state.auth.permissions);

  const useActions = useMemo(
    () =>
      permissions.filter(item => item.category === PermissionCategory.Action),
    [],
  );

  return {
    useActions,
  };
}

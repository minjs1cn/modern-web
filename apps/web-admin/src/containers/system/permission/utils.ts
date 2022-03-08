import { Permission, PermissionCategory } from '@/services/type';

export type PermissionItem = Permission & {
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

export const SuperPermission: Permission = {
  id: -1,
  parentId: -1,
  path: '',
  title: '无',
  description: '',
  category: PermissionCategory.unKnow,
};

// 获取当前权限的父级所有同级别权限
export function getPermissionParent(items: Permission[], row: Permission) {
  const { category, parentId } = row;
  const data = items.filter(item => item.category === category);

  if (parentId === -1) {
    return [SuperPermission];
  }

  const result = data.find(item => item.id === parentId);
  if (result) {
    return data.filter(item => item.parentId === result.parentId);
  }

  return [SuperPermission];
}

export const menuPermissionsFilter = (permissions: Permission[]) =>
  createData(
    permissions.filter(item => item.category === PermissionCategory.Menu),
  );

export const actionPermissionsFilter = (permissions: Permission[]) =>
  createData(
    permissions.filter(item => item.category === PermissionCategory.Action),
  );

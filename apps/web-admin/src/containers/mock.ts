export enum PermissionCategory {
  unKnow = 0,
  Menu = 1,
  Action = 2,
}

export type Permission = {
  id: number;
  parentId: number;
  path: string;
  title: string;
  description: string;
  category: PermissionCategory;
};

export const mockPermissions = [
  {
    id: 1,
    parentId: -1,
    category: PermissionCategory.Menu,
    title: '系统管理',
    path: '/system',
    description: '',
  },
  {
    id: 2,
    parentId: 1,
    category: PermissionCategory.Menu,
    title: '权限管理',
    path: '/system/permission',
    description: '',
  },
  {
    id: 3,
    parentId: 1,
    category: PermissionCategory.Menu,
    title: '角色管理',
    path: '/system/role',
    description: '',
  },
  {
    id: 4,
    parentId: 1,
    category: PermissionCategory.Menu,
    title: '用户管理',
    path: '/system/user',
    description: '',
  },

  {
    id: 11,
    parentId: -1,
    category: PermissionCategory.Action,
    title: '权限管理',
    path: '/system/permission',
    description: '',
  },
  {
    id: 12,
    parentId: 11,
    category: PermissionCategory.Action,
    title: '查看',
    path: '/system/permission:read',
    description: '',
  },
  {
    id: 13,
    parentId: 11,
    category: PermissionCategory.Action,
    title: '新增',
    path: '/system/permission:create',
    description: '',
  },
  {
    id: 14,
    parentId: 11,
    category: PermissionCategory.Action,
    title: '编辑',
    path: '/system/permission:update',
    description: '',
  },
  {
    id: 15,
    parentId: 11,
    category: PermissionCategory.Action,
    title: '删除',
    path: '/system/permission:delete',
    description: '',
  },

  {
    id: 16,
    parentId: -1,
    category: PermissionCategory.Action,
    title: '角色管理',
    path: '/system/role',
    description: '',
  },
  {
    id: 17,
    parentId: 16,
    category: PermissionCategory.Action,
    title: '查看',
    path: '/system/role:read',
    description: '',
  },
  {
    id: 18,
    parentId: 16,
    category: PermissionCategory.Action,
    title: '新增',
    path: '/system/role:create',
    description: '',
  },
  {
    id: 19,
    parentId: 16,
    category: PermissionCategory.Action,
    title: '编辑',
    path: '/system/role:update',
    description: '',
  },
  {
    id: 20,
    parentId: 16,
    category: PermissionCategory.Action,
    title: '删除',
    path: '/system/role:delete',
    description: '',
  },

  {
    id: 21,
    parentId: -1,
    category: PermissionCategory.Action,
    title: '用户管理',
    path: '/system/user',
    description: '',
  },
  {
    id: 22,
    parentId: 21,
    category: PermissionCategory.Action,
    title: '查看',
    path: '/system/user:read',
    description: '',
  },
  {
    id: 23,
    parentId: 21,
    category: PermissionCategory.Action,
    title: '新增',
    path: '/system/user:create',
    description: '',
  },
  {
    id: 24,
    parentId: 21,
    category: PermissionCategory.Action,
    title: '编辑',
    path: '/system/user:update',
    description: '',
  },
  {
    id: 25,
    parentId: 21,
    category: PermissionCategory.Action,
    title: '删除',
    path: '/system/user:delete',
    description: '',
  },
];

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

export const mockMenus = createData(
  mockPermissions.filter(item => item.category === PermissionCategory.Menu),
);

export const mockActions = createData(
  mockPermissions.filter(item => item.category === PermissionCategory.Action),
);

const SuperPermission: Permission = {
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

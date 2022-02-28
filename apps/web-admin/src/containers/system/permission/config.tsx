import { Button, Space } from 'antd';

export enum PermissionCategory {
  Menu = 1,
  Action = 2,
}

export type Permission = {
  id: number;
  parentId: number | null;
  code: string;
  name: string;
  title: string;
  category: PermissionCategory;
};

export const columns = [
  {
    title: 'code',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'actions',
    dataIndex: 'actions',
    key: 'actions',
    render: () => (
      <Space>
        <Button type="primary">Edit</Button>
        <Button type="ghost">Delete</Button>
      </Space>
    ),
  },
];

const mockData: Permission[] = [
  {
    id: 1,
    parentId: null,
    code: '/system',
    name: 'system',
    title: '系统管理',
    category: 1,
  },
  {
    id: 2,
    parentId: 1,
    code: '/system/permission',
    name: 'system.permission',
    title: '权限管理',
    category: 1,
  },
  {
    id: 3,
    parentId: 1,
    code: '/system/role',
    name: 'system.role',
    title: '角色管理',
    category: 1,
  },
  {
    id: 4,
    parentId: 1,
    code: '/system/user',
    name: 'system.user',
    title: '用户管理',
    category: 1,
  },

  {
    id: 21,
    parentId: null,
    code: '/system/permission',
    name: 'system.permission',
    title: '权限管理',
    category: 2,
  },
  {
    id: 22,
    parentId: 21,
    code: '/system/permission/create',
    name: 'system.permission.create',
    title: '创建权限',
    category: 2,
  },
  {
    id: 23,
    parentId: 21,
    code: '/system/permission/update',
    name: 'system.permission.update',
    title: '更新权限',
    category: 2,
  },
  {
    id: 24,
    parentId: 21,
    code: '/system/permission/delete',
    name: 'system.permission.delete',
    title: '删除权限',
    category: 2,
  },
  {
    id: 25,
    parentId: 21,
    code: '/system/permission/read',
    name: 'system.permission.read',
    title: '查看权限',
    category: 2,
  },
];

export function createData(data: Permission[]) {
  const result: any[] = [];
  data.forEach(item => {
    if (item.parentId === null) {
      result.push({
        ...item,
        key: item.id,
        children: [],
      });
    }
  });
  data.forEach(item => {
    if (item.parentId !== null) {
      result.forEach(parent => {
        if (parent.id === item.parentId) {
          parent.children.push({
            ...item,
            key: item.id,
          });
        }
      });
    }
  });
  return result;
}

export const data = createData(mockData);

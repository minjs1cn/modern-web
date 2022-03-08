export type Pagination = {
  page: number;
  size: number;
};

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

export type LoginAccount = {
  account: string;
  password: string;
};

export type User = {
  id: number;
  name: string;
  account: string;
};

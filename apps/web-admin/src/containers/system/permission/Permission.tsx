import { PageHeader, Form, Table, Button, Space, Popconfirm } from 'antd';
import { useState } from 'react';
import PermissionForm from './PermissionForm';
import { getPermissionParent, PermissionItem, SuperPermission } from './utils';
import {
  useCreateOrUpdatePermission,
  useDeletePermission,
  usePermission,
} from './usePermission';
import DrawerForm from '@/components/DrawerForm/DrawerForm';
import { PermissionCategory } from '@/services/type';

export default function Permission() {
  const { list, menus, actions, loading } = usePermission();
  const { createOrUpdate, loading: actionLoading } =
    useCreateOrUpdatePermission();
  const { deleteAction, loading: deleteLoading } = useDeletePermission();

  const columns = [
    {
      title: '名称',
      dataIndex: 'title',
      key: 'title',
      width: '150px',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: '300px',
    },
    {
      title: '路径',
      dataIndex: 'path',
      key: 'path',
    },
    {
      title: '操作',
      dataIndex: 'actions',
      key: 'actions',
      width: '200px',
      render: (_: any, row: PermissionItem) => (
        <Space>
          <Button
            type="primary"
            size="small"
            onClick={() => onAdd(row.category, row.id, row)}>
            新增
          </Button>
          <Button
            type="ghost"
            size="small"
            onClick={() => {
              onEdit(row);
            }}>
            编辑
          </Button>
          {(!row.children || row.children.length === 0) && (
            <Popconfirm
              title="确认要删除吗？"
              cancelText="no"
              okText="ok"
              onConfirm={() => onDelete(row)}>
              <Button
                loading={deleteLoading}
                type="ghost"
                size="small"
                danger={true}>
                删除
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  const onAdd = (
    category: PermissionCategory,
    parentId: number,
    row?: PermissionItem,
  ) => {
    setVisible(true);
    form.setFieldsValue({
      category,
      parentId,
    });
    if (row) {
      setParent([row]);
    } else {
      setParent([SuperPermission]);
    }
  };

  const onDelete = (row: PermissionItem) => {
    deleteAction(row);
  };

  const onEdit = (row: PermissionItem) => {
    setVisible(true);
    setParent(getPermissionParent(list, row));
    form.setFieldsValue(row);
  };

  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [parent, setParent] = useState<PermissionItem[]>([]);

  const onConfirm = async () => {
    await createOrUpdate(form.getFieldsValue());
    setVisible(false);
  };

  return (
    <>
      <PageHeader
        title="菜单权限"
        extra={
          <Space>
            <Button
              type="primary"
              onClick={() => onAdd(PermissionCategory.Menu, -1)}>
              新增
            </Button>
          </Space>
        }>
        <Table
          loading={loading}
          pagination={false}
          columns={columns}
          dataSource={menus}
        />
      </PageHeader>
      <PageHeader
        title="操作权限"
        extra={
          <Space>
            <Button
              type="primary"
              onClick={() => onAdd(PermissionCategory.Action, -1)}>
              新增
            </Button>
          </Space>
        }>
        <Table
          loading={loading}
          pagination={false}
          columns={columns}
          dataSource={actions}
        />
      </PageHeader>
      <DrawerForm
        title="权限"
        visible={visible}
        confirmButtonProps={{ loading: actionLoading }}
        onConfirm={onConfirm}
        onCancel={() => setVisible(false)}>
        <PermissionForm form={form} isUpdate={true} parent={parent} />
      </DrawerForm>
    </>
  );
}

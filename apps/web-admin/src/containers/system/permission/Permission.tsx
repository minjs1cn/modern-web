import {
  PageHeader,
  Form,
  Table,
  Typography,
  Button,
  Space,
  Popconfirm,
} from 'antd';
import { useState } from 'react';
import PermissionForm from './PermissionForm';
import {
  getPermissionParent,
  mockActions,
  mockMenus,
  mockPermissions,
  PermissionItem,
} from '@/containers/mock';
import DrawerForm from '@/components/DrawerForm/DrawerForm';

const rowSelection = {
  // onChange: (selectedRowKeys, selectedRows) => {
  //   console.log(
  //     `selectedRowKeys: ${selectedRowKeys}`,
  //     'selectedRows: ',
  //     selectedRows,
  //   );
  // },
  // onSelect: (record, selected, selectedRows) => {
  //   console.log(record, selected, selectedRows);
  // },
  // onSelectAll: (selected, selectedRows, changeRows) => {
  //   console.log(selected, selectedRows, changeRows);
  // },
};

export default function Permission() {
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
            onClick={() => onAdd(row.id, row)}>
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
              <Button type="ghost" size="small" danger={true}>
                删除
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  const onAdd = (parentId: number, row?: PermissionItem) => {
    setVisible(true);
    if (row) {
      setParent([row]);
      form.setFieldsValue({
        category: row.category,
        path: row.path,
      });
    }
    form.setFieldsValue({
      parentId,
    });
  };

  const onDelete = (row: PermissionItem) => {
    console.log(row);
  };

  const onEdit = (row: PermissionItem) => {
    console.log(row);
    setVisible(true);
    setParent(getPermissionParent(mockPermissions, row));
    form.setFieldsValue(row);
  };

  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [parent, setParent] = useState<PermissionItem[]>([]);

  return (
    <PageHeader
      title="权限管理"
      extra={
        <Space>
          <Button type="primary">新增</Button>
        </Space>
      }>
      <Typography.Text>菜单权限</Typography.Text>
      <Table
        pagination={false}
        columns={columns}
        rowSelection={{ ...rowSelection }}
        dataSource={mockMenus}
      />
      <Typography.Text>操作权限</Typography.Text>
      <Table
        pagination={false}
        columns={columns}
        rowSelection={{ ...rowSelection }}
        dataSource={mockActions}
      />
      <DrawerForm
        title="权限"
        visible={visible}
        onCancel={() => setVisible(false)}>
        <PermissionForm form={form} isUpdate={true} parent={parent} />
      </DrawerForm>
    </PageHeader>
  );
}

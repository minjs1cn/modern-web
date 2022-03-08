import { PageHeader, Form, Table, Button, Space, Popconfirm } from 'antd';
import { useState } from 'react';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import PermissionForm from './PermissionForm';
import { getPermissionParent, PermissionItem, SuperPermission } from './utils';
import {
  useCreateOrUpdatePermission,
  useDeletePermission,
  usePermission,
} from './usePermission';
import { usePermissionTranslation } from './usePermissionTranslation';
import DrawerForm from '@/components/DrawerForm/DrawerForm';
import { PermissionCategory } from '@/services/type';
import { useNormalTransilation } from '@/hooks/useNormalTransilation';

export default function Permission() {
  const { list, menus, actions, loading } = usePermission();
  const { createOrUpdate, loading: actionLoading } =
    useCreateOrUpdatePermission();
  const { deleteAction } = useDeletePermission();
  const {
    addBtnText,
    saveBtnText,
    cancelBtnText,
    editFormTitle,
    tableActionTitle,
    deleteMessageTitle,
  } = useNormalTransilation();
  const { menuTitle, actionTitle, filedTitle, filedDescription, filedPath } =
    usePermissionTranslation();
  const [form] = Form.useForm();
  const [formVisible, setFormVisible] = useState(false);
  const [parent, setParent] = useState<PermissionItem[]>([]);

  const columns = [
    {
      title: filedTitle,
      dataIndex: 'title',
      key: 'title',
      width: '150px',
    },
    {
      title: filedDescription,
      dataIndex: 'description',
      key: 'description',
      width: '300px',
    },
    {
      title: filedPath,
      dataIndex: 'path',
      key: 'path',
    },
    {
      title: tableActionTitle,
      dataIndex: 'actions',
      key: 'actions',
      width: '200px',
      render: (_: any, row: PermissionItem) => (
        <Space>
          <Button size="small" onClick={() => onAdd(row.category, row.id, row)}>
            <PlusOutlined />
          </Button>
          <Button
            size="small"
            onClick={() => {
              onEdit(row);
            }}>
            <EditOutlined />
          </Button>
          {(!row.children || row.children.length === 0) && (
            <Popconfirm
              title={deleteMessageTitle}
              cancelText="no"
              okText="ok"
              onConfirm={() => onDelete(row)}>
              <Button size="small" danger={true}>
                <DeleteOutlined />
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
    setFormVisible(true);
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

  const onDelete = async (row: PermissionItem) => {
    await deleteAction(row);
  };

  const onEdit = (row: PermissionItem) => {
    setFormVisible(true);
    setParent(getPermissionParent(list, row));
    form.setFieldsValue(row);
  };

  const onConfirm = async () => {
    await createOrUpdate(form.getFieldsValue());
    setFormVisible(false);
  };

  return (
    <>
      <PageHeader
        title={menuTitle}
        extra={
          <Space>
            <Button
              type="primary"
              onClick={() => onAdd(PermissionCategory.Menu, -1)}>
              {addBtnText}
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
        title={actionTitle}
        extra={
          <Space>
            <Button
              type="primary"
              onClick={() => onAdd(PermissionCategory.Action, -1)}>
              {addBtnText}
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
        title={editFormTitle}
        visible={formVisible}
        confirmButtonProps={{ loading: actionLoading }}
        confirmButtonText={saveBtnText}
        cancelButtonText={cancelBtnText}
        onConfirm={onConfirm}
        onCancel={() => setFormVisible(false)}>
        <PermissionForm form={form} isUpdate={true} parent={parent} />
      </DrawerForm>
    </>
  );
}

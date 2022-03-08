import { Form, FormInstance, Input, Select } from 'antd';
import { FC } from 'react';
import { Permission } from '@/services/type';

type PermissionFormProps = {
  form: FormInstance;
  isUpdate?: boolean;
  parent: Permission[];
};

const PermissionForm: FC<PermissionFormProps> = ({
  parent,
  isUpdate,
  form,
}) => (
  <Form layout="vertical" form={form}>
    <Form.Item label="id" name="id" style={{ display: 'none' }}>
      <Input />
    </Form.Item>
    <Form.Item label="权限类别" name="category">
      <Select disabled={isUpdate}>
        <Select.Option value={1}>菜单</Select.Option>
        <Select.Option value={2}>操作</Select.Option>
      </Select>
    </Form.Item>
    <Form.Item label="父级权限" name="parentId">
      <Select>
        {parent.map(({ id, title }) => (
          <Select.Option key={id} value={id}>
            {title}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
    <Form.Item label="权限名称" name="title">
      <Input />
    </Form.Item>
    <Form.Item label="权限路径" name="path">
      <Input />
    </Form.Item>
  </Form>
);
export default PermissionForm;

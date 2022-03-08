import { Form, FormInstance, Input, Select } from 'antd';
import { FC } from 'react';
import { usePermissionTranslation } from './usePermissionTranslation';
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
}) => {
  const {
    filedCategory,
    filedParent,
    filedPath,
    filedTitle,
    actionTitle,
    menuTitle,
  } = usePermissionTranslation();
  return (
    <Form layout="vertical" form={form}>
      <Form.Item label="id" name="id" style={{ display: 'none' }}>
        <Input />
      </Form.Item>
      <Form.Item label={filedCategory} name="category">
        <Select disabled={isUpdate}>
          <Select.Option value={1}>{menuTitle}</Select.Option>
          <Select.Option value={2}>{actionTitle}</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label={filedParent} name="parentId">
        <Select>
          {parent.map(({ id, title }) => (
            <Select.Option key={id} value={id}>
              {title}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label={filedTitle} name="title">
        <Input />
      </Form.Item>
      <Form.Item label={filedPath} name="path">
        <Input />
      </Form.Item>
    </Form>
  );
};
export default PermissionForm;

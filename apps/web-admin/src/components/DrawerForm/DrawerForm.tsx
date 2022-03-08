import { Button, ButtonProps, Drawer, Space } from 'antd';
import { FC } from 'react';

type DrawerFormProps = {
  title: string;
  width?: number;
  visible: boolean;
  cancelButtonText?: string;
  onCancel?: () => void;
  confirmButtonText?: string;
  onConfirm?: () => void;
  confirmButtonProps?: ButtonProps;
};

const DrawerForm: FC<DrawerFormProps> = ({
  title,
  width = 720,
  onCancel,
  onConfirm,
  cancelButtonText = '取消',
  confirmButtonText = '确定',
  visible,
  children,
  confirmButtonProps = {},
}) => (
  <Drawer
    title={title}
    width={width}
    onClose={onCancel}
    visible={visible}
    closable={false}
    extra={
      <Space>
        <Button onClick={onCancel}>{cancelButtonText}</Button>
        <Button type="primary" onClick={onConfirm} {...confirmButtonProps}>
          {confirmButtonText}
        </Button>
      </Space>
    }>
    {children}
  </Drawer>
);

export default DrawerForm;

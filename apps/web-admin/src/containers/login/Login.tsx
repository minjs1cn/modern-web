import { Button, Form, Input, message, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { Link, useParams } from '@modern-js/runtime/router';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import Storage from '@utils/storage';
import { useAppDispatch, useAppSelector } from '@store/index';
import { login } from '@services/login';
import { setUserInfo } from '@store/userSlice';
import styles from './Login.module.scss';
import LoginLayout from '@/components/LoginLayout/LoginLayout';

const loginStorage = Storage.new<AccountState>('_admin_login');
type AccountState = {
  remember: boolean;
  account: string;
  password: string;
};
export default function Login() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const info = useAppSelector(state => state.user.info);
  const { from } = useParams<{ from?: string }>();
  const initialValues = loginStorage.get() || { remember: true };
  const onFinish = async (values: AccountState) => {
    try {
      const data = await login(values);
      if (data) {
        dispatch(setUserInfo(data));
        if (values.remember) {
          loginStorage.set(values);
        }
      } else {
        message.error(t('login.error'));
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (info) {
      if (from) {
        location.href = from;
      } else {
        location.href = '/';
      }
    }
  }, [info]);

  return (
    <LoginLayout>
      <div className={styles.login}>
        <Typography.Title level={2}>{t('login.title')}</Typography.Title>
        <Form
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          initialValues={initialValues}>
          <Form.Item
            name="account"
            rules={[
              { required: true, message: t('login.account.placeholder') },
            ]}>
            <Input
              prefix={<UserOutlined />}
              placeholder={t('login.account.placeholder')}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: t('login.password.placeholder') },
            ]}>
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder={t('login.password.placeholder')}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle={true}>
              <Checkbox>{t('login.remember.me')}</Checkbox>
            </Form.Item>
            <Link to="/admin/forgot" className={styles.forgot}>
              {t('login.password.forgot')}
            </Link>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block={true}>
              {t('login.submit')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </LoginLayout>
  );
}

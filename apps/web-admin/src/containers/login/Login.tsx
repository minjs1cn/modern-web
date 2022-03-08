import { Button, Form, Input, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { Link } from '@modern-js/runtime/router';
import { useTranslation } from 'react-i18next';
import styles from './Login.module.scss';
import LoginLayout from '@/components/LoginLayout/LoginLayout';
import { useLogin } from '@/hooks/useLogin';

export default function Login() {
  const { t } = useTranslation();
  const { login, loginLocalState } = useLogin();

  return (
    <LoginLayout>
      <div className={styles.login}>
        <Typography.Title level={2}>{t('login.title')}</Typography.Title>
        <Form
          name="login"
          onFinish={login}
          autoComplete="off"
          initialValues={loginLocalState}>
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

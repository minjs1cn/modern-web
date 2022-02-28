import { Typography } from 'antd';
import { FC } from 'react';
import BaseLayout from '../BaseLayout/BaseLayout';
import styles from './LoginLayout.module.scss';

const LoginLayout: FC = ({ children }) => (
  <BaseLayout>
    <div className={styles.container}>
      <div className={styles.left}>
        <Typography.Title>管理系统</Typography.Title>
      </div>
      <div className={styles.right}>{children}</div>
    </div>
  </BaseLayout>
);

export default LoginLayout;

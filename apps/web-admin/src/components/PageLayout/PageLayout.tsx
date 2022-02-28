import { Link, useLocation } from '@modern-js/runtime/router';
import { Layout, Menu } from 'antd';
import { FC } from 'react';
import BaseLayout from '../BaseLayout/BaseLayout';
import styles from './PageLayout.module.less';

export type MenuAttributes = {
  path: string;
  title: string;
  icon?: JSX.Element;
  children?: MenuAttributes[];
};

function renderMenuItem(item: MenuAttributes) {
  if (item.children) {
    return (
      <Menu.SubMenu key={item.path} icon={item.icon} title={item.title}>
        {item.children.map(renderMenuItem)}
      </Menu.SubMenu>
    );
  }
  return (
    <Menu.Item key={item.path} icon={item.icon} title={item.title}>
      <Link to={item.path}>{item.title}</Link>
    </Menu.Item>
  );
}

const menuMap = new Map<string, MenuAttributes>();

function findItemParent(menus: MenuAttributes[], path: string) {
  if (menuMap.has(path)) {
    return menuMap.get(path) as MenuAttributes;
  }

  if (path === '/home') {
    return menus[0];
  }

  for (const item of menus) {
    if (item.path === path) {
      return item;
    }
    if (item.children) {
      const subItem = findItemParent(item.children, path);
      if (subItem) {
        return item;
      }
    }
  }
  return null;
}

type PageLayoutProps = {
  navTitle?: string;
  menus: MenuAttributes[];
};

const PageLayout: FC<PageLayoutProps> = ({
  navTitle = 'Admin',
  menus = [],
  children,
}) => {
  const { pathname } = useLocation();
  const menu = findItemParent(menus, pathname);

  return (
    <BaseLayout>
      <Layout
        style={{
          minHeight: '100%',
        }}>
        <Layout.Header>
          <div className={styles.navbar}>
            <div className={styles.navbar__logo}>
              <Link to="/">
                <img
                  src="https://unpkg.byted-static.com/latest/byted/arco-config/assets/favicon.ico"
                  alt="logo"
                />
              </Link>
              <span>{navTitle}</span>
            </div>
            <div className={styles.navbar__tool}></div>
          </div>
        </Layout.Header>
        <Layout hasSider={true}>
          <Layout.Sider theme="light">
            <Menu
              mode="inline"
              defaultOpenKeys={menu ? [menu.path] : []}
              defaultSelectedKeys={[pathname]}>
              {menus.map(renderMenuItem)}
            </Menu>
          </Layout.Sider>
          <Layout style={{ padding: 16 }}>
            <Layout.Content style={{ background: '#fff' }}>
              {children}
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    </BaseLayout>
  );
};

export default PageLayout;

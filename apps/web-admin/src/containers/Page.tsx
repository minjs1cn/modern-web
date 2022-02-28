import loadable from '@modern-js/runtime/loadable';
import { Redirect, Route, Switch } from '@modern-js/runtime/router';
import { useTranslation, TFunction } from 'react-i18next';
import PageLayout, { MenuAttributes } from '@/components/PageLayout/PageLayout';
import icons from '@/utils/icons';

const routes = [
  {
    path: '/home',
    component: loadable(() => import('./home/Home')),
  },
  {
    path: '/system/permission',
    component: loadable(() => import('./system/permission/Permission')),
  },
  {
    path: '/system/role',
    component: loadable(() => import('./system/role/Role')),
  },
];

const MockMenus: MenuAttributes[] = [
  {
    path: '/shop',
    title: 'menu.shop',
    icon: icons.user,
    children: [
      {
        path: '/shop/list',
        title: 'menu.shop.list',
      },
      {
        path: '/shop/product',
        title: 'menu.shop.product',
      },
    ],
  },
  {
    path: '/system',
    title: 'menu.system',
    icon: icons.setting,
    children: [
      {
        path: '/system/permission',
        title: 'menu.system.permission',
      },
      {
        path: '/system/role',
        title: 'menu.system.role',
      },
      {
        path: '/system/user',
        title: 'menu.system.user',
      },
    ],
  },
  {
    path: '/shop',
    title: 'menu.shop',
    icon: icons.user,
    children: [
      {
        path: '/shop/list',
        title: 'menu.shop.list',
      },
      {
        path: '/shop/product',
        title: 'menu.shop.product',
      },
    ],
  },
  {
    path: '/shop',
    title: 'menu.shop',
    icon: icons.user,
    children: [
      {
        path: '/shop/list',
        title: 'menu.shop.list',
      },
      {
        path: '/shop/product',
        title: 'menu.shop.product',
      },
    ],
  },
  {
    path: '/shop',
    title: 'menu.shop',
    icon: icons.user,
    children: [
      {
        path: '/shop/list',
        title: 'menu.shop.list',
      },
      {
        path: '/shop/product',
        title: 'menu.shop.product',
      },
    ],
  },
  {
    path: '/shop',
    title: 'menu.shop',
    icon: icons.user,
    children: [
      {
        path: '/shop/list',
        title: 'menu.shop.list',
      },
      {
        path: '/shop/product',
        title: 'menu.shop.product',
      },
    ],
  },
];

function menusTranslation(menus: MenuAttributes[], t: TFunction<'transition'>) {
  menus.forEach(menu => {
    menu.title = t(menu.title);
    if (menu.children) {
      menusTranslation(menu.children, t);
    }
  });
  return menus;
}

export default function Page() {
  const { t } = useTranslation();
  const menus = menusTranslation(MockMenus, t);

  return (
    <PageLayout menus={menus}>
      <Switch>
        {routes.map(route => (
          <Route key={route.path} {...route} />
        ))}
        <Route exact={true} path="/">
          <Redirect to={`/home`} />
        </Route>
        <Route path="*" component={loadable(() => import('./Error'))} />
      </Switch>
    </PageLayout>
  );
}

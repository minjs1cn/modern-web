import loadable from '@modern-js/runtime/loadable';
import { Redirect, Route, Switch } from '@modern-js/runtime/router';
import PageLayout from '@/components/PageLayout/PageLayout';
import { useAuthMenus } from '@/hooks/useAuth';
import { useIsLogin } from '@/hooks/useIsLogin';
import LoadingOverlay from '@/components/LoadingOverlay/LoadingOverlay';

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
  {
    path: '/system/user',
    component: loadable(() => import('./system/user/User')),
  },
];

export default function Page() {
  useIsLogin();
  const { userMenus } = useAuthMenus();

  if (userMenus.length === 0) {
    return <LoadingOverlay fullscreen={true} />;
  }

  return (
    <PageLayout menus={userMenus}>
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

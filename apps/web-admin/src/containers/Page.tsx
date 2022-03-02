import loadable from '@modern-js/runtime/loadable';
import { Redirect, Route, Switch } from '@modern-js/runtime/router';
import { mockMenus } from './mock';
import PageLayout from '@/components/PageLayout/PageLayout';

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

// function menusTranslation(menus: MenuAttributes[], t: TFunction<'transition'>) {
//   menus.forEach(menu => {
//     menu.title = t(menu.title);
//     if (menu.children) {
//       menusTranslation(menu.children, t);
//     }
//   });
//   return menus;
// }

export default function Page() {
  // const { t } = useTranslation();
  // const menus = menusTranslation(MockMenus, t);

  return (
    <PageLayout menus={mockMenus}>
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

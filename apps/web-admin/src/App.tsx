import { Route, Switch } from '@modern-js/runtime/router';
import loadable from '@modern-js/runtime/loadable';
import { Provider } from 'react-redux';
import '@/utils/i18n';
import { ConfigProvider } from 'antd';

import store from '@store/index';

import './App.css';
import '@styles/reset.less';

const Page = loadable(() => import('./containers/Page'));
const Login = loadable(() => import('./containers/login/Login'));

const App = () => (
  <ConfigProvider>
    <Provider store={store}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Page} />
      </Switch>
    </Provider>
  </ConfigProvider>
);

export default App;

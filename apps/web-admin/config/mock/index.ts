import { mockPermissions } from './permission';

export default {
  'post /api/login': (req, res) => {
    setTimeout(() => {
      res.end(JSON.stringify({
        code: 0,
        data: {
          token: 'token',
          info: {
            id: 1,
            name: 'zhangmin',
            account: 'admin',
          },
          permissions: mockPermissions,
        },
        message: 'success',
      }));
    }, 1000);
  },
  'post /api/isLogin': (req, res) => {
    setTimeout(() => {
      res.end(JSON.stringify({
        code: 0,
        data: {
          token: 'token',
          info: {
            id: 1,
            name: 'zhangmin',
            account: 'admin',
          },
          permissions: mockPermissions,
        },
        message: 'success',
      }));
    }, 1000);
  },
  'get /api/system/permission': (req, res) => {
    setTimeout(() => {
      res.end(JSON.stringify({
        code: 0,
        data: mockPermissions,
        message: 'success',
      }));
    }, 1000);
  },
  'put /api/system/permission': (req, res) => {
    setTimeout(() => {
      res.end(JSON.stringify({
        code: 0,
        data: {},
        message: 'success',
      }));
    }, 1000);
  },
  'post /api/system/permission': (req, res) => {
    setTimeout(() => {
      res.end(JSON.stringify({
        code: 0,
        data: {},
        message: 'success',
      }));
    }, 1000);
  },
  'delete /api/system/permission': (req, res) => {
    setTimeout(() => {
      res.end(JSON.stringify({
        code: 0,
        data: {},
        message: 'success',
      }));
    }, 1000);
  },
}

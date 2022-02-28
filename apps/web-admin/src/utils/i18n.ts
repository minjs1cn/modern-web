import { use } from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

use(initReactI18next)
  .use(HttpBackend)
  .init({
    fallbackLng: 'zh_CN',
    // debug: true,
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    react: {
      useSuspense: false,
    },
  });

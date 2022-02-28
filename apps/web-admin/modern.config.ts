import { defineConfig } from '@modern-js/app-tools';

export default defineConfig({
  server: {
    port: 2021,
  },
  tools: {
    // less: {
    //   lessOptions: {
    //     javascriptEnabled: true,
    //     modifyVars: require('antd/dist/default-theme'),
    //   },
    // },
  },
});

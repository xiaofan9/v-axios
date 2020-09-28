import axios from 'axios';

function VAxios(app) {
  if (vAxios.installed) {
    //防止重复注入插件
    return;
  }

  app.axios = axios;
  app.config.globalProperties.$http = axios;

  vAxios.installed = true;
}

export default VAxios;

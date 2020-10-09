import axios from 'axios';

function VAxios(app, axios_) {
  if (vAxios.installed) {
    //防止重复注入插件
    return;
  }

  app.axios = axios_ || axios;
  app.config.globalProperties.$http = axios_ || axios;

  vAxios.installed = true;
}

export default VAxios;

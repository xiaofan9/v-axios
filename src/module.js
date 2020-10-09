import axios from 'axios';

var isInstall = false;

export default {
  install(Vue, axios_) {
    if(!isInstall) {
       // 全局添加
      Vue.axios = axios_ || axios;

      Vue.prototype.$http = axios_ || axios;

      isInstall = true;
    }
  }
};

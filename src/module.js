import Vue from 'vue';
import axios from 'axios';

var isInstall = false;

export default {
  install() {
    if(!isInstall) {
       // 全局添加
      Vue.axios = axios;

      Vue.prototype.$http = axios;

      isInstall = true;
    }
  }
};

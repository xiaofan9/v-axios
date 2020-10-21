var _window, _window$Vue;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, 'startsWith', {
    value: function value(search, pos) {
      pos = !pos || pos < 0 ? 0 : +pos;
      return this.substring(pos, pos + search.length) === search;
    }
  });
}

var vueVersion = ((_window = window) === null || _window === void 0 ? void 0 : (_window$Vue = _window.Vue) === null || _window$Vue === void 0 ? void 0 : _window$Vue.version) || '';

function vAxios(app, axios) {
  if (vAxios.installed) {
    //防止重复注入插件
    return;
  }

  var tmpAxios = axios;

  if (!tmpAxios) {
    if (typeof window !== 'undefined' && window.axios) {
      tmpAxios = window.axios;
    } else if (require) {
      tmpAxios = require('axios');
    }
  }

  if (!tmpAxios) {
    return console.error("你没有安装或者卸载了 axios，本插件依赖于 axios！");
  }

  var vueVersion = (app === null || app === void 0 ? void 0 : app.version) || '';

  if ((vueVersion === null || vueVersion === void 0 ? void 0 : vueVersion.startsWith('3.')) && _typeof(app) === 'object') {
    app.config.globalProperties.$http = tmpAxios;
  }

  if ((vueVersion === null || vueVersion === void 0 ? void 0 : vueVersion.startsWith('2.')) && typeof app === 'function') {
    app.prototype.$http = tmpAxios;
  }

  app.axios = tmpAxios;
  vAxios.installed = true;
}
/* istanbul ignore if */


if (typeof window !== 'undefined' && window.axios && window.Vue) {
  if (vueVersion === null || vueVersion === void 0 ? void 0 : vueVersion.startsWith('2.')) {
    vAxios(window.Vue, window.axios);
  }
}

export default vAxios;
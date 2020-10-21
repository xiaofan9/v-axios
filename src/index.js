if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, 'startsWith', {
      value: function(search, pos) {
          pos = !pos || pos < 0 ? 0 : +pos;
          return this.substring(pos, pos + search.length) === search;
      }
  });
}

let vueVersion = window?.Vue?.version || '';

function vAxios(app, axios) {
  if (vAxios.installed) {
    //防止重复注入插件
    return;
  }

  let tmpAxios = axios;

  if(!tmpAxios) {
    if(typeof window !== 'undefined' && window.axios) {
      tmpAxios = window.axios;
    } else if(require) {
      tmpAxios = require('axios');
    }
  }

  if(!tmpAxios) {
    return console.error("你没有安装或者卸载了 axios，本插件依赖于 axios！")
  }

  const vueVersion = app?.version || '';
  
  if(vueVersion?.startsWith('3.') && typeof app === 'object') {
    app.config.globalProperties.$http = tmpAxios;
  }

  if(vueVersion?.startsWith('2.') && typeof app === 'function') {
    app.prototype.$http = tmpAxios;
  }
  
  app.axios = tmpAxios;
  vAxios.installed = true;
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.axios && window.Vue) {
  if(vueVersion?.startsWith('2.')) {
    vAxios(window.Vue, window.axios);
  }
}

export default vAxios;

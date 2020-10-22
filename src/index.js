if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, "startsWith", {
    value: function (search, pos) {
      pos = !pos || pos < 0 ? 0 : +pos;
      return this.substring(pos, pos + search.length) === search;
    },
  });
}

export const version = "3.0.1";

let vueVersion = window?.Vue?.version || "";

function vAxios(app, axios) {
  let tmpAxios = axios;

  if (!tmpAxios) {
    if (typeof window !== "undefined" && window.axios) {
      tmpAxios = window.axios;
    } else if (require) {
      tmpAxios = require("axios");
    }
  }

  if (!tmpAxios) {
    return console.error("你没有安装或者卸载了 axios，本插件依赖于 axios！");
  }

  const vueVersion = app?.version || "";

  if (vueVersion?.startsWith("3.") && typeof app === "object") {
    app.config.globalProperties.$http = tmpAxios;
  }

  if (vueVersion?.startsWith("2.") && typeof app === "function") {
    app.prototype.$http = tmpAxios;
  }

  app.axios = tmpAxios;
}

// window环境且vue版本为2.x，自动注册；
if (typeof window !== "undefined" && window.axios && window.Vue) {
  if (vueVersion?.startsWith("2.")) {
    vAxios(window.Vue, window.axios);
  }
}

export default {
  install: vAxios,
  version,
};

export const install = vAxios;

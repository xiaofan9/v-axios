if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, "startsWith", {
    value: function (search, pos) {
      pos = !pos || pos < 0 ? 0 : +pos;
      return this.substring(pos, pos + search.length) === search;
    },
  });
}

import pkg from "../package.json";

const version = pkg.version;
const vueVersion = window?.Vue?.version || "";
const cancelList = new Map();
const queryMethodList = ["get", "delete", "head", "options"];

let axios, instance, request, get, post, reqInterceptor, resInterceptor;

getAxios();

const CancelToken = axios.CancelToken;

cAxios();

function getAxios(axios_) {
  axios = axios_;

  if (!axios) {
    if (typeof window !== "undefined" && window.axios) {
      axios = window.axios;
    } else if (require) {
      axios = require("axios");
    }
  }

  if (!axios) {
    console.error("你没有安装或者卸载了 axios，本插件依赖于 axios！");

    return;
  }

  return axios;
}

function register(app, axios) {
  const vueVersion = app?.version || "";

  if (vueVersion?.startsWith("3.") && typeof app === "object") {
    app.config.globalProperties.$http = axios;
  }

  if (vueVersion?.startsWith("2.") && typeof app === "function") {
    app.prototype.$http = axios;
  }

  app.axios = axios;
}

function install(app, axios) {
  let tmpAxios = getAxios(axios);

  if (!tmpAxios) {
    return;
  }

  register(app, tmpAxios);
}

function cancelRepeat(axios) {
  reqInterceptor = axios.interceptors.request.use([
    (config) => {
      if (isCancelRepeat) {
        const source = CancelToken.source();
        const key = config.method + ": " + config.url;

        if (cancelList.has(key)) {
          const source = cancelList.get(key);

          source.cancel("取消重复的请求，" + key);
        }

        cancelList.set(key, source);
        config.cancelToken = source.token;
      }

      return Promise.resolve(config);
    },
  ]);

  resInterceptor = axios.interceptors.response.use([
    (res) => {
      const config = res.config;

      handleDelReqList(config);

      return Promise.resolve(res);
    },
    (err) => {
      const config = err.config;

      if (config) {
        handleDelReqList(config);
      }

      return Promise.reject(err);
    },
  ]);
}

function cAxios(config) {
  if(instance) {
    if(reqInterceptor) {
      instance.interceptors.request.eject(instance);
    }
    if(resInterceptor) {
      instance.interceptors.response.eject(resInterceptor);
    }
  }

  const isCancelRepeat = config.cancelRepeat || false;
  instance = axios.create(config || {});
  instance.prototype.all = axios.all;
  instance.prototype.spread = axios.spread;

  if(isCancelRepeat) {
    cancelRepeat(instance);
  }

  request = (url, method) => {
    const isQuery = queryMethodList.includes(method.toLocaleLowerCase());

    return (data = {}, opts = {}): AxiosPromise => {
      return instance({
        url,
        method,
        ...(isQuery ? { params: data } : { data }),
        ...opts,
      }).then(({ data = {} }) => data);
    };
  };

  get = (url) => request(url, "get");
  post = (url) => request(url, "post");

  return {
    request,
    get,
    post,
    axios: instance,
  };
}

// window环境且vue版本为2.x，自动注册；
if (typeof window !== "undefined" && window.axios && window.Vue) {
  if (vueVersion?.startsWith("2.")) {
    install(window.Vue, window.axios);
  }
}

export default {
  install,
  version,
};

export { install, cAxios, version, axios: instance, request, get, post };

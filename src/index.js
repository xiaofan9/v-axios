/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import pkg from "../package.json";

const version = pkg.version;
const vueVersion = window?.Vue?.version || "";
const cancelList = new Map();
const queryMethodList = ["get", "delete", "head", "options"];

let axios, axios_, request, get, post, reqInterceptor, resInterceptor;

getAxios();

const CancelToken = axios.CancelToken;

cAxios();

function getAxios(axios) {
  axios_ = axios;

  if (!axios_) {
    if (typeof window !== "undefined" && window.axios) {
      axios_ = window.axios;
    } else if (require) {
      axios_ = require("axios");
    }
  }

  if (!axios_) {
    console.error("你没有安装或者卸载了 axios，本插件依赖于 axios！");

    return;
  }

  return axios_;
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
  const tmpAxios = getAxios(axios);

  if (!tmpAxios) {
    return;
  }

  cAxios();
  register(app, tmpAxios);
}

function handleDelCancelList(config) {
  const key = config.method + ": " + config.url;

  cancelList.delete(key);
}

function cancelRepeat(axios) {
  reqInterceptor = axios.interceptors.request.use([
    (config) => {
      const source = CancelToken.source();
      const key = config.method + ": " + config.url;

      if (cancelList.has(key)) {
        const source = cancelList.get(key);

        source.cancel("取消重复的请求，" + key);
      }

      cancelList.set(key, source);
      config.cancelToken = source.token;

      return Promise.resolve(config);
    },
  ]);

  resInterceptor = axios.interceptors.response.use([
    (res) => {
      const config = res.config;

      handleDelCancelList(config);

      return Promise.resolve(res);
    },
    (err) => {
      const config = err.config;

      if (config) {
        handleDelCancelList(config);
      }

      return Promise.reject(err);
    },
  ]);
}

function cAxios(config) {
  if (axios) {
    if (reqInterceptor) {
      axios.interceptors.request.eject(reqInterceptor);
    }
    if (resInterceptor) {
      axios.interceptors.response.eject(resInterceptor);
    }
  }

  const isCancelRepeat = config.cancelRepeat || false;
  axios = axios_.create(config || {});

  // 为实例手动添加 methods
  axios.prototype.create = axios_.create;
  axios.prototype.Cancel = axios_.Cancel;
  axios.prototype.CancelToken = axios_.CancelToken;
  axios.prototype.isCancel = axios_.isCancel;
  axios.prototype.all = axios_.all;
  axios.prototype.spread = axios_.spread;

  if (isCancelRepeat) {
    cancelRepeat(axios);
  }

  request = (url, method) => {
    const isQuery = queryMethodList.includes(method.toLocaleLowerCase());

    return (data = {}, opts = {}) => {
      return axios({
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
    axios,
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

export { install, cAxios, version, axios, request, get, post };

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import pkg from "../package.json";

const version = pkg.version;
const cancelList = new Map();
const queryMethodList = ["get", "delete", "head", "options"];

let reqInterceptor,
  resInterceptor,
  axios_ = getAxios();

function getAxios(axios) {
  let axios_ = axios;

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
}

function install(app, axios) {
  const tmpAxios = getAxios(axios);

  if (!tmpAxios) {
    return;
  }

  register(app, tmpAxios);
}

function handleDelCancelList(config) {
  const key = config.method + ": " + config.url;

  cancelList.delete(key);
}

function cancelRepeat(axios) {
  const CancelToken = axios.CancelToken;

  axios.interceptors.request.eject(reqInterceptor);
  axios.interceptors.response.eject(resInterceptor);

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

function cAxios(config = {}, axios) {
  const isCancelRepeat = config.cancelRepeat || false;
  const obj = {};

  if (axios) {
    obj.axios = axios;
  }

  if (!obj.axios) {
    const axios = (obj.axios = axios_.create(config));

    // 为实例手动添加 methods
    axios.prototype.create = axios_.create;
    axios.prototype.Cancel = axios_.Cancel;
    axios.prototype.CancelToken = axios_.CancelToken;
    axios.prototype.isCancel = axios_.isCancel;
    axios.prototype.all = axios_.all;
    axios.prototype.spread = axios_.spread;
  }

  if (isCancelRepeat) {
    cancelRepeat(obj.axios);
  }

  obj.request = (url, method) => {
    const isQuery = queryMethodList.includes(method.toLocaleLowerCase());

    return (data, opts = {}) => {
      return obj
        .axios({
          url,
          method,
          ...(data ? (isQuery ? { params: data } : { data }) : {}),
          ...opts,
        })
        .then((res = {}) => {
          const data = res?.data ?? {};
          data.__$res = res;

          Reflect.deleteProperty(data.__$res, "data");

          return data;
        });
    };
  };

  obj.get = (url) => obj.request(url, "get");
  obj.post = (url) => obj.request(url, "post");

  return {
    get: obj.get,
    post: obj.post,
    request: obj.request,
  };
}

// window环境且vue版本为2.x，自动注册；
if (typeof window !== "undefined" && window.axios && window.Vue) {
  const vueVersion = window.Vue?.version || "";

  if (vueVersion?.startsWith("2.")) {
    install(window.Vue, window.axios);
  }
}

export default {
  install,
  version,
};

export const axios = axios_;

export { install, cAxios, version };

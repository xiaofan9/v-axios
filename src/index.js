(function () {
  var axios = typeof require === "function" ? require("axios") : window.axios;

  function vAxios() {
    if (!axios) return console.error("你没有安装或者卸载了 axios，本插件依赖于 axios！");

    if (vAxios.installed) {
      //防止重复注入插件
      return;
    }

    app.axios = axios;
    app.config.globalProperties.$http = axios;

    vAxios.installed = true;
  }

  // comJs
  if (typeof exports == "object") {
    module.exports = vAxios;
  } else if (typeof define == "function" && define.amd) {
    // amd
    define([], function () {
      return vAxios;
    });
  } else if (window.Vue) {
    // 浏览器引入，自动注册插件
    window.vAxios = vAxios;
    Vue.use(vAxios);
  }
})();

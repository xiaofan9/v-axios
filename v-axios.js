(function() {
    /**
     * Install plugin
     * @param Vue
     * @param axios
     */

    var axios = typeof require === 'function' ?
        require('axios') :
        window.axios

    function vAxios(Vue) {
        if (vAxios.installed) { //防止重复注入插件
            return;
        }

        if (!axios)
            return console.error('你没有安装或者卸载了 axios ,本插件依赖于 axios')

        Vue.axios = axios; // 全局添加 ， 为了全局使用

        Vue.prototype.$http = axios;

        vAxios.installed = true;
    }

    if (typeof exports == "object") module.exports = vAxios // comJs
    else if (typeof define == "function" && define.amd) define([], function() { return vAxios }) // amd
    else if (window.Vue) { // 浏览器引入，自动注册插件
        window.vAxios = vAxios
        Vue.use(vAxios);
    }
})()
var global,factory;global=this,factory=function(exports,require$$0){"use strict";function _interopDefaultLegacy(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var require$$0__default=_interopDefaultLegacy(require$$0);function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _typeof(obj){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj})(obj)}function commonjsRequire(target){throw new Error('Could not dynamically require "'+target+'". Please configure the dynamicRequireTargets option of @rollup/plugin-commonjs appropriately for this require call to behave properly.')}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}var reqInterceptor,resInterceptor,cancelList=new Map,queryMethodList=["get","delete","head","options"],axios_=getAxios();function getAxios(axios){var axios_=axios;if(axios_||("undefined"!=typeof window&&window.axios?axios_=window.axios:commonjsRequire&&(axios_=require$$0__default.default)),axios_)return axios_;console.error("你没有安装或者卸载了 axios，本插件依赖于 axios！")}function install(app,axios){var tmpAxios=getAxios(axios);tmpAxios&&function(app,axios){var vueVersion=(null==app?void 0:app.version)||"";null!=vueVersion&&vueVersion.startsWith("3.")&&"object"===_typeof(app)&&(app.config.globalProperties.$http=axios),null!=vueVersion&&vueVersion.startsWith("2.")&&"function"==typeof app&&(app.prototype.$http=axios)}(app,tmpAxios)}function handleDelCancelList(config){var key=config.method+": "+config.url;cancelList.delete(key)}function cancelRepeat(axios){var CancelToken=axios.CancelToken;axios.interceptors.request.eject(reqInterceptor),axios.interceptors.response.eject(resInterceptor),reqInterceptor=axios.interceptors.request.use([function(config){var source=CancelToken.source(),key=config.method+": "+config.url;return cancelList.has(key)&&cancelList.get(key).cancel("取消重复的请求，"+key),cancelList.set(key,source),config.cancelToken=source.token,Promise.resolve(config)}]),resInterceptor=axios.interceptors.response.use([function(res){return handleDelCancelList(res.config),Promise.resolve(res)},function(err){var config=err.config;return config&&handleDelCancelList(config),Promise.reject(err)}])}if("undefined"!=typeof window&&window.axios&&window.Vue){var _window$Vue,vueVersion=(null===(_window$Vue=window.Vue)||void 0===_window$Vue?void 0:_window$Vue.version)||"";null!=vueVersion&&vueVersion.startsWith("2.")&&install(window.Vue,window.axios)}var index={install:install,version:"3.0.5-beta.5"},axios=axios_;exports.axios=axios,exports.cAxios=function(){var config=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},axios=arguments.length>1?arguments[1]:void 0,isCancelRepeat=config.cancelRepeat||!1,obj={};if(axios&&(obj.axios=axios),!obj.axios){var _axios=obj.axios=axios_.create(config);_axios.prototype.create=axios_.create,_axios.prototype.Cancel=axios_.Cancel,_axios.prototype.CancelToken=axios_.CancelToken,_axios.prototype.isCancel=axios_.isCancel,_axios.prototype.all=axios_.all,_axios.prototype.spread=axios_.spread}return isCancelRepeat&&cancelRepeat(obj.axios),obj.request=function(url,method){var isQuery=queryMethodList.includes(method.toLocaleLowerCase());return function(){var data=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},opts=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return obj.axios(_objectSpread(_objectSpread({url:url,method:method},isQuery?{params:data}:{data:data}),opts)).then((function(){var _res$data,res=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},data=null!==(_res$data=null==res?void 0:res.data)&&void 0!==_res$data?_res$data:{};return data.__$res=res,data}))}},obj.get=function(url){return obj.request(url,"get")},obj.post=function(url){return obj.request(url,"post")},{get:obj.get,post:obj.post,request:obj.request}},exports.default=index,exports.install=install,exports.version="3.0.5-beta.5",Object.defineProperty(exports,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?factory(exports,require("axios")):"function"==typeof define&&define.amd?define(["exports","axios"],factory):factory((global="undefined"!=typeof globalThis?globalThis:global||self).CAxios={},global.Axios);

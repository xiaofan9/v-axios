import require$$0 from"axios";var defineProperty=function(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj};function commonjsRequire(target){throw new Error('Could not dynamically require "'+target+'". Please configure the dynamicRequireTargets option of @rollup/plugin-commonjs appropriately for this require call to behave properly.')}var _typeof_1=function(fn){var module={exports:{}};return fn(module,module.exports),module.exports}((function(module){function _typeof(obj){return module.exports=_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}module.exports=_typeof}));function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}var reqInterceptor,resInterceptor,version$1="3.0.5-beta.1",cancelList=new Map,queryMethodList=["get","delete","head","options"],axios_=getAxios();function getAxios(axios){var axios_=axios;if(axios_||("undefined"!=typeof window&&window.axios?axios_=window.axios:commonjsRequire&&(axios_=require$$0)),axios_)return axios_;console.error("你没有安装或者卸载了 axios，本插件依赖于 axios！")}function install(app,axios){var tmpAxios=getAxios(axios);tmpAxios&&function(app,axios){var vueVersion=(null==app?void 0:app.version)||"";null!=vueVersion&&vueVersion.startsWith("3.")&&"object"===_typeof_1(app)&&(app.config.globalProperties.$http=axios),null!=vueVersion&&vueVersion.startsWith("2.")&&"function"==typeof app&&(app.prototype.$http=axios)}(app,tmpAxios)}function handleDelCancelList(config){cancelList.delete(config.method+": "+config.url)}function cancelRepeat(axios){var CancelToken=axios.CancelToken;axios.interceptors.request.eject(reqInterceptor),axios.interceptors.response.eject(resInterceptor),reqInterceptor=axios.interceptors.request.use([function(config){var source=CancelToken.source(),key=config.method+": "+config.url;cancelList.has(key)&&cancelList.get(key).cancel("取消重复的请求，"+key);return cancelList.set(key,source),config.cancelToken=source.token,Promise.resolve(config)}]),resInterceptor=axios.interceptors.response.use([function(res){return handleDelCancelList(res.config),Promise.resolve(res)},function(err){var config=err.config;return config&&handleDelCancelList(config),Promise.reject(err)}])}function cAxios(){var config=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},axios=arguments.length>1?arguments[1]:void 0,isCancelRepeat=config.cancelRepeat||!1,obj={};if(axios&&(obj.axios=axios),!obj.axios){var _axios=obj.axios=axios_.create(config);_axios.prototype.create=axios_.create,_axios.prototype.Cancel=axios_.Cancel,_axios.prototype.CancelToken=axios_.CancelToken,_axios.prototype.isCancel=axios_.isCancel,_axios.prototype.all=axios_.all,_axios.prototype.spread=axios_.spread}return isCancelRepeat&&cancelRepeat(obj.axios),obj.request=function(url,method){var isQuery=queryMethodList.includes(method.toLocaleLowerCase());return function(){var data=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},opts=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return obj.axios(_objectSpread(_objectSpread({url,method},isQuery?{params:data}:{data}),opts)).then((function(_ref){var _ref$data=_ref.data;return void 0===_ref$data?{}:_ref$data}))}},obj.get=function(url){return obj.request(url,"get")},obj.post=function(url){return obj.request(url,"post")},obj}if("undefined"!=typeof window&&window.axios&&window.Vue){var _window$Vue,vueVersion=(null===(_window$Vue=window.Vue)||void 0===_window$Vue?void 0:_window$Vue.version)||"";null!=vueVersion&&vueVersion.startsWith("2.")&&install(window.Vue,window.axios)}var index={install,version:version$1},axios=axios_;export default index;export{axios,cAxios,install,version$1 as version};

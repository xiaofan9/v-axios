# v-axios

## 简介
由 axios 搬运而成的vue插件【别名：[vue-axios3](https://www.npmjs.com/package/vue-axios3)】<br />
初衷就是让大家可以更语义的在 vue 引入 axios插件，以便更方便、快捷开发。<br />
目前已经支持在其他框架（如react）以及node环境下使用部分功能。

## 安装 && 引入

> * 安装

``` bash
npm install axios v-axios --save
```

> * 引入

```javascript
import vAxios from 'v-axios';
// 不引入这个将自动注入axios
import axios from 'axios';
```

> * cdn引入

```html
<script src="https://unpkg.com/axios"></script>
<script src="https://unpkg.com/v-axios"></script>
```

## 通用

提供了一个通用的cAxios方法，这个方法暴露出了简单封装的get, post, request等方法；还可以通过配置可以开启取消重复的请求。

#### 引用

```javascript
import { cAxios } from 'v-axios';
import axios from 'axios';

const { get, post, request } = cAxios(config, axios);

// config，非必填，值如下
// {
//   cancelRepeat: true // 取消重复的请求
//   ... AxiosRequestConfig // axios的请求参数 
// }

// axios，非必填，当不传值时将会使用v-axios内部引入的axios

import { axios } from 'v-axios'; // 相当于 import axios from 'axios'; 但不建议这种写法
```
#### 示例
```javascript
import { cAxios } from 'v-axios';
import axios from 'axios';

const { get, post, request } = cAxios(config, axios);

// get 示例
export const getList = get(url); 
const pr = getList(params, opt) // 返回一个Promise，其中params 为 get 请求参数，opt 为 axios的请求参数

// post 示例，与get类似
export const updateList = post(url);
const pr = updateList(data, opt); // 返回一个Promise

// request 示例
export const deleteList = request(url, method); // url 请求url；method请求方法，如method: delete
const pr = deleteList(params, opt); // 返回一个Promise

// get/post/request 执行后返回的 Promise 的使用
pr.then((data) => {
  console.log(data); // data为请求res.data的值，res在data.__$res
})
```


## Vue 使用

#### Vue 兼容

|Vue \ vAxios|1.x|2.x|3.x|
|-|-|-|-|
|2.x|&#10004;|&#10060;|&#10004;|
|3.x|&#10060;|&#10004;|&#10004;|

#### 建议

使用3.0版本，支持vue2、vue3

#### 引入

```javascript
// 不引入这个将自动注入axios
import axios from 'axios';

// 使用 Vue 2:
import Vue from 'vue';

// 第二个参数可选
Vue.use(vAxios[, axios]);

// 使用 Vue 3:
import { createApp } from 'vue';

const app = createApp(...);
// 第二个参数可选
app.use(vAxios[, axios]);
```

#### 调用

Vue.axios/app.axios 以及 this.$http 均可调用

示例：

```javascript
// Vue.axios / app.axios
Vue.axios.get('xxx').then(res => console.log(res.data));

// this.$http
this.$http.post('xxx').then(res => console.log(res.data)).catch(err => console.log(err));
```

## API

参看 - [axios api](https://github.com/mzabriskie/axios)

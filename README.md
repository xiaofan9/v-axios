# v-axios
由 axios 搬运而成的vue插件 --- v-axios<br />
初衷就是让大家可以更语义的在 vue 引入 axios插件，以便更方便、快捷开发。

## 兼容

|VueJS \ VueAxios|1.x|2.x|
|-|-|-|
|2.x|&#10004;|&#10060;|
|3.x|&#10060;|&#10004;|

## 计划
3.0 将同时支持 vue 2、3

## 安装 && 引入

> * npm

``` bash
npm install v-axios --save
```

```javascript
import vAxios from 'v-axios';
import axios from 'axios';
```

使用 Vue 2:

```javascript
// 第二个参数可选
Vue.use(VueAxios, axios?);
```

使用 Vue 3:

```javascript
import { createApp } from 'vue';

const app = createApp(...);
// 第二个参数可选
app.use(vAxios, axios?);
```

> * 直接引入

```html
<script src="https://unpkg.com/v-axios/dist/v-axios.min.js"></script>
```

## 使用

app.axios 或 this.$http 均可调用

你应该像下面一样使用：

```javascript
// get
// es6 写法
Vue.axios.get('xxx').then(res => console.log(res.data));

// es5 写法
Vue.axios.get('xxx', {
  params: {
    ...
  }
}).then(function (res) {
  console.log(res);
}).catch(function (err) {
  console.log(err);
});

// post
// es6 写法
this.$http.post('xxx').then(res => console.log(res.data)).catch(err => console.log(err)});

// es5 写法
this.$http.post('xxx', {
  ...
}).then(function (res) {
  console.log(res);
}).catch(function (err) {
  console.log(err);
});
```

## API

参看 - [axios api](https://github.com/mzabriskie/axios)

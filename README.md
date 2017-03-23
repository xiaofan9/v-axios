# v-axios (基于axios(官方推荐ajax工具)的vue插件
Can you read Chinese？<br />
Not？Teach you a simple way to press the key combination command/Ctrl + F4.<br />
没问题？请您继续阅读。。。

由 axios 搬运而成的vue插件 --- v-axios<br />
初衷就是让大家可以更语义的在 vue 引入 axios插件，小白必用。。。


## 安装 && 引入

> * npm

``` bash
npm install v-axios --save
```

```javascript
import vAxios from 'v-axios';
Vue.use(vAxios);
```

> * 直接引入

```html
<script src="./vue.js"></script>
<script src="./v-axios.js"></script>
```


## 使用

Vue.axios 或 this.$http 均可调用

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

### Node系列之Koa

::: tip
KOA - 基于Node.js平台的下一代web开发框架
:::

#### 一、安装：
1、Koa 依赖 node v7.6.0 或 ES2015及更高版本和 async 方法支持.
```html
=> 时间节点:
2013年12月ES6 草案发布

2015年6月ES6 正式发布，并且更名为“ECMAScript 2015”

2016年6月ES7 发布，又名“ECMAScript 2016”

2017年6月ES8 发布，又名“ECMAScript 2017”  -- ES8新增 async/await

2018年6月ES9 发布，又名“ECMAScript 2018”

2019年6月ES10 发布，又名“ECMAScript 2019”
```
::: tip
=> 时间节点（Node.js):
---- Node.js 7.6.0		2017-02-21
:::



```js
// 2、切换node版本（如果node版本高于此版本则忽略当前命令）
$ nvm install 7

// 3、安装依赖
$ npm i koa

// 4、HelloWorld案例 (my-koa-app.js)：
const Koa = require('koa');
const app = new Koa();
app.use(async ctx => {
  ctx.body = 'Hello World';
});
app.listen(3000);

// 5、运行案例
$ node my-koa-app.js
```

#### 二、Koa的核心：
+ 上下文(Context)
+ 请求(Request)
+ 响应(Response)


参考地址：<br/>
<a href="https://koa.bootcss.com/" target="_blank">Koa（中文版）</a><br />
<a href="https://koajs.com/" target="_blank">Koa（英文版）</a><br />
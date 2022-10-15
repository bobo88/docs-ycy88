## 微前端「qiankun」的实践

::: tip qiankun
一种比较完善的微前端解决方案，使用简单，兼容任意JS框架。

功能完备，几乎包含所有构建微前端系统时所需要的基本能力，如 样式隔离、js 沙箱、预加载等。
:::
qiankun 是一个基于 single-spa 的微前端实现库，旨在帮助大家能更简单、无痛的构建一个生产可用微前端架构系统。

### 一、安装
```js
$ yarn add qiankun  # or npm i qiankun -S
```

### 二、使用
#### 主应用
在主应用中注册微应用：
```js
import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'react app', // app name registered
    entry: '//localhost:7100',
    container: '#yourContainer',
    activeRule: '/yourActiveRule',
  },
  {
    name: 'vue app',
    entry: { scripts: ['//localhost:7100/main.js'] },
    container: '#yourContainer2',
    activeRule: '/yourActiveRule2',
  },
]);

start();
```
当微应用信息注册完之后，一旦浏览器的 url 发生变化，便会自动触发 qiankun 的匹配逻辑，所有 activeRule 规则匹配上的微应用就会被插入到指定的 container 中，同时依次调用微应用暴露出的生命周期钩子。

如果微应用不是直接跟路由关联的时候，你也可以选择手动加载微应用的方式：
```js
import { loadMicroApp } from 'qiankun';

loadMicroApp({
  name: 'app',
  entry: '//localhost:7100',
  container: '#yourContainer',
});
```

#### 微应用
微应用不需要额外安装任何其他依赖即可接入 qiankun 主应用。
```js
// 1. 导出相应的生命周期钩子
// 微应用需要在自己的入口 js (通常就是你配置的 webpack 的 entry js) 导出 bootstrap、mount、unmount 三个生命周期钩子，以供主应用在适当的时机调用。
/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('react app bootstraped');
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  ReactDOM.render(<App />, props.container ? props.container.querySelector('#root') : document.getElementById('root'));
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props) {
  ReactDOM.unmountComponentAtNode(
    props.container ? props.container.querySelector('#root') : document.getElementById('root'),
  );
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
  console.log('update props', props);
}

// 2. 配置微应用的打包工具
// 除了代码中暴露出相应的生命周期钩子之外，为了让主应用能正确识别微应用暴露出来的一些信息，微应用的打包工具需要增加如下配置：
// webpack
const packageName = require('./package.json').name;

module.exports = {
  output: {
    library: `${packageName}-[name]`,
    libraryTarget: 'umd',
    jsonpFunction: `webpackJsonp_${packageName}`,
  },
};
```

### 三、项目实践
#### 步骤一：首先，新建 qiankun-project 文件夹目录

#### 步骤二：初始化「基座项目」并配置
+ 2.1 在 qiankun-project 目录下，运行下面命令
```js
$ vue create micro-main         // 生成一个 基座项目（VUE 3.x版本）
```

+ 2.2 配置「基座项目」：
```js
// 基座配置 1: micro-main/vue.config.js
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false, // 关闭eslint检测
  devServer: {
    port: 8080, // 这里的端口是必须和父应用配置的子应用端口一致
    headers: {
      // 因为qiankun内部请求都是fetch来请求资源，所以子应用必须允许跨域
      'Access-Control-Allow-Origin': '*'
    },
  },
  configureWebpack: {
    output: {
      // 资源打包路径
      library: 'vueApp',
      libraryTarget: 'umd'
    }
  }
})
```

```js
// 基座配置 2: micro-main/src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { registerMicroApps, start } from 'qiankun';

// 在主应用中注册子应用
registerMicroApps(
  [{
    name: 'vueApp',             // 微应用的名称 要求唯一。有多个地方需要使用到它
    entry: '//localhost:8081',  // 通俗理解就是（微应用的访问地址）
    container: '#vue',          // 微应用挂载到主应用上的容器
    activeRule: '/vue',         // 微应用激活条件
  }]
)
// 启动 qiankun
start();

createApp(App).use(router).mount("#base-app");  // 注意：这里的ID名称 app 改为 base-app
```

```html
<!-- 基座配置 3: 修改 micro-main/public/index.html -->

<!-- 将 -->
<div id="app"></div>
<!-- 调整为 -->
<div id="base-app"></div>
```

```xml
<!-- 基座配置 4: micro-main/src/App.vue -->
<template>
  <div>
    <h3>VUE 子应用</h3>
    <!-- 与 基座配置 2 中的「 container: '#vue', 」 保持一致 -->
    <div id="vue" />

    <h3>其他页面</h3>
    <!-- todo -->
  </div>
</template>
```

<!-- ```js
// 基座配置 5: micro-main/src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import type {RouterOptions} from 'vue-router'
import Home from "../views/Home.vue";
type CustomRouterOptions = RouterOptions & {base: string}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = createRouter({
  base: '',
  history: createWebHistory(process.env.BASE_URL),
  routes,
} as CustomRouterOptions);

export default router;
``` -->

#### 步骤三：初始化「子应用项目」并配置
+ 3.1 在 qiankun-project 目录下，运行下面命令
```js
$ vue create micro-vue         // 生成一个 子应用项目（VUE 3.x版本）
```
+ 3.2 配置「子应用项目」：
```js
// 子应用项目配置 1: micro-vue/vue.config.js
const { defineConfig } = require('@vue/cli-service')
const packageName = require('./package.json').name;
 
module.exports = defineConfig({
  lintOnSave: false,
  devServer: {
    port: 8081,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  configureWebpack: {
    output: {
      library: 'vueApp',     // 基座配置 2 中的 「 name: 'vueApp', 」
      libraryTarget: 'umd',
      // jsonpFunction: `webpackJsonp_${packageName}`
      // 注意 webpack 5要用下面的方式
      chunkLoadingGlobal: `webpackJsonp_${packageName}`
    }
  }
})
```

```js
// 子应用项目配置 2: 新建 micro-vue/src/public-path.js 文件
if (window.__POWERED_BY_QIANKUN__) {
  // + 后面的内容是有配置 publicPath 的时候需要使用，没有配置可以不用写
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ + 'vue/' 
}
```

```js
// 子应用项目配置 3: micro-vue/src/main.js
import './public-path';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
 
function render (props = {}) {
  const { container } = props;
  createApp(App)
  .use(router)
  .mount(container ? container.querySelector('#app') : '#app'); // 为了避免根id#app与其他DOM冲突，需要限制查找范围
}
 
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}
 
/**
* bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
* 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
*/
export async function bootstrap() {
  console.log('react app bootstraped');
}
 
/**
* 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
*/
export async function mount(props) {
  console.log('props from main mount', props)
  render(props)
}
 
/**
* 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
*/
export async function unmount() {

}
 
/**
* 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
*/
export async function update(props) {
  console.log('update props', props);
}
```

```xml
<!-- 子应用项目配置 4: 修改 micro-vue/src/App.vue -->
<template>
  <div id="nav">
  我来自子应用
  </div>
</template>
```
DEMO源码：<a href="https://github.com/bobo88/project-basis/tree/main/qiankun-basis" target="_blank">「qiankun」DEMO</a><br />

### 四、DEMO验证
```js
// 1、样式隔离
// 2、JS沙箱
// 3、预加载
```




<!-- 
qiankun与single-spa区别？
乾坤基于single-spa，加强了微应用集成能力，却抛弃了微模块的能力。所以，它们的区别就是微服务的粒度，乾坤的所能服务的粒度是应用级别，而single-spa则是模块级别。它们都能将前端进行拆分，只是拆分的粒度不同罢了。

微应用加载器：“微”的粒度是应用，也就是HTML，它只能做到应用级别的分享
微模块加载器：“微”的粒度是模块，也就是JS模块，它能做到模块级别的分享


六、微前端的设计概念
在设计时需要关注以下内容：

中心化：应用注册表
标志化应用
应用生命周期管理    
    (1) 加载应用
    (2) 运行应用
    (3) 卸载应用
    load：决定加载哪个应用，并绑定生命周期
    bootstrap：获取静态资源
    mount：安装应用，如创建DOM节点。
    unload：删除应用的生命周期
    unmount：卸载应用，如删除DOM节点、取消事件绑定
高内聚，低耦合 -->

参考文章：<br />
<a href="https://qiankun.umijs.org/zh" target="_blank">「qiankun」 from 阿里</a><br />
<a href="https://tehub.com/a/8xrFr58LyQ" target="_blank">基于qiankun的微前端最佳实践 -（同时加载多个微应用）</a><br />
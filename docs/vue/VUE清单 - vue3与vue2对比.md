### VUE清单 - vue3与vue2对比

::: tip VUE 概念
一款用于构建用户界面的 JavaScript 框架，渐进式框架。
:::
注意：【用新不用旧】老旧项目用 vue2 开发的能重构尽量重构，新项目一律用 vue3。

VUE3 和 VUE2 的差异性主要体现在：
+ 生命周期钩子函数
+ 底层封装
+ TS的支持度
+ 打包体积
+ SSR渲染优化
+ 事件侦听器缓存
+ 支持多根节点组件
+ ......

#### 一、生命周期
```js
// VUE2 和 VUE3 生命周期对比
// Vue2 ----------- vue3
// beforeCreate  -> setup()
// created       -> setup()
// beforeMount   -> onBeforeMount
// mounted       -> onMounted
// beforeUpdate  -> onBeforeUpdate
// updated       -> onUpdated
// beforeDestroy -> onBeforeUnmount
// destroyed     -> onUnmounted
// activated     -> onActivated
// deactivated   -> onDeactivated
// errorCaptured -> onErrorCaptured
```
详见：<a href="/vue/VUE清单 - 生命周期.html">VUE清单 - 生命周期</a>

#### 二、底层封装（重点）
+ 【双向数据绑定】
```js
// 【双向数据绑定】 - 底层监听
// vue2: Object.defineProperty( )

// vue3: Proxy

```

+ 【Diff 算法】的提升
+ 【Composition API】
+ 【mixins更改】

#### 三、TS的支持度
```html
vue2.x: 部分支持类型检查

vue3: 全面拥抱TS
```

#### 四、优化打包体积
基于 webpack / rollup 等打包工具，可以实现【tree-shaking】，将打包体积缩小。

具体原因是：
```html
vue2.x: 
很多函数都挂载在全局Vue对象上，会增加打包体积（如果某些函数不用的情况下）

vue3: 
所有的API都通过 【ES6模块化】 的方式引入，可以通过webpack/rollup 进行打包优化 剔除【未使用到的API】
```
#### 五、其他


![An image](~@/vue3VSvue2.png)
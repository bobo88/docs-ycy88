## VUE脚手架create-vue

![An image](~@/vue/create-vue.png)

### 一、初始化 VUE3 项目
```js
$ npm create vue@3
```


### 二、初始化 VUE2 项目
```js
$ npm create vue@2
```

### 三、与 Vue CLI 的区别
Vue CLI基于webpack，而create Vue基于Vite。Vite支持Vue CLI项目中的大多数配置约定，并且由于其极快的启动和热模块更换速度，提供了更好的开发体验。点击此处了解更多关于我们推荐Vite over webpack的原因。

与Vue CLI不同，create Vue本身只是一个脚手架工具：它根据您选择的功能创建一个预配置的项目，并将其余的委托给Vite。以这种方式构建的项目可以直接利用与Rollup兼容的Vite插件生态系统。

### 四、源码分析





参考：
<a href="https://github.com/vuejs/create-vue" target="_blank">create-vue(Github)</a>
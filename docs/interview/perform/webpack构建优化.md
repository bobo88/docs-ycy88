## 构建工具性能优化

使用框架 vue 和 react 进行前端工程化开的时候，需要对构建工具，webpack 或者 vite 配置进行项目打包优化配置处理

### webpack 构建工具性能优化

从两个方向对项目进行构建优化
1、开发环境性能优化：速度快，调试更友好
2、生产环境性能优化：源代码要不要隐藏，调试要不要更友好

#### 开发环境构建优化

- 优化打包构建速度
- 优化代码调试

##### 优化打包构架速度

优化构建速度就是开启 HMR:hot module replacement 热模块替换。一个模块发生变化 ，只会打包这一个模块而不是所有模块

对哪些文件有作用:

- css:默认可以使用 HMR 功能，因为 style-loader 内部集成了 HMR
- js:默认没有 HMR 功能。
  注意：HMR 功能对 js 的处理，只能处理非入口文件的其他文件，因为其他文件都是从入口文件引入的，如果对入口文件有作用，那么其他的文件都会相应的更新
- html:默认没有 HMR 功能，同时会导致问题：html 文件不能热更新了(不需要做 HMR 更新，因为 html 只有一个文件)。
  解决：修改 entry 入口文件，将 html 文件引入，配置如下：

```JS
//webpack.config.js

module.exports = {
    entry:['./src/main.js','.src/index.html']
}
```

js 文件支持 HMR 更新配置优化

```js
//入口文件main.js
import print from "./print.js";
if (module.hot) {
  // 一旦 module.hot为true,说明开启了HMR功能。 -->让HMR功能生效
  module.hot.accept("./print.js", function () {
    // 方法会监听print.js文件的变化，一旦发生变化，其他模块不会重新打包构建。
    // 更新完print.js后执行里面的方法。
    print();
  });
}
```

7、externals
排除掉某些大的包不被打包，比如 jquery,vue 等体积大的包可以通过 cdn 去引入，不要通过 webpack 打包进来
配置如下:

```js
//webpack.config.js
module.exports = {
  externals: {
    //拒绝jQuery被打包进来
    jquery: "jQuery",
  },
};
```

8、dll
使用 dll 技术，对某些库（第三方库，jquery,react,vue...）进行单独打包。

配置如下:

```js
//webpack.dll.js

/**
 *使用 dll 技术，对某些库（第三方库，jquery,react,vue...）进行单独打包。
 *
 **/
const {resolve} = require("path");
module.exports = {
    entry:{
        //最终生成的[name] --> jquery
        //['jquery'] --> 要打包的库是jquery
        jquery;['jquery']
    },
    output:{
        filename:'[name].js',
        path:resovle(__dirname,'dll'),
        library:'[name]',//打包库里向外暴露出去的内容叫什么名字。
    },
    plugins:[
        //打包生成一个manifest.json文件，提供和jquery映射
        new webpack.DllPlugin({
            name:'[name]_[hash]', //映射库的暴露的内容名称
            path:resolve(__dirname,'dll/manifest.json') //输出文件路径
        })
    ]
}
```

```js
//webpack.config.js
const { resolve } = require("path");
module.exports = {
  entry: ".src/index.js",
  output: {
    filename: "[name][contenhash:10].js",
    path: resovle(__dirname, "build"),
  },
  plugins: [
    //告诉webpack哪些库不参与打包，同时使用时的名称也得变。
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, "dll/mainifest.json"),
    }),
    //将某个文件打包输出去，并在html中自动引入该资源。
    new AddAssetHtmlWebpackPlugin({
      filename: resovle(__dirname, "dll/jquery.js"),
    }),
  ],
};
```

##### 优化代码调试

开启 source-map:一种提供源代码构建后代码映射技术（如果构建后代码出错了，通过映射可以追踪源代码错误）

开启配置如下:

```js
//webpack.config.js
module.exports = {
  /**
   * 值为以下几个
   * source-map / inline-source-map / hidden-source-map /eval-source-map /
   * nosources-source-map / cheap-source-map / cheap-module-source-map
   *
   **/
  devtool: "source-map"，
};
```

source-map 有几个值分别为:

- source-map:外部
  错误代码准确信息 和 源代码的错误位置
- inline-source-map:内联，只生成一个内联 source-map
  错误代码准确信息 和 源代码的错误位置
- hidden-source-map:外部
  错误代码错误原因，但是没有错误位置，不能追踪到源代码错误，只能提示到构建后的代码错误位置。
- eval-source-map:内联，每一个文件都生成对应的 source-map,都在 eval
  错误代码准确信息 和 源代码的错误位置
- nosources-source-map:外部
  错误代码准确信息 但是没有任何的源代码信息。
- cheap-source-map:外部
  错误代码准确信息 和 源代码的错误位置，只能精确到行
- cheap-module-source-map:外部

#### 生产环境构建优化

- 优化打包构建速度
- 优化代码运行的性能

##### 提升构建速度

1、one of:提升构建速度，同类型的文件都 loader 只会处理一遍。
2、缓存：开启 babel-loader 缓存：和 HMR 功能类似，配置：cacheDirectory:true
3、externals
排除掉某些大的包不被打包，比如 jquery,vue 等体积大的包可以通过 cdn 去引入，不要通过 webpack 打包进来
配置如下:

```js
//webpack.config.js
module.exports = {
  externals: {
    //拒绝jQuery被打包进来
    jquery: "jQuery",
  },
};
```

4、dll
使用 dll 技术，对某些库（第三方库，jquery,react,vue...）进行单独打包。

配置如下:

```js
//webpack.dll.js

/**
 *使用 dll 技术，对某些库（第三方库，jquery,react,vue...）进行单独打包。
 *
 **/
const {resolve} = require("path");
module.exports = {
    entry:{
        //最终生成的[name] --> jquery
        //['jquery'] --> 要打包的库是jquery
        jquery;['jquery']
    },
    output:{
        filename:'[name].js',
        path:resovle(__dirname,'dll'),
        library:'[name]',//打包库里向外暴露出去的内容叫什么名字。
    },
    plugins:[
        //打包生成一个manifest.json文件，提供和jquery映射
        new webpack.DllPlugin({
            name:'[name]_[hash]', //映射库的暴露的内容名称
            path:resolve(__dirname,'dll/manifest.json') //输出文件路径
        })
    ]
}
```

```js
//webpack.config.js
const { resolve } = require("path");
module.exports = {
  entry: ".src/index.js",
  output: {
    filename: "[name][contenhash:10].js",
    path: resovle(__dirname, "build"),
  },
  plugins: [
    //告诉webpack哪些库不参与打包，同时使用时的名称也得变。
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, "dll/mainifest.json"),
    }),
    //将某个文件打包输出去，并在html中自动引入该资源。
    new AddAssetHtmlWebpackPlugin({
      filename: resovle(__dirname, "dll/jquery.js"),
    }),
  ],
};
```

#### 优化代码运行的性能

1、 资源文件缓存：打包的资源文件以 hash 命名，解决构建后，浏览器的缓存文件无法加载最新内容。

- hash:问题：因为 js 和 css 使用了同一个 hash 值，如果重新打包，会导致所有的缓存失效（可能我确只改了一个文件）。
- chunkhash：根据 chunk 生成的 hash 值，如果打包来源同一个 chunk 那么 hash 就一样。
  问题:js 和 css 的值还是一样的，因为 css 是在 js 中引入的，所以同属于一个 chunk
- contenthash:根据文件的内容生成 hash 值 ，不同文件的 hash 一定不一样

配置如下：

```js
//webpack.config.js
module.exports = {
  output: {
    // 值可以设置三种：[hash:10] / [chunkhash:10] / [contenthash:10]
    filename: "js/main[hash:10].js",
  },
};
```

2、tree shaking:去除无用代码

- 前提：1、必须使用 ES6 模块化，2、开启 production 环境
- 作用：减少代码的体积

配置如下：

```js
// package.json
"sideEffects":false //所有代码没有副作用（都可以进行tree shaking），问题：可能会把css文件干掉，正确配置应该如下：

"sideEffects":["*.css"] //排除所有的.css文件，这样css文件不会被干掉。
```

3、代码分割（code split）:打包代码分割成不同的模块文件，拆分出来，放在同一个文件里面，体积太大。

配置如下：

```js
// webpack.config.js

/**
 * 多入口分包配置
 * 1.可以将node_modules中代码单独打包一个chunk最终输出
 * 2.自动分析多入口chunk中，有没有公共文件。如果有会打包成单独的一个chunk
 **/
module.exports = {
  entry: {
    test: "./src/test[contenthash:10].js",
    main: "./src/main[contenthash:10].js",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
```

4、文件懒加载

5、pwa 离线运行，需要处理兼容性

6、开启多进程打包
开启多进程也需要合理，因为进程启动是需要时间的。只有工作消耗时间较长，才需要多进程打包。

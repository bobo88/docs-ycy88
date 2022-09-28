### Gulp
::: tip Gulp的概念
自动化构建工具，增强你的工作流程！
:::

#### 一、Gulp 初始化：
```js
npm install gulp-cli -g
npm install gulp -D
npx -p touch nodetouch gulpfile.js
gulp --help
``` 
gulpfile.js文件配置：
::: details 点击查看官网提供的 gulpfile.js 代码
```js
const { src, dest, parallel } = require('gulp');
const pug = require('gulp-pug');
const less = require('gulp-less');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');

function html() {
  return src('client/templates/*.pug')
    .pipe(pug())
    .pipe(dest('build/html'))
}

function css() {
  return src('client/templates/*.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(dest('build/css'))
}

function js() {
  return src('client/javascript/*.js', { sourcemaps: true })
    .pipe(concat('app.min.js'))
    .pipe(dest('build/js', { sourcemaps: true }))
}

exports.js = js;
exports.css = css;
exports.html = html;
exports.default = parallel(html, css, js);
```
:::


#### 二、Gulp详细操作流程：
+ 首先你要先在本地安装nodejs，“傻瓜式”安装即可，一路点击下一步
```js
node -v  // 查看安装的nodejs版本，出现版本号，说明已经正确安装
``` 

+ 全局安装gulp
```js
npm install gulp -g
``` 

+ 单个项目安装gulp以及gulp相关的插件，首先新建项目文件夹，然后运行以下命令
```js
npm install gulp --save-dev
npm install gulp-less --save-dev
// ......
``` 

+ 配置gulpfile.js
```js
// 详见上文
``` 

+ 运行任务
```js
// gulp 任务名称（gulp.task方法中定义的名称）
// 当执行gulp default或者gulp时，将会调用default任务里面的所有任务
``` 

<!-- 
```js
``` -->




案例源码：<br />
<a href="https://github.com/bobo88/project-basis/tree/main/gulp-basis" target="_blank">gulp-basis By Bob</a><br />
参考：<br />
<a href="https://www.gulpjs.com.cn/" target="_blank">官网（中文）</a><br />
<a href="https://gulpjs.com/" target="_blank">官网（英文）</a>
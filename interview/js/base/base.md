# js 基础知识点题目

#### 原型和原型链

参考地址:https://www.cnblogs.com/echolun/p/12321869.html

##### 1、什么是原型和原型链，原型链的顶端是什么?

函数才有原型，所有的数据都是有原型链的，构造函数是通过原型和原型链去继承的，原型就是一个包含诸多属性和方法的对象，new 一个构造函数实列的时候，访问构造函数的属性和方法的时候，会顺着 \_\_proto\_\_ 这个属性去查找属性和方法，这个查找的过程就是原型链。
原型链的顶端是 null
如何去查找：一层一层往上去查找，当访问构造函数的方法和属性的时候，首先要去查找构造函数本身有没有，然后再去查找她的原型上是否有，一级一级的往上找，直到找到原型的顶端的没有找到就返回 undefined。

##### 2、原型链和作用域链的区别？

原型链是查找构造函数的属性和方法所形成的，作用域链是在可访问的作用域内去查找变量是否存在的这个过程就是作用域链，一般表现就是闭包，内部函数访问外部函数的变量。
原型链的顶端是 null，作用域的顶端是全局变量，属性和方法不存的时候返回的是 undefined，作用域查找不存的时候会报错，变量未申明。

##### 3、构造函数和普通函数有什么区别？

本质是没有区别的，普通函数可以作为构造函数使用，构造函数可以作为普通函数使用。只是调用的方式不一样，构造函数调用是通过 new 关键字，普通函数是直接调用，es6 class 定义的函数，就只能 new 调用，普通调用的话， 会直接报错。

##### 4、能否判断当前函数是普通调用还是 new 调用？

通过 this 指向来判断，普通函数调用，this === window，但是 new 构造函数调用的时候，this 指向是构造函数创建的实列所以 this.constructor === 构造函数本身，代码如下:

```js
//判断是普通调用还是构造函数调用
const fn = function () {
  if (this === window) {
    console.log('普通函数调用')
  } else if (this.constructor === 'fn') {
    console.log('new构造函数调用')
  }
}

fn() //普通函数调用
new fn() //new构造函数调用
```

##### 5、 prototype 与\_\_proto\_\_是什么?

prototype 是原型对象，\_\_proto\_\_是访问器属性，实列是通过\_\_proto\_\_去访问原型上的方法和属性

```js
function Fn() {
  this.a = 111
  this.b = 'bbb'
}
let fn1 = new Fn()
fn1.__proto__ === Fn.prototype
```

##### 6、怎么判断对象是否包含某条属性？

通过 in 去判断，如下:

```js
let obj = {
  name: 'xxx'
}
console.log('name' in obj) //true
```

##### 7、怎么判断某条属性是否为对象自身属性而非原型属性？

通过 hasOwnProperty

```js
let Fn = function () {
  this.name = 'xxxx'
  this.age = '160'
}
Fn.prototype.sex = 'girl'
let fn1 = new Fn()
fn1.color = 'blue'
console.log(fn1.hasOwnproperty('color')) //true
console.log(fn1.hasOwnproperty('name')) //true
console.log(fn1.hasOwnproperty('sex')) //false
```

##### 8、constructor 与 instanceOf 有何区别?

都可以判断对象类型
都可以判断实列是由某个构造函数创建，instanceOf 判断更加准确一些，constructor 只能判断未被任何修改过的构造函数原型。因为 constructor 是是原型属性，原型被修改了，那它就找不到自己的构造函数了
constructor：是原型对象 property 里面的一个属性，是一个方法，返回创建构造函数的实列
instanceOf：是运算符，返回的是 Boolean 值。

```js
//情况一:原型被修改的构造函数
let Fn = function () {
  this.name = 'xxx'
  this.age = 'bbb'
}
Fn.prototype = {
  name: 'bbb',
  color: 'blue'
}
let fn1 = new Fn()
console.log(fn1.constructor === Fn) //false
console.log(fn1 instanceof Fn) //true

//情况二:原型未被修改的构造函数
let Fn2 = function () {
  this.name = 'xxx'
  this.age = 'bbb'
}

let fn2 = new Fn2()
console.log(fn2.constructor === Fn2) //true
console.log(fn2 instanceof Fn2) //true
```

##### 10、能不能创建严格意义上的空对象?

严格意义上的空对象是没有\_\_proto\_\_,只有 null 和 undefined 是没有这个属性的。

```js
//方法一：
let obj = new Object(null)

//方法二
let obj1 = {}
Object.setProperty(obj1, null)
```

#### 递归算法

类似金字塔形，必须有条件终止，典型的求和、阶乘等列子

```js
let sum = (n) => {
  if (n > 0) {
    return sum(n - 1) + n
  } else {
    return n
  }
}
```

#### 跨域解决

#### 性能优化

地址栏输入 url 到服务端接收到 http 的请求，再到服务将数据返回给客户端，客户端再将数据渲染到浏览，这个过程中做优化，那前端需要考虑的点就是，更快的网络通信，和更高效的数据处理。
从这两个方便出发：
更快的网络通信：

1. 服务通信层：减少 http 的请求，请求需要建立连接，DNS 解析优化，预解析，CDN 负载均衡和缓存
2. 数据传输层：

- a、缓存:浏览器的缓存机制，强缓存和协商缓存。
- b、压缩:数据压缩：开启 gzip。代码文件压缩：html,css,js 合并压缩。静态资源压缩：jpeg,去除元数据，图标，图片等压缩。头与报文：http1.1 臃肿的头部，减少数据的携带和 cookie 的传输。

3. 通信协议本身：http1.0 升级到 2.0，优势：二进制解析比字符串的解析好分割，而且好携带，解析快。头部的压缩，没有臃肿的头部携带，传输会更快。链路复用，减少了 http 的连接，在有限的请求里面可以处理更多的数据。

更高效的数据处理：

1. 通过工具分析，谷歌自带的 highoust，主要是对网站进行一个总体评分，但是还细分每个点需要优化的细节，根据细节的分析，去一个一个的优化处理，再进行前后数据对比，得出性能优化的数据。
2. 代码本身：减少 dom 元素的层级嵌套，能用 cs 的不要用 js，减少页面的重排，能用全局 css 不要用 scope，对于不常用的对象通过 object.frez 冻结，释放内存，减少作用域的查找，少用闭包等。

#### git 冲突如何解决？

#### 数组/对象的遍历

##### 1. 如何遍历数组/对象？

for 循环可以遍历数组和对象
数组的遍历：map,each,filter,for of，for 循环，reduce 等。
对象:for in,for 循环

##### 2. for in 遍历对象时会不会访问原型？

for in 遍历对象的时候是会访问原型的

##### 3. 如何判断是不是原型属性？

通过 Object.hasOwnProperty 判断对象属性是自己的而非原型上的。再结合 in 可以查找对象和原型上的属性。

```js
//判断是否原型上的属性
let isProtoAttr = function (obj, attr) {
  return !obj.hasOwnProperty(attr) && attr in obj
}
```

#### 事件循环机制

js 是单线程程序，事件循环是 js 的执行机制。所有的同步任务都是在主线上执行，主线程还有一个队列，宏任务和微任务是放在队列里面，等待执行，当主线程任务全部执行完之后，就会去执行队列里面的任务，微任务永远在宏任务执行之前。宏任务下一个事件执行的开始，每次执行一个宏任务之后就会进行下一轮的事件执行机制，一直这么执行下去，直到任务清空。

##### 1. 如何循环

第一次进入整体代码 script（宏任务，开始第一次循环，接着执行所有的微任务。然后再次从宏任务开始，找到其中一个任务队列执行完毕，再执行所有的微任务。

##### 2. js 的执行机制

同步任务（主线程）整体代码 script（宏任务） => 微任务 => 下一个宏任务 => 循环下去。

##### 3. js 事件

广义上的同步和异步，更细致的又分宏任务和微任务
宏任务：整体代码 script,setTimeOut,setInterval.
微任务：promise,nextTick.

#### 地址栏输入 url 地址到整个网页加载完成经历了怎样的过程?

1. 浏览器接收到 URL 地址，到网络线程的开启（开启网络线程请求对方的服务器），线程的开启实现是在浏览器内部完成的，接到地址后对地址进行分析，https 什么样的传输协议，域名是什么，服务商是谁。
2. 一个完整的 http 请求的发出。（请求对方服务器需要建立 http 请求）这个阶段主要分两部分，DNS 解析和通信线路的建立。首先对 DNS 的一个解析，将域名解析成服务器的 ip 地址，明确访问的是哪个服务器，其次建立通信线路，也就是 TCP 握手连接。
3. 服务器接到请求转到具体的数据处理后台进行处理，（前端一般不需要考虑）
4. 前后的 http 请求交互和缓存机制，建立 TCP 连接之后，就可以进行通信，这个时候往往会加一些反向代理 CDN 缓存和负载均衡等，还有浏览器的缓存机制设置。
5. 浏览器接到数据包后渲染路径：首先 HTML 创建 dom tree ,css 创建，样式结构体，然后 dom tree 和样式结构体形成 render tree,计算位置和大小 UI 引擎来绘制页面。
6. js 引擎的解析过程。

#### js 引擎解析过程

js 引擎主要就是 V8 引擎执行代码的流程，V8 引擎做的事情就是把 js 代码解析成 010101 等这样的字节码，它的渲染流程就是：
js 代码 => 被解析成 AST（抽象语法树）=> 然后再转换成字节码(byteCode)，特性是跨平台的，在 window 可以运行，mac 也能运行 => 优化的机器码（机器码的运行效率更高）

#### 怎么打断点

打断点主要是通过 Debugger 去打断点，谷歌开发者工具和 vscode 提供了多种 debugger 打断点的方式。

1. 普通断点：Chrome 的 DevTools 选项卡 sources 面板，对你需要断点的文件进行调试。
2. 条件断点：在断点这一行右击，选择 editor breakpoint 然后添加条件语句只有为 true 的时候才会执行。
3. Dom 断点：在 Chrome 的 DevTools 的 Element 面板的对应元素上右击，选择 Break on
4. url 断点：在 Chrome 的 Devtools 的 source 面板，可以添加 XHR 的 url 断点，当 ajax 请求对应的 url 的时候就会断住，可以用来调试请求相关的代码。
5. Event Listener 断点：在 Chrome Devtools 的 Sources 面板还可以添加 Event Listener 的断点，指定当发生什么事件时断住，可以用来调试事件相关代码。
6. 异常断点：在 VSCode 的 Debugger 面板勾选 Uncaught Exceptions 和 Caught Exceptions 可以添加异常断点，在抛出异常未被捕获或者被捕获时断柱。用来调试一些发生异常的代码时很有用。

#### xss 攻击和 csrf 攻击的区别

任何可输入的地方都可能成为 xss 的攻击，包括 URL 地址

-

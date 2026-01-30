# typeof、instanceof、constructor区别
:::tip 专题简介
- typeof
- instanceof
- constructor 
- 区别
:::
## typeof
数据类型检测的方式,主要是对基本类型的检测,判断变量是否存在
### 特点
- `typeof` 操作符返回一个字符串，表示未经计算的操作数的类型
- `typeof` 一般只能返回如下几个结果： number, boolean, string, function, object, undefined,
对于 Array, Null 等特殊对象使用 typeof 一律返回 object， 这正是 typeof 的局限性。

使用方法如下：
```js
typeof 1 // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
typeof null // 'object'
typeof [] // 'object'
typeof {} // 'object'
typeof console // 'object'
typeof console.log // 'function'
```
如果我们想要判断一个变量是否存在代码如下
```js
if(typeof a != 'undefined'){
    //变量存在
}
```

## instanceof
数据类型检测的方式，`instanceof` 运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上.
### 特点
- `instanceof`只能用来判断对象，用于判断一个变量是否属于某个对象的实例。
- `instanceof`返回的是布尔值，`true`或`false`；

构造函数通过new可以实例对象，`instanceof`能判断这个对象是否是之前那个构造函数生成的对象
```js
// 定义构建函数
let Car = function() {}
let benz = new Car()
benz instanceof Car // true
let car = new String('xxx')
car instanceof String // true
let str = 'xxx'
str instanceof String // false
```
关于instanceof的实现原理，可以参考下面：
```js
function myInstanceof(left, right) {
    // 这里先用typeof来判断基础数据类型，如果是，直接返回false
    if(typeof left !== 'object' || left === null) return false;
    // getProtypeOf是Object对象自带的API，能够拿到参数的原型对象
    let proto = Object.getPrototypeOf(left);
    while(true) {                  
        if(proto === null) return false;
        if(proto === right.prototype) return true;//找到相同原型对象，返回true
        proto = Object.getPrototypeof(proto);
    }
}
```
也就是顺着原型链去找，直到找到相同的原型对象，返回true，否则为false

## constructor
判断对象类型，判断实例由某个构造函数创建
### 特点
- constructor 只能判断未被任何修改过的构造函数原型，因为 constructor 是原型属性，原型被修改了，那它就找不到自己的构造函数了 constructor：是原型对象 property 里面的一个属性，是一个方法

```js
//情况一:原型被修改的构造函数
let Fn = function () {
  this.name = "xxx";
  this.age = "bbb";
};
Fn.prototype = {
  name: "bbb",
  color: "blue",
};
let fn1 = new Fn();
console.log(fn1.constructor === Fn); //false
console.log(fn1 instanceof Fn); //true

//情况二:原型未被修改的构造函数
let Fn2 = function () {
  this.name = "xxx";
  this.age = "bbb";
};

let fn2 = new Fn2();
console.log(fn2.constructor === Fn2); //true
console.log(fn2 instanceof Fn2); //true
```

##  区别
### 相同点
- 都可以判断对象类型
### 不同点
- typeof和instanceof是运算符，constructor是原型对象里面的一个属性是一个方法
- typeof用来判断基本数据类型，返回的是类型值,对array和null类型判断不准确返回都是object
- instanceof用来判断对象类型以及判断当前对象是否是之前那个构造函数生成的对象，返回值是布尔值
- constructor 判断实列是由某个构造函数创建但是原型未被修改之前能够判断，原型修改了就判断不出来

如果需要通用检测数据类型，可以采用Object.prototype.toString，调用该方法，统一返回格式“[object Xxx]”的字符串
```js
bject.prototype.toString({})       // "[object Object]"
Object.prototype.toString.call({})  // 同上结果，加上call也ok
Object.prototype.toString.call(1)    // "[object Number]"
Object.prototype.toString.call('1')  // "[object String]"
Object.prototype.toString.call(true)  // "[object Boolean]"
Object.prototype.toString.call(function(){})  // "[object Function]"
Object.prototype.toString.call(null)   //"[object Null]"
Object.prototype.toString.call(undefined) //"[object Undefined]"
Object.prototype.toString.call(/123/g)    //"[object RegExp]"
Object.prototype.toString.call(new Date()) //"[object Date]"
Object.prototype.toString.call([])       //"[object Array]"
Object.prototype.toString.call(document)  //"[object HTMLDocument]"
Object.prototype.toString.call(window)   //"[object Window]"
```
了解了toString的基本用法，下面就实现一个全局通用的数据类型判断方法
```js
function getType(obj){
  let type  = typeof obj;
  if (type !== "object") {    // 先进行typeof判断，如果是基础数据类型，直接返回
    return type;
  }
  // 对于typeof返回结果是object的，再进行如下的判断，正则返回结果
  return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1'); 
}
```
使用如下
```js
getType([])     // "Array" typeof []是object，因此toString返回
getType('123')  // "string" typeof 直接返回
getType(window) // "Window" toString返回
getType(null)   // "Null"首字母大写，typeof null是object，需toString来判断
getType(undefined)   // "undefined" typeof 直接返回
getType()            // "undefined" typeof 直接返回
getType(function(){}) // "function" typeof能判断，因此首字母小写
getType(/123/g)      //"RegExp" toString返回
```
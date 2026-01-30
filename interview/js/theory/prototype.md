# 原型和原型链
::: tip 原型和原型链的区别
函数才有原型，所有的数据都是有原型链的，构造函数是通过原型和原型链去继承的
:::

### 1、什么是原型？
原型就是一个包含诸多属性和方法的对象.
- 函数特有的
- 通过原型上挂东西 new 一个实列来继承


### 2、什么是原型链?
每个对象都有 \_\_proto\_\_ 属性，此属性指向该对象的构造函数的原型。 new 一个构造函数实列的时候，访问构造函数的属性和方法的时候,会顺着 \_\_proto\_\_ 这个属性去查找属性和方法，这个查找的过程就是原型链。 

### 3、原型链的顶端是什么?如何查找?
- 原型链的顶端是 null。
- 如何去查找：一层一层往上去查找，当访问构造函数的方法和属性的时候，首先要去查找构造函数本身有没有，然后再去查找她的原型上是否有，一级一级的往上找，直到找到原型的顶端的没有找到就返回 null

### 4、原型链和作用域链的区别？
原型链:是查找构造函数的属性和方法所形成的.

作用域链:是在可访问的作用域内去查找变量是否存在的这个过程就是作用域链，一般表现就是闭包，内部函数访问外部函数的变量。

原型链的顶端是 null，作用域的顶端是全局变量，属性和方法不存的时候返回的是 undefined，作用域查找不存的时候会报错，变量未申明。

### 5、 prototype 与__proto__是什么?
prototype 是原型对象，__proto__是访问器属性，实列是通过__proto__去访问原型上的方法和属性
```js
function Fn() {
  this.a = 111;
  this.b = "bbb";
}
let fn1 = new Fn();
fn1.__proto__ === Fn.prototype;
```

### 3、构造函数和普通函数有什么区别？

本质是没有区别的，普通函数可以作为构造函数使用，构造函数可以作为普通函数使用。只是调用的方式不一样，构造函数调用是通过 new 关键字，普通函数是直接调用，es6 class 定义的函数，就只能 new 调用，普通调用的话， 会直接报错。

### 4、能否判断当前函数是普通调用还是 new 调用？
通过 this 指向来判断，普通函数调用，this === window，但是 new 构造函数调用的时候，this 指向是构造函数创建的实列所以 this.constructor === 构造函数本身，代码如下:
```js
//判断是普通调用还是构造函数调用
const fn = function () {
  if (this === window) {
    console.log("普通函数调用");
  } else if (this.constructor === "fn") {
    console.log("new构造函数调用");
  }
};

fn(); //普通函数调用
new fn(); //new构造函数调用
```

### 7、怎么判断某条属性是否为对象自身属性而非原型属性？
通过 hasOwnProperty

```js
let Fn = function () {
  this.name = "xxxx";
  this.age = "160";
};
Fn.prototype.sex = "girl";
let fn1 = new Fn();
fn1.color = "blue";
console.log(fn1.hasOwnproperty("color")); //true
console.log(fn1.hasOwnproperty("name")); //true
console.log(fn1.hasOwnproperty("sex")); //false
```
### 8、constructor 与 instanceOf 有何区别?
都可以判断对象类型 都可以判断实列是由某个构造函数创建，instanceOf 判断更加准确一些，constructor 只能判断未被任何修改过的构造函数原型。因为 constructor 是是原型属性，原型被修改了，那它就找不到自己的构造函数了 constructor：是原型对象 property 里面的一个属性，是一个方法，返回创建构造函数的实列 instanceOf：是运算符，返回的是 Boolean 值。

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
### 9、写一个原型链继承的例子

子类的原型指向父类的实例来继承父类的属性和方法 优点：可以继承父类的实例方法和属性，也能继承父类原型上的属性和方法 缺点：对于引用类型改变，多个实例会相互影响。 创建子类的实例时不能像父类的构造函数中传递参数。

```js
let Parent = function () {
  this.name = ["我是父类的属性name,我是个数组，引用类型"];
  this.age = 50;
};
Parent.property.say = function () {
  console.log("我是父类property上的方法。");
};
let Child = function () {
  this.role = "我是儿子";
};
Child.property = new Parent();
let child1 = new Child();
let child2 = new Child();
child1.name[0] = "我是child1我改变了名字";
child1.age = 28;
child2.name[0] = "我是child2我也改了名字";
child.age = 20;
console.log(child1);
/** 
{
    name:[我是child2我也改了名字],
    age:28,
    role:"我是儿子",
    say:function(){console.log("我是父类property上的方法。");}
} 
**/
console.log(child2);
/** 
{
    name:[我是child2我也改了名字],
    age:20,role:"我是儿子",
    say:function(){console.log("我是父类property上的方法。");}
}
 **/
```
参考地址:https://www.cnblogs.com/echolun/p/12321869.html
# new的时候做了什么
:::tip 内容简介
1. new是什么?
2. 做了什么?
3. 手写案例
:::
## new是什么
new操作符用于创建一个构造函数实例对象。可以继承构造函数和原型上的属性和方法。

## new的过程

1. 首先创建一个空对像。
2. 建立原型和原型链的关系。
3. 绑定 this 指向构造函数实列。
4. 返回构造函数实列。

## 手写实现new
```js
//实现new方法的
let Person = function () {
  this.name = "xxx";
  this.age = 28;
};
let newMethod = function (Parent, ...rest) {
  //创建一个对象，以构造函数的原型为基础创建
  let child = Object.create(Parent.Property);
  //绑定this到实列上
  let result = Parent.apply(child, rest);
  //返回当前实列,构造函数没有手动返回值，就返回当前创建的实列。
  return typeof result === "object" ? result : child;
};
Person.Property = {
  sex: "girl",
};
let person1 = newMethod(Person);
console.log(person1.age); //28
console.log(person1.sex); //girl
```
# 谈谈this
:::tip 专题简介
- 指向规则
- 函数调用的几种方式
- this指向优先级
:::
## this的指向
1. 谁调用指向谁，多层调用的时候只看它的直接上级
2. 箭头函数没有this，他的this是指向它定义的位置的上下文，箭头函数不会创建自己的执行上下文，而是将this指向外部函数已经创建的执行上下文
```js
//指向直接调用者如
a.b.aa();//那么调用者是b不是a,如果aa方法的属性b没有，那么就是undefined，不会再去找a
```

## 函数调用的几种方法以及this指向
- 直接调用:this指向的是window
- 对象方法调用:this指向的是它调用的那个对象
- 间接调用
- bind、apply、call绑定调用:this指向绑定的哪个对象
- 构造函数调用:this指向构造函数实例

## 优先级
### 隐式绑定 VS 显式绑定
显示绑定的优先级更高
```js
function foo() {
    console.log( this.a );
}

var obj1 = {
    a: 2,
    foo: foo
};

var obj2 = {
    a: 3,
    foo: foo
};

obj1.foo(); // 2
obj2.foo(); // 3

obj1.foo.call( obj2 ); // 3
obj2.foo.call( obj1 ); // 2
```

### new绑定 VS 隐式绑定
new绑定的优先级>隐式绑定
```js
function foo(something) {
    this.a = something;
}

var obj1 = {
    foo: foo
};

var obj2 = {};

obj1.foo( 2 );
console.log( obj1.a ); // 2

obj1.foo.call( obj2, 3 );
console.log( obj2.a ); // 3

var bar = new obj1.foo( 4 );
console.log( obj1.a ); // 2
console.log( bar.a ); // 4
```
### new绑定 VS 显式绑定
因为new和apply、call无法一起使用，但硬绑定也是显式绑定的一种，可以替换测试
new绑定优先级>显式绑定
```js
function foo(something) {
    this.a = something;
}

var obj1 = {};

var bar = foo.bind( obj1 );
bar( 2 );
console.log( obj1.a ); // 2

var baz = new bar( 3 );
console.log( obj1.a ); // 2
console.log( baz.a ); // 3
```

综上，new绑定优先级 > 显示绑定优先级 > 隐式绑定优先级 > 默认绑定优先级
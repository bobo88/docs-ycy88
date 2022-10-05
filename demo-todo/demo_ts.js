// console.log(abc)
function login(options, cb) {
    // ...
    console.log(options.username, options.token, options.password);
    cb();
}
// function hello(name: string): string {
//     return `你好，我的名字叫${name}`
// }
// hello('Bob')
function hello(name) {
    return name;
}
hello('Bob');
hello(123);
var a = null;
// 类型注解
var isOK = true;
var str = 'abc';
var isNull = null;
var age = 18;
var empty = undefined;
var s1 = Symbol();
str = null;
str = undefined;
function alertSth(name) {
    alert("\u5F39\u51FA\u7684\u540D\u5B57\u662F: " + name);
}
alertSth('Bob');
var unusable = undefined;
var an = 123;
an = 'Bob';
an = true;
an.toString();
an.hello();
var num1 = 123;
// num1 = 'Bob'
var anyKey;
anyKey = 123;
anyKey = 'Bob';
anyKey = true;
// 简便数组类型
var arr1 = ['abc', 'Bob', 'xyz'];
// 使用泛型来表示数组
var arr2 = ['xiaoming', 'xiaoli', 'xiaoyuan'];
// 复合类型
var arr3 = [123, 'Bob', 'Tst'];
// function funcArgs(...args: string[]) {
//     console.log(args)
// }
// funcArgs('a', 'b', 123, true)
var readOnlyArr = [342, 3];
// readOnlyArr.push(1) // 类型“readonly number[]”上不存在属性“push”。
var color = [32, 546];
var color2 = [32, 546];
var readOnlyArr2 = [12, 34];
var readOnlyArr3 = [12, 34];
var oneTuple;
// 正确初始化
oneTuple = [6, false, 'Bob'];
oneTuple.push(234);
var twoTuple = ['Bob', 123, true];
// twoTuple.push(122);
var group = ['Bob', 123];
var x = group[0], y = group[1];
console.log(x, y);

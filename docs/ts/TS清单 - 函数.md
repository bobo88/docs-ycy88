### Typescript之变量声明


```js
function funcArgs(...args: string[]) {
    console.log(args)
}
// 以下代码 tsc运行时 会报错，但是 编译时 不报错
// tsc: Argument of type 'number' is not assignable to parameter of type 'string'.
funcArgs('a', 'b', 123, true);
```
### TS清单 - 类型断言

::: tip 类型断言
类型断言（Type Assertion）可以用来手动指定一个值的类型。<br/>
语法：值 as 类型；或 <类型>值
:::
在 tsx 语法（React 的 jsx 语法的 ts 版）中必须使用前者，即 值 as 类型。建议统一使用 「值 as 类型」 这样的语法。

#### 用途一：将一个联合类型断言为其中一个类型
::: warning 注意
类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，所以不要滥用。
:::

```js
// 以下代码编译时不会报错，但是运行时会报错
interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}
function swim(animal: Cat | Fish) {
    (animal as Fish).swim();
}
const kity: Cat = {
    name: 'kity',
    run() {
        console.log('run')
    }
}
swim(kity)
```
#### 用途二：将一个父类断言为更加具体的子类。
```js
class ApiError extends Error {
    code: number = 0;
}
class HttpError extends Error {
    statusCode: number = 200;
}

function isApiError(error: Error) {
    if (typeof (error as ApiError).code === 'number') {
        return true;
    }
    // 当 ApiError和HttpError 是class类来实现继承的时候，可以使用「instanceof」来判断
    // if (error instanceof ApiError) {
    //     return true;
    // }
    return false;
}
```
但是如果 ApiError和HttpError 不是用class类来定义，而是用「interface」接口来定义的话，则不能使用「instanceof」来判断处理了。因为接口是一个类型，不是一个真正的值，它在编译结果中会被删除。此时只能用「类型断言」来处理。

#### 用途三：将任何一个类型断言为 any
```js
// 下面这行代码编译时会报错
window.foo = 1;     // 提示报错： 类型“Window & typeof globalThis”上不存在属性“foo”。

// 如果改成类型断言形式，则不会报错
(window as any).foo = 1;

```


参考地址：
<a href="https://ts.xcatliu.com/basics/type-assertion.html" target="_blank">类型断言</a><br />



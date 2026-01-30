# async 知识点问答

:::tip 专题简介

- 谈谈对 async/await 的理解
- async 是 Generator 的语法糖体现在哪里
- async/await 的原理是什么
- async 和 await 在干什么
- async 起什么作用
- await 到底在等啥
- 使用 async/await 需要注意什么?
  ::::

## 谈谈对 async/await 的理解

- async/await 就是 Generator 的语法糖，使得异步操作变得更加方便
- async 函数就是将 Generator 函数的星号（\*）替换成 async，将 yield 替换成 await
- async 是 Generator 的语法糖

## async 是 Generator 的语法糖体现在哪里

- async 函数内置执行器，函数调用之后，会自动执行，输出最后结果，而 Generator 需要调用 next 或者配合 co 模块使用
- 更好的语义，async 和 await，比起星号和 yield，语义更清楚了，async 表示函数里有异步操作，await 表示紧跟在后面的表达式需要等待结果
- 更广的适用性，co 模块约定，yield 命令后面只能是 Thunk 函数或 Promise 对象，而 async 函数的 await 命令后面，可以是 Promise 对象和原始类型的值
- 返回值是 Promise，async 函数的返回值是 Promise 对象，Generator 的返回值是 Iterator，Promise 对象使用起来更加方便

## async/await 的原理是什么

async/await 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里

```js
function my_co(it) {
  return new Promise((resolve, reject) => {
    function next(data) {
      try {
        var { value, done } = it.next(data)
      } catch (e) {
        return reject(e)
      }
      if (!done) {
        //done为true,表示迭代完成
        //value 不一定是 Promise，可能是一个普通值。使用 Promise.resolve 进行包装。
        Promise.resolve(value).then((val) => {
          next(val)
        }, reject)
      } else {
        resolve(value)
      }
    }
    next() //执行一次next
  })
}
function* test() {
  yield new Promise((resolve, reject) => {
    setTimeout(resolve, 100)
  })
  yield new Promise((resolve, reject) => {
    // throw Error(1);
    resolve(10)
  })
  yield 10
  return 1000
}

my_co(test())
  .then((data) => {
    console.log(data) //输出1000
  })
  .catch((err) => {
    console.log('err: ', err)
  })
```

## async 和 await 在干什么

- async 是“异步”的简写，而 await 的意思是等待。
- async 用于申明一个 function 是异步的，而 await 等待某个操作完成。
- async/await 是一种编写异步代码的新方法。之前异步代码的方案是回调和 promise。
- async/await 像 promise 一样，也是非阻塞的。
- async/await 让异步代码看起来、表现起来更像同步代码。这正是其威力所在。

## async 起什么作用

async 会将其后的函数（函数表达式或 Lambda）的返回值封装成一个 Promise 对象

## await 到底在等啥

- 如果它等到的不是一个 Promise 对象，那 await 表达式的运算结果就是它等到的东西。
- 如果它等到的是一个 Promise 对象，await 就忙起来了，它会阻塞后面的代码，等着 Promise 对象 resolve，然后得到 resolve 的值，作为 await 表达式的运算结果。

## 使用 async/await 需要注意什么?

- await 命令后面的 Promise 对象，运行结果可能是 rejected，此时等同于 async 函数返回的 Promise 对象被 reject。因此需要加上错误处理，可以给每个 await 后的 Promise 增加 catch 方法；也可以将 await 的代码放在 try…catch 中。
- 多个 await 命令后面的异步操作，如果不存在继发关系，最好让它们同时触发
- await 命令只能用在 async 函数之中，如果用在普通函数，会报错
- async 函数可以保留运行堆栈

```js
//下面两种写法都可以同时触发
//法一
async function f1() {
    await Promise.all([
        new Promise((resolve) => {
            setTimeout(resolve, 600);
        }),
        new Promise((resolve) => {
            setTimeout(resolve, 600);
        })
    ])
}
//法二
async function f2() {
    let fn1 = new Promise((resolve) => {
            setTimeout(resolve, 800);
        });

    let fn2 = new Promise((resolve) => {
            setTimeout(resolve, 800);
        })
    await fn1;
    await fn2;
}


/
* 函数a内部运行了一个异步任务b()。当b()运行的时候，函数a()不会中断，而是继续执行。
* 等到b()运行结束，可能a()早就* 运行结束了，b()所在的上下文环境已经消失了。
* 如果b()或c()报错，错误堆栈将不包括a()。
*/
function b() {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 200)
    });
}
function c() {
    throw Error(10);
}
const a = () => {
    b().then(() => c());
};
a();
/**
* 改成async函数
*/
const m = async () => {
    await b();
    c();
};
m();

```

<a href="https://blog.csdn.net/qq_52421092/article/details/130333581" target="_blank">参考地址</a>

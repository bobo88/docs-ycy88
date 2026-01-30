# 异步解决方案比较
:::tip 专题简介
- 回调函数
- promise
- async/await
- generation
:::
## 回调函数
回调函数是JS早期实现异步的主要方式，主要将函数作为参数传递给另外一个函数，函数接到参数函数的时候进行执行，实现异步的解决方案

### 回调函数的优点
- 简单，容易理解

### 回调函数的缺点
- 代码不优化，可读性比较差
- 不容易维护，耦合度太高
- 相互依赖的请求层层嵌套造成回调地狱


## promise
ES6引入了Promise对象，这是一种异步编程的解决方案。就是用同步的方式写异步的代码，可以用来解决回调地狱问题。

### promise的优点
- 解决的了回调地狱的问题，可读性更强
- 链式调用，可以在then中继续写promise对象并且return然后继续调用then进行回调操作

### promise的缺点
- Promise对象一旦创建会立即执行，不能取消
- 如果没有设置回调函数，Promsie会在内部抛出错误，不会向外流。


## Generator
`Generator` 是 js 中的一种特殊函数，它可以通过 yield 关键字来控制函数的执行流程。Generator 函数可以暂停和恢复执行，这使得它成为一种强大的异步编程解决方案之一。

### Generator的使用
Generator 函数的定义使用 function 关键字后面加上一个星号(*)，Generator 函数内部使用 yield 关键字来定义暂停点，每次调用 yield 关键字，函数都会停止执行并返回一个值。当再次调用 Generator 函数的 next() 方法时，函数会从上次暂停的地方继续执行。
```js
function* createIterator() {
  yield 1;
  yield 2;
  yield 3;
}
// generators可以像正常函数一样被调用，不同的是会返回一个 iterator
let iterator = createIterator();
console.log(iterator.next().value); // 1
console.log(iterator.next().value); // 2
console.log(iterator.next().value); // 3
```
### Generator的优点
- 优雅的流程控制方法
- 异步操作表示的很简洁
- 允许函数被中断地执行

### Generator的缺点
- 流程管理不方便
- 不能实现自动化的流程管理

## Async
ES7 标准引入了async函数，使得异步操作变得更加方便。简言之，该函数就是Generator函数的语法糖。主要是解决了then的链式调用

### Async是Generator的语法糖的解释
所谓generator语法糖，表明的就是「aysnc/await」实现的就是generator实现的功能。但是「async/await」比generator要好用。因为generator执行yield设下的断点采用的方式就是不断的调用iterator方法，这是个手动调用的过程。
而async配合await得到的就是断点执行后的结果。因此「async/await」比generator使用更普遍。

### async优点
- 内置执行器
- 语义更好
- 适用性更广

### async缺点
- 误用 await 可能会导致性能问题，因为 await 会阻塞代码。


## 区别
- `promise`和`async/await`是专门用于处理异步操作的
- `Generator`并不是为异步而设计出来的，它还有其他功能（对象迭代、控制输出、部署`Interator`接口...）
- `promise`编写代码相比`Generator`、`async`更为复杂化，且可读性也稍差
- `Generator`、`async`需要与`promise`对象搭配处理异步情况
- `async`实质是`Generator`的语法糖，相当于会自动执行`Generator`函数
- `async`使用上更为简洁，将异步代码以同步的形式进行编写，是处理异步编程的最终方案

## 总结
promise通过then链式调用优化了回调函数的层层嵌套的地狱调用的问题，async优化了promise的then链式调用的问题。

### 案列
假设一个业务，分多个步骤完成，每个步骤都是异步的，而且依赖于上一个步骤的结果。我们仍然用 setTimeout 来模拟异步操作：
```js
/*
 * 传入参数n,表示这个函数执行的时间(毫秒)
 * 执行的结果是 n+200,这个值将用于下一步骤
*/  
function takeLongTime(n){
  return new Promise((resolve) => {
    setTimeout(() => resolve(n + 200),n);
  })
}
function step1(n){
  console.log(`step1 with ${n}`);
  return takeLongTime(n);
}
function step2(n){
  console.log(`step2 with ${n}`);
  return takeLongTime(n);
}
function step3(n){
  console.log(`step3 with ${n}`);
  return takeLongTime(n);
}
```
现在用 Promise 方式来实现这三个步骤的处理

```js
function doIt(){
  console.time('doIt');
  let time1 = 300;
  step1(time1)
    .then((time2) => step2(time2))
    .then((time3) => step3(time3))　　
    .then((result) => {
      console.log(`result is ${result}`);
      console.timeEnd("doIt");
    })
}
 
doIt();
 
//执行结果为:
//step1 with 300
//step2 with 500
//step3 with 700
//result is 900
//doIt: 1510.2490234375ms
```
输出结果 result 是 step3() 的参数 700 + 200 = 900。doIt() 顺序执行了三个步骤，一共用了 300 + 500 + 700 = 1500 毫秒，和 console.time()/console.timeEnd() 计算的结果一致。

如果用 async/await 来实现呢，会是这样。
```js
async function doIt() {
  console.time('doIt');
  let time1 = 300;
  let time2 = await step1(time1);//将Promise对象resolve(n+200)的值赋给time2
  let time3 = await step1(time2);
  let result = await step1(time3);
  console.log(`result is ${result}`);
  console.timeEnd('doIt');
}
 
doIt();
 
//执行结果为:
//step1 with 300
//step2 with 500
//step3 with 700
//result is 900
//doIt: 1512.904296875ms
```
结果和之前的 Promise 实现是一样的，但是这个代码看起来是不是清晰得多，几乎跟同步代码一样。

还有更酷的

现在把业务要求改一下，仍然是三个步骤，但每一个步骤都需要之前每个步骤的结果。

```js
/*
 * 传入参数n,表示这个函数执行的时间(毫秒)
 * 执行的结果是 n+200,这个值将用于下一步骤
*/  
function takeLongTime(n){
  return new Promise((resolve) => {
    setTimeout(() => resolve(n + 200),n);
  })
}
function step1(n){
  console.log(`step1 with ${n}`);
  return takeLongTime(n);
}
function step2(m,n){
  console.log(`step2 with ${m} + ${n}`);
  return takeLongTime(m + n);
}
function step3(k,m,n){
  console.log(`step3 with ${k} + ${m} + ${n}`);
  return takeLongTime(k + m + n);
}
```
这回先用 async/await 来写：

```js
async function doIt() {
  console.time('doIt');
  let time1 = 300;
  let time2 = await step1(time1);//将Promise对象resolve(n+200)的值赋给time2
  let time3 = await step2(time2,time1);
  let result = await step3(time3,time2,time1);
  console.log(`result is ${result}`);
  console.timeEnd('doIt');
}
 
doIt();
 
//执行结果为:
//step1 with 300
//step2 with 500 + 300
//step3 with 1000 + 500 + 300
//result is 2000
//doIt: 2916.655029296875ms
```

除了觉得执行时间变长了之外，似乎和之前的示例没啥区别啊！别急，认真想想如果把它写成 Promise 方式实现会是什么样子？
```js
function doIt() {
  console.time('doIt');
  let time1 = 300;
  step1(time1)
    .then((time2) => {
      return step2(time1,time2)
          .then((time3) => [time1,time2,time3])//step3需要用到time1,time2,time3，因此需要返回
    })
    .then((times) => {
      let [time1,time2,time3] = times;
      return step3(time1,time2,time3)
    })
    .then((result) => {
      console.log(`result is ${result}`);
      console.timeEnd('doIt');
    })
}
 
doIt();
 
//执行结果为:
//step1 with 300
//step2 with 300 + 500
//step3 with 300 + 500 + 1000
//result is 2000
//doIt: 2919.49609375ms
```
有没有感觉有点复杂的样子？那一堆参数处理，就是 Promise 方案的死穴—— 参数传递太麻烦了，看着就晕！

注意点
就目前来说，已经理解 async/await 了吧？但其实还有一些事情没提及——Promise 有可能 reject 啊，怎么处理呢？

await 命令后面的 Promise 对象，运行结果可能是 rejected，所以最好把 await 命令放在 try...catch 代码块中。
```js
async function myFunction() {
  try {
    await somethingThatReturnAPromise();
  } catch (err){
    console.log(err);
  }
}
 
//另一种写法
async function myFunction() {
  await somethingThatReturnAPromise().catch(function(err) {
    console.log(err);
  })
}
```
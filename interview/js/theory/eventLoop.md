# 事件循环机制

::: tip 是什么
事件循环是 js 的执行机制，js是单线程程序，单线程意味着同一时间内只能做一件事，js就是通过事件循环机制来实现非阻塞。
:::
### 如何执行
所有的同步任务都是在主线上执行，主线程还有一个队列，宏任务和微任务是放在队列里面，等待执行，当主线程任务全部执行完之后，就会去执行队列里面的任务，微任务永远在宏任务执行之前。宏任务下一个事件执行的开始，每次执行一个宏任务之后就会进行下一轮的事件执行机制，一直这么执行下去，直到任务清空。

### 如何循环

第一次进入整体代码 script（宏任务，开始第一次循环，接着执行所有的微任务。然后再次从宏任务开始，找到其中一个任务队列执行完毕，再执行所有的微任务。

### js 执行机制

同步任务（主线程）整体代码 script（宏任务） => 微任务 => 下一个宏任务 => 循环下去。

### js 事件

广义上的同步和异步，更细致的又分宏任务和微任务
宏任务：整体代码 script,setTimeOut,setInterval.
微任务：promise,nextTick.

### 练习题目

```js
setTimeout(function () {
  console.log('定时器开始啦') //4
})
new Promise(function (resolve) {
  console.log('马上执行for循环啦') //1
  for (var i = 0; i < 10000; i++) {
    i == 99 && resolve()
  }
}).then(function () {
  console.log('执行then函数啦') //3
})

console.log('代码执行结束') //2

//结果输出:马上执行for循环啦 > 代码执行结束 > 执行then函数啦 > 定时器开始啦
```

异步任务进一步分析

```js
console.log(1)
setTimeout(function () {
  console.log(2)
}, 1000)
setTimeout(function () {
  console.log(3)
}, 0)
console.log(4)

/*
    猜测是：1、4、2、3   但实际上是：1、4、3、2
    分析：
        同步任务，按照顺序一步一步执行
        异步任务，当读取到异步任务的时候，将异步任务放置到Event table（事件表格）
中，当满足某种条件或者说指定事情完成了（这里的是时间分别是达到了0ms和1000ms）当指定
事件完成了才从Event table中注册到Event Queue（事件队列），当同步事件完成了，便从
Event Queue中读取事件执行。（因为3的事情先完成了，所以先从Event table中注册到
Event Queue中，所以先执行的是3而不是在前面的2）
*/
```

宏任务和微任务

```js
console.log(1)
setTimeout(function () {
  console.log(2)
}, 1000)

new Promise(function (resolve) {
  console.log(3)
  resolve()
}).then(function () {
  console.log(4)
})
console.log(5)
/*
    以同步异步的方式来判断的结果应该是：1、3、5、2、4
    但是事实上结果是：1、3、5、4、2
    为什么是这样呢？因为以同步异步的方式来解释执行机制是不准确的，更加准确的方式是宏任务和微任务：
    因此执行机制便为：执行宏任务 ===> 执行微任务 ===> 执行另一个宏任务 ===> 不断循环
        即：在一个事件循环中，执行第一个宏任务，宏任务执行结束，执行当前事件循环中的微任务，
执行完毕之后进入下一个事件循环中，或者说执行下一个宏任务
*/
```

是否彻底理解 JavaScript 执行机制实例

```js
console.log('1')

setTimeout(function () {
  console.log('2')
  process.nextTick(function () {
    console.log('3')
  })
  new Promise(function (resolve) {
    console.log('4')
    resolve()
  }).then(function () {
    console.log('5')
  })
})
process.nextTick(function () {
  console.log('6')
})
new Promise(function (resolve) {
  console.log('7')
  resolve()
}).then(function () {
  console.log('8')
})

setTimeout(function () {
  console.log('9')
  process.nextTick(function () {
    console.log('10')
  })
  new Promise(function (resolve) {
    console.log('11')
    resolve()
  }).then(function () {
    console.log('12')
  })
})

/*
1、 第一轮事件循环流程分析如下：
    整体script作为第一个宏任务进入主线程，遇到console.log，输出1。
    遇到setTimeout，其回调函数被分发到宏任务Event Queue中。我们暂且记为setTimeout1。
    遇到process.nextTick()，其回调函数被分发到微任务Event Queue中。我们记为process1。
    遇到Promise，new Promise直接执行，输出7。then被分发到微任务Event Queue中。我们记为then1。
    又遇到了setTimeout，其回调函数被分发到宏任务Event Queue中，我们记为setTimeout2。
         
    宏任务Event Queue   微任务Event Queue
    setTimeout1         process1
    setTimeout2         then1
     
    上表是第一轮事件循环宏任务结束时各Event Queue的情况，此时已经输出了1和7。
    我们发现了process1和then1两个微任务。
    执行process1,输出6。
    执行then1，输出8。
     
    好了，第一轮事件循环正式结束，这一轮的结果是输出1，7，6，8。
     
2、 那么第二轮时间循环从setTimeout1宏任务开始：
     
    首先输出2。接下来遇到了process.nextTick()，同样将其分发到微任务Event Queue中，
记为process2。new Promise立即执行输出4，then也分发到微任务Event Queue中，记为then2。
     
    宏任务Event Queue     微任务Event Queue
    setTimeout2           process2
                          then2
                           
    第二轮事件循环宏任务结束，我们发现有process2和then2两个微任务可以执行。
        输出3。
        输出5。
        第二轮事件循环结束，第二轮输出2，4，3，5。
 
3、 第三轮事件循环开始，此时只剩setTimeout2了，执行。
        直接输出9。
        将process.nextTick()分发到微任务Event Queue中。记为process3。
        直接执行new Promise，输出11。
        将then分发到微任务Event Queue中，记为then3。
         
    宏任务Event Queue     微任务Event Queue
                            process3
                            then3     
    第三轮事件循环宏任务执行结束，执行两个微任务process3和then3。
        输出10。
        输出12。
        第三轮事件循环结束，第三轮输出9，11，10，12。
 
    整段代码，共进行了三次事件循环，完整的输出为1，7，6，8，2，4，3，5，9，11，10，12。
*/
```

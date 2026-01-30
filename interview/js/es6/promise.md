# promise的使用
::: tip 专题简介
- promise介绍
:::

## promise介绍
promise是异步编程的一种解决方案，比传统的回调函数解决方案更加合理和更加强大，是一个构造函数，自己身上有all、reject、resolve，race这几个方法，原型上有then、catch，finally等方法。

### promise特点
- 对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。
- 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

### promise三种状态
- pending(等待态)
- fulfiled(成功态)
- rejected(失败态)

### promise缺点
- Promise 无法取消：一旦新建就会执行，无法中途取消；
- 如果不设置回调函数，Promise 内部抛出的错误不会反应到外部；
- 当处于 pendding 状态时，无法知道目前进展到哪一个阶段；

### 使用场景和优点
- 有效的解决 js 异步回调地狱问题；
- 将业务逻辑与数据处理分隔开使代码更优雅，方便阅读，更有利于代码维护；

## promise方法
 - promise.finally()
 - promise.all()
 - promise.race()
 - promise.any()
 - promise.allSettled()

 ### promise.finally()
 `Promise`对象的finally()方法用于在Promise成功或拒绝时使用

 不管promise最后的状态，在执行完then或catch指定的回调函数以后，都会执行finally方法指定的回调函数，它可以防止Promise的then()和catch()方法中的代码重复。
 ```js
 /**
  * 请求完成之后关闭loading可以在finally处理，
  * 不要在then里面处理，then处理如果catch的话，
  * 还需要重新处理一遍
  */
 this.opLoading = true;
api.then((res) => {
	if(res.code == 200){
		// xxx
	}
}).catch((err) => {
	// xxx
}).finally(()=> {
	this.opLoading = false;
})

 ```

 ### promise.all()
 将多个promise实例包装成一个新的promise实例。通过数组的形式传参，同时，成功和失败的返回值是不同的，成功的时候返回的是一个结果数组，而失败的时候则返回最先被reject失败状态的值。
 #### 特点
 - 只有所有的 Promise 都成功了，才会执行 resolve 并返回是所有成功的返回值数组，状态为成功状态；
 - 如果有一个 Promise 失败了，则会直接执行 reject 返回失败的返回值，状态为失败状态；
 - 有多个 Promise 失败，则返回第一个失败的返回值；

 ```js
 const p1 = function () {
        return new Promise((resolve, reject)=>{
            resolve(1);
        });
    };
    const p2 = function () {
        return new Promise((resolve, reject)=>{
            resolve(2);
        });
    };
    const p3 = function () {
        return new Promise((resolve, reject)=>{
            // reject("失败了")
            resolve(3);
        });
    };

    // Promise.all 所有封装的Promise都成功才会成功，只要有一个失败就会失败
    let p = Promise.all([p1(), p2(), p3()]).then(results=>{
        console.log(results);//[1, 2, 3]
    }).catch(error=>{
        console.log(err);
        // 当p3的reject("失败了")被解开时控制台会打印失败了
    })
 
 ```
 ### promise.rece()
将多个promise实例包装成一个新的promise实例，它是赛跑的意思，谁第一个完成就返回谁的结果。如果第一个是失败这个 Promise 就失败，如果第一个是成功就是成功；

```js
// race()  把多个封装的promise 组合起来，看谁跑的快
const p1 = function () {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve(1);
        }, 500)

    });
};
const p2 = function () {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve(2);
        }, 400)
    });
};
const p3 = function () {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve(3);
        }, 600)
    });
};
//谁先执行完成就先执行回调，其余的将不会再进入race的任何回调,其余的没有停止，自行执行
let result = Promise.race([p1(), p2(), p3()]).then(results=>{
    console.log(results);
}).catch(error=>{
    console.log(error);
})
 
```
### promise.any()
- 要有一个实例变成fulfilled，他就会变成fulfilled
- 只有全部实例状态都变成rejected，它才会变成rejected

```js
 // 1. 只要有一个实例变成fulfilled，他就会变成fulfilled
        // 2. 只有全部实例状态都变成rejected，它才会变成rejected
  const p1 = function () {
            return new Promise((resolve, reject)=>{  
                resolve(5);
            });
        };
        const p2 = function () {
            return new Promise((resolve, reject)=>{
                reject(2);
            });
        };
        const p3 = function () {
            return new Promise((resolve, reject)=>{ 
                resolve(3);
            });
        };
 
        let result = Promise.any([p1(), p2(), p3()]).then(results=>{
            console.log(results);
            // 5 因为p1成功了，只返回找到的第一个成功的，遇到reject会继续向下寻找
        }).catch(error=>{
            console.log(error);
            // 当三个return返回的都是reject时，控制台打印AggregateError: All promises were rejected
        })
```

### promise.allSettled()

等所有实例都返回结果，他的状态就只会变成fulfilled
```js
const p1 = function () {
        return new Promise((resolve, reject) => {
            resolve(1);
        });
    };
    const p2 = function () {
        return new Promise((resolve, reject) => {
            resolve(2);
        });
    };
    const p3 = function () {
        return new Promise((resolve, reject) => {
            reject(3);
        });
    };
 
    // Promise.allSettled无论成功或者失败会把所有的状态返回给results
    // 没有catch
    let result = Promise.allSettled([p1(), p2(), p3()]).then(results => {
        console.log(results);
    })
```
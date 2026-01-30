# 防抖与节流

## 是什么
本质上是优化高频率执行代码的一种手段
如：浏览器的 resize、scroll、keypress、mousemove 等事件在触发时，会不断地调用绑定在事件上的回调函数，极大地浪费资源，降低前端性能

为了优化体验，需要对这类事件进行调用次数的限制，对此我们就可以采用 防抖（debounce） 和 节流（throttle） 的方式来减少调用频率

## 定义
- 节流: n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效
- 防抖: n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时

## 防抖
::: tip 防抖(debounce)
防抖触发高频率事件时n秒后只会执行一次,如果n秒内再次触发,则会重新计算。
:::

概述:每次触发时都会取消之前的延时调用。

```html
<!-- HTML 部分 -->
<input type="text" id="input">
```

```js
// JS 部分
// 防抖函数
function bounce(delay, cb) {
    var timer
    return function (value) {
        clearTimeout(timer)
        timer = setTimeout(function(){
            cb(value)
        }, delay)
    }
}
function fn(value) {
    console.log(value)
}
var inputItem = document.getElementById('input')
var bounceFun = bounce(1000, fn)
inputItem.addEventListener('keyup', function(e){
    bounceFun(e.target.value)
})
```

## 节流
::: tip 节流(throttle)
高频事件触发，每次触发事件时设置一个延迟调用方法，并且取消之前的延时调用方法。
:::

```html
<!-- HTML 部分 -->
<button id="button">点击我</button>
<p>随机数：<span id="js-random"></span></p>
```

```js
// JS 部分
// 节流
function throttling(func, wait) {
    var timer
    return function() {
        if (!timer) {
            timer = setTimeout(function(){
                func()
                timer = null
            }, wait)
        }
    }
}
function handle() {
    document.getElementById('js-random').innerHTML = Math.random()
}
document.getElementById('button').onclick = throttling(handle, 1000)
```
::: warning 防抖与节流的区别
函数防抖是在「一定时间」内连续触发的事件，只在「最后执行一次」。如果事件在「不超过设定时间」内一直触发，则事件会一直不执行。

函数节流是「一段时间内」只执行一次。就是设置「1秒」时间时，不管触发事件1次还是100次，它都最终有且只会执行一次。
:::

## 应用场景
防抖在连续的事件，只需触发一次回调的场景有：
- 搜索框搜索输入。只需用户最后一次输入完，再发送请求
- 手机号、邮箱验证输入检测
- 窗口大小resize。只需窗口调整完成后，计算窗口大小。防止重复渲染。

节流在间隔一段时间执行一次回调的场景有：
- 滚动加载，加载更多或滚到底部监听
- 搜索框，搜索联想功能
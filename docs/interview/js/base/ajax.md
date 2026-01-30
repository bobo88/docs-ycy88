# 异步请求xhr、ajax、axios比较
:::tip 专题简介
- XMLHttpRequest对象
- jQuery ajax
- axios
- feat
:::
## XMLRequest对象
现代浏览器，最开始与服务器交换数据，都是通过XMLHttpRequest对象。它可以使用JSON、XML、HTML和text文本等格式发送和接收数据。

### 优点
- 不重新加载页面的情况下更新网页
- 在页面已加载后从服务器请求/接收数据
- 在后台向服务器发送数据
### 缺点
- 使用起来比较繁琐，需要设置很多值
- 对于早期的ie浏览器，还需要写兼容代码

```js
if (window.XMLHttpRequest) { // model browser
  xhr = new XMLHttpRequest()
} else if (window.ActiveXObject) { // IE 6 and older
  xhr = new ActiveXObject("Microsoft.XMLHTTP")
}
xhr.open("POST", url, true)
xhr.send(data)
xhr.onreadystatechange = function () {
  try {
    // TODO 处理响应
    if (xhr.readyState === XMLHttpRequest.DONE) {
      // XMLHttpRequest.DONE 对应值是 4
      if (xhr.status === 200) {
           // Perfect!
      } else {
          // There was a problem with the request.
      }
    } else {
      // Not ready yet
    }
  } catch (e) {
    // 通信错误的事件中（例如服务器宕机）
    alert("Caught Exception: " + e.description)
  }
}

```
## jQuery Ajax
ajax是对XMLHttpRequest进行了封装，可以通过简单的代码，$.get，$.post进行异步请求和交互，无需要写大量的兼容代码

### 优点
- 对原生的 XMLHttpRequest 进行了封装，做了兼容处理，简化了使用
- 增加了对JSONP的支持
### 缺点
- 如果多个请求并且有依赖关系的话，会产生回调地狱
- 是针对MVC的编程，不符合现在前端MVVM的编程
- 不独立，ajax是JQuery里面的一个方法，如果只是需要用到ajax需要引入整个JQuery

```js
$.ajax({
  type: "POST",
  url: url, 
  data: data,
  dataType: dataType,
  success: function () {},
  error: function () {}
})

```
## axios
Axios是本质也是对原生XMLHttpRequest的封装，只不过它是通过Promise方法来实现的，可以用在浏览器和 node.js 中。
Vue2.0之后，尤雨溪大大推荐大家使用axios来请求数据。

优点
- 从浏览器中创建XMLHttpRequests
- 从 node.js 创建 http 请求
- 支持 Promise API
- 支持拦截请求
- 支持取消请求
- 支持拦截响应
- 自动转换 JSON 数据
- 客户端支持防御 XSRF
### 缺点
- 只持现代浏览器

```js
axios({
  method: "post",
  url: "/user/12345",
  data: {
    firstName: "liu",
    lastName: "weiqin"
  }
})
.then(res => console.log(res))
.catch(err => console.log(err))

```
## fetch
fetch 是 JS 的原生API，是js 除了XMLHttpRequest之外的，另一种原生js网络请求获取数据的方式。与XMLHttpRequest相比，fetch使用了Promise，这让它使用起来更加简洁，从而避免陷入”回调地狱”的情况。

### 优点
- 解决了回调地狱
- 跨域的处理:在配置中，添加mode:"no-cors"就可以跨域了
```js
fetch('/user.json',{
    method:'post',
    mode:'no-cors',
    data:{},
}).then(()=>{
    /**
     * handle response
     */
})
```
### fetch遇到的问题
- fetch只对网络请求报错，对400、500都当做成功的请求，需要封装去处理
- fetch 默认不会带 cookie,需要添加配置
- fetch 不支持abort,不支持超时控制，使用 setTimout.reject 的实现超时控制并不能阻止请求过程继续后台运行，造成了流量的浪费
- fetch没有办法原生检测请求的进步，而XHR可以

## ajax、Axios、fetch区别
首先，Axios 和 Fetch 都是基于 Promise 的请求方式，也就以为着二者的返回值都是 Promise 对象，所以二者都是异步函数，这是二者的共同点。那么二者的不同之处到底是什么呢？下面就来给大家详细列举出来:
- 使用技术的不同
- 请求方式
- 请求拦截器和响应拦截器
- 响应超时
- 对于数据格式的转化
- 对于数据格式的转化

### 使用技术的不同
ajax、axios都是基于js的XMLHttpRequest对象封装的，是XMLHttpRequest技术的一种实现，
axios是基于 promise 实现对 ajax 技术的一种封装，而 ajax 是基于 JS 的 XMLHttpRequest 对象封装的。
fetch 同样是基于 promise，但不是对 ajax 的封装， 和 XMLHttpRequest 对象也没有太多的关系，fetch 是 JS 的原生API，相较于 axios 对浏览器的性能有不错提升

但是由于大多数人都觉得 Axios使用体验确实优于Fetch，所以对大多数人来说，Fetch的优势仅仅在于浏览器原生支持

### 请求方式
ajax，axios的请求的参数放到 data 属性中，以对象的方式进行传递，而 Fetch 需要放到 body 属性中，以字符串的方式进行传递，这也就导致需要指定请求数据的格式为JSON 格式，同时需要使用 JSON.stringify 将请求数据格式转换成 JSON 格式

### 请求拦截器和响应拦截器
Axios 的很大的一个优点就是它拥有请求拦截器和响应拦截器，而 Fetch 没有拦截器功能

```js
// axios实现拦截
axios.interceptors.request.use((config) => {
  // 在请求之前对请求参数进行处理
  return config;
});
axios.interceptors.response.use((config) => {
  (response) => {
    return response.data
  },
  (error) => {
    // 定义一个变量：存储网络错误信息
    let message = ''
    // http状态码
    const status = error.response.status
    switch (status) {
      case 401:
        message = 'Token过期'
        break
      case 403:
        message = '无权访问'
        break
 
      ...
 
      default:
        message = '无网络'
    }
    // 提示错误信息
    ElMessage({
      type: 'error',
      message: message,
    })
    return Promise.reject(error)
  },
)
// 发送GET请求
axios.get("http://www.ggbone.com/").then((response) => {
  console.log(response.data);
});


//fetch需要自行封装拦截，需要重写fetch方法
fetch = ((originalFetch) => {
  return (...arguments) => {
    const result = originalFetch.apply(this, arguments);
    return result.then(console.log("请求已发送"));
  };
})(fetch);
 
fetch("http://example.com/")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });

```
### 响应超时
Axios 设置响应超时非常简单，直接设置timeout属性就可以了，而Fetch设置起来就远比Axios麻烦，这也是很多人更喜欢Axios而不太喜欢Fetch的原因之一
```js
axios({
  method: "post",
  url: "http://example.com/",
  timeout: 4000, // 请求4秒无响应则会超时
  data: {
    firstName: "David",
    lastName: "Pollock",
  },
})
  .then((response) => {
    /* 处理响应 */
  })
```

### 对于数据格式的转化
Axios 会自动对数据格式进行转化，Fetch则不同，它需要手动转化。
```js
// axios
axios.get("http://example.com/").then(
  (response) => {
    console.log(response.data);
  },
  (error) => {
    console.log(error);
  }
);
 
// fetch
fetch("http://example.com/")
  .then((response) => response.json()) // 需要对响应数据进行转换
  .then((data) => {
    console.log(data);
  })
  .catch((error) => console.error(error));
```
### 兼容性
Axios 可以兼容IE浏览器，而 Fetch 在 IE浏览器和一些老版本浏览器上没有受到支持，如果想要支持 Fetch 一般需要其他库的支持

## 总结
Fetch 几乎可以实现所有 Axios 能够实现的功能，但是需要自行进行封装，如果不喜欢折腾直接在项目中使用 Axios 是一个非常明智的选择，这完全取决于你是否愿意使用浏览器内置API。
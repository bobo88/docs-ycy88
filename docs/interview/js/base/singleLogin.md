# 单点登录
:::tip 专题简介
- 什么是单点登录
- 如何实现
:::
## 什么是单点登录（简称SSO）
单点登录的含义就是多台系统共享登录状态，只需要登录一次

## 为什么单点登录
在企业发展初期，企业使用的系统很少，通常一个或者两个，每个系统都有自己的登录模块，运营人员每天用自己的账号登录，很方便。
但随着企业的发展，用到的系统随之增多，运营人员在操作不同的系统时，需要多次登录，而且每个系统的账号都不一样，这对于运营人员
来说，很不方便。于是，就想到是不是可以在一个系统登录，其他系统就不用登录了呢？这就是单点登录要解决的问题。

还有一个场景，企业存在不同端的网站，手机端的登录可以共享电脑端的登录状态

## 单点登录实现方式
- 父域 Cookie（同域名下的单点登录）
- 认证中心（不同域名下的单点登录）
- LocalStorage跨域（不同域名下单点登录）

一般情况下，用户的登录状态是记录在 `Session` 中的，要实现共享登录状态，就要先共享 `Session`，但是由于不同的应用系统有着不同的域名，尽管 `Session` 共享了，但是由于 `SessionId` 是往往保存在浏览器 Cookie 中的，因此存在作用域的限制，无法跨域名传递，也就是说当用户在 `a.com` 中登录后，`Session Id` 仅在浏览器访问 `a.com` 时才会自动在请求头中携带，而当浏览器访问 `b.com` 时，`Session Id` 是不会被带过去的。实现单点登录的关键在于，如何让 `Session Id`（或 Token）在多个域中共享。


### 父域Cookie (同域名下的单点登录)

`cookie`的 `domin` 属性设置为当前域的父域，并且父域的 `cookie` 会被子域所共享。`path`属性默认为web应用的上下文路径
利用 `Cookie` 的这个特点，没错，我们只需要将 `Cookie` 的 `domain`属性设置为父域的域名（主域名），同时将 `Cookie` 的 `path` 属性设置为根路径，将 `Session ID`（或 `Token`）保存到父域中。这样所有的子域应用就都可以访问到这个 `Cookie`

不过这要求应用系统的域名需建立在一个共同的主域名之下，如 tieba.baidu.com 和 map.baidu.com，它们都建立在 baidu.com 这个主域名之下，那么它们就可以通过这种方式来实现单点登录
<b>总结：此种实现方式比较简单，但不支持跨主域名。</b>

### 认证中心 (不同域名下的单点登录)

我们可以部署一个认证中心，认证中心就是一个专门负责处理登录请求的独立的 Web 服务。

假设A系统www.a.com,B系统www.b.com是不同系统，需要共享登录状态，C系统www.c.com是认证中心登录系统

#### 实现步骤
- 访问A系统底下的某个需要登录的页面page.html
- 系统A验证用户没有登录，跳转到C系统，并且把A系统的当前地址作为地址栏参数传入。
- 请求地址为c.com?url=a.com/page.html
- C系统发现用户没有登录，跳转到C系统登录页面
- 用户输入用户名和密码进行登录，后端将TokenID返回给客户端
- C系统登录完成后收到Token并将Token存入Cookie（注意这个 Cookie 是C系统的，A和B系统访问不了）
- 写入Cookie后，地址重新跳回A系统，并且地址栏携带Token
- A系统获取到Token参数并且去C系统认证Token是否有效，有效就创建A系统的cookie将Token存入Cookie,然后完成A系统的登录
- 然后继续访问B系统受访的页面page.html
- B系统跳转到C系统并且B系统的页面作为url参数
- C系统验证发现此时C系统已经是登录状态，那么就不需要重定向到登录页面，直接返回Token
- 拿到Token页面重定向到B系统并且地址栏写到Token
- B系统携带Token去C系统验证Token的有效性
- Token有效，有效就创建B系统的cookie将Token存入Cookie
- B系统完成自动登录流程

### LocalStorage跨域（不同域名下单点登录）

可以选择将 `Session ID` （或 `Token` ）保存到浏览器的 `LocalStorage` 中，让前端在每次向后端发送请求时，主动将 `LocalStorage` 的数据传递给服务端

这些都是由前端来控制的，后端需要做的仅仅是在用户登录成功后，将 `Session ID` （或 `Token` ）放在响应体中传递给前端

单点登录完全可以在前端实现。前端拿到 `Session ID` （或 `Token` ）后，除了将它写入自己的 `LocalStorage` 中之外，还可以通过特殊手段将它写入多个其他域下的 `LocalStorage` 中
关键代码如下：
```js
// 获取 token
var token = result.data.token;
 
// 动态创建一个不可见的iframe，在iframe中加载一个跨域HTML
var iframe = document.createElement("iframe");
iframe.src = "http://app1.com/localstorage.html";
document.body.append(iframe);
// 使用postMessage()方法将token传递给iframe
setTimeout(function () {
    iframe.contentWindow.postMessage(token, "http://app1.com");
}, 4000);
setTimeout(function () {
    iframe.remove();
}, 6000);
 
// 在这个iframe所加载的HTML中绑定一个事件监听器，当事件被触发时，把接收到的token数据写入localStorage
window.addEventListener('message', function (event) {
    localStorage.setItem('token', event.data)
}, false);
```
前端通过 iframe+postMessage() 方式，将同一份 Token 写入到了多个域下的 LocalStorage 中，前端每次在向后端发送请求之前，都会主动从 LocalStorage 中读取 Token 并在请求中携带，这样就实现了同一份 Token 被多个域所共享
此种实现方式完全由前端控制，几乎不需要后端参与，同样支持跨域

<a href="https://segmentfault.com/a/1190000039712911" target="_blank">参考地址</a><br/>
<a href="https://zhuanlan.zhihu.com/p/66037342" target="_blank">参考地址</a> 

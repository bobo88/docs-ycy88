# HTTP有哪些请求方法
:::tip 专题简介
- 请求方式集合
- GET和POST比较
- 
:::
## 请求方法有哪些
- GET
- POST
- PUT
- DELETE
- OPTIONS
- HEAD
- PATCH
- CONNECT
- TRACE

### GET请求
GET请求是最常用的请求方式，用于向服务器请求获取某个资源。GET请求的参数会附加在URL的后面，以问号（?）分隔，例如：http://www.example.com/?name=Tom&age=18。GET请求的特点是请求参数明文传输，请求长度有限制，不适合传输敏感信息。

###  POST请求
POST请求用于向服务器提交数据，通常用于表单提交、文件上传等场景。POST请求的参数不会附加在URL的后面，而是包含在请求体中，以二进制形式传输，可以传输大量数据。POST请求的特点是请求参数不可见，请求长度无限制，适合传输敏感信息。

### PUT请求
PUT请求用于向服务器更新某个资源，通常用于上传文件、更新数据等场景。PUT请求的参数也包含在请求体中，以二进制形式传输。PUT请求的特点是请求具有幂等性，即重复请求不会对服务器产生影响。

### DELETE请求
DELETE请求用于向服务器删除某个资源，通常用于删除文件、删除数据等场景。DELETE请求的参数也包含在请求体中，以二进制形式传输。DELETE请求的特点是请求具有幂等性，即重复请求不会对服务器产生影响。


### OPTIONS请求
OPTIONS请求用于向服务器请求获取某个资源所支持的HTTP请求方式，通常用于Web API的开发和调试。OPTIONS请求的特点是只返回支持的请求方式，不返回响应体，可以帮助开发者了解Web API的使用方法。

### HEAD请求
HEAD请求用于向服务器请求获取某个资源的头部信息，通常用于检查资源是否存在、获取资源的元数据等场景。HEAD请求的特点是只返回响应头部信息，不返回响应体，可以减少网络流量和服务器负载。

### PATCH请求
对PUT方法的补充，用来对已知资源的进行局部更新

### CONNECT请求
HTTP1.1中预留给能够将连接改为管道方式的代理服务器

### TRACE请求
回显服务器收到的请求，主要用于测试和诊断


## GET和POST的区别
- get是从服务器获取数据，post是向服务器传送数据
- 传参形式不同：get从地址栏拼接参数，post的参数通过data传送，地址栏不可见
- 传送的数据大小不同:get传送数据小，不能大于2KB ,因为收到url地址栏的限制。post传送数据较大，一般不受限制。
- 安全性：get的参数是暴露在地址栏的，相对来说安全性低。post的请求信息是放在头的，安全性较高。
- get限制From表单的数据集的值必须为ASCLL字符，而post支持整个ISO10646字符集

## 简单请求和复杂请求的区别
- 简单请求的请求方式是GET，POST，HEAD
- 简单请求不能自定义请求头
- 简单请求头信息只能包括:Accept,Accept-Language,Content-Language,Content-Type
- 简单请求的Content-Type的值仅限于下列三者之一：text/plain,multipart/form-data , application/x-www-form-urlencoded 
- 简单请求是不会存在预请求的，只有复杂请求才存在预请求。

## 什么是OPTION（预）请求
复杂请求在正式请求前都会有预检请求（OPTIONS请求），用于向服务器请求权限信息的。   options----询问作用

## 为什么会有OPTION（预）请求
因为浏览器的CROS策略，为了安全起见，浏览器会自发的发送一个OPTION（预）请求，询问服务器是否可以进行正式请求

## 如何取消OPTION（预）请求
- 用简单请求，不要自定义头部:
后台通过修改头部Access-Control-Max-Age:(时间)表示option请求缓存多久。这样就不会每次请求都有option了。
- 和后端协商，将所有的OPTION请求放行
- 引入qs模块处理数据
```js
request.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
   if (request.method == 'post') {
        request.data = qs.stringify(request.data);        
    }
```
:::tip 注意
axios 都是复杂请求，ajax 可以是简单请求。
:::
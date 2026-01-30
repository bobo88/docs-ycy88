# JS本地存储
:::tip 专题简介
- 方式
- 区别
- 应用场景
:::
## 一、方式
js本地缓存的方法我们主要讲述以下四种：
- cookie
- sessionStorage
- localStorage
- indexDB

### cookie
是客户端和服务器端发送http请求中携带的用来实现登录身份识别

#### 特点:
- http携带
- 储存小型数据，一般不超过4kb
- 通过设置过期时间来维持生效

### localStorage
`HTML5`新方法，IE8及以上浏览器都兼容,存储在本地的数据.

#### 特点
- 生命周期：持久化的本地存储，除非主动删除数据，否则数据是永远不会过期的
- 存储的信息在同一域中是共享的
- 当本页操作（新增、修改、删除）了localStorage的时候，本页面不会触发storage事件,但是别的页面会触发storage事件。
- 大小：5M（跟浏览器厂商有关系）
- localStorage本质上是对字符串的读取，如果存储内容多的话会消耗内存空间，会导致页面变卡
受同源策略的限制

下面再看看关于localStorage的使用
```js
//设置
localStorage.setItem('username','cfangxu');

//获取
localStorage.getItem('username')

//获取键名
localStorage.key(0) //获取第一个键名

//删除
localStorage.removeItem('username')

//一次性清除所有存储
localStorage.clear()
```
#### 缺点
- 无法像`Cookie`一样设置过期时间
- 只能存入字符串，无法直接存对象

```js
localStorage.setItem('key', {name: 'value'});
console.log(localStorage.getItem('key')); // '[object, Object]'
```

### sessionStorage
`sessionStorage` 和 `localStorage` 使用方法基本一致，唯一不同的是生命周期，一旦页面（会话）关闭，`sessionStorage` 将会删除数据


### indexedDB
`indexedDB`是一种低级API，用于客户端存储大量结构化数据(包括, 文件/ blobs)。该API使用索引来实现对该数据的高性能搜索
虽然 Web Storage对于存储较少量的数据很有用，但对于存储更大量的结构化数据来说，这种方法不太有用。`IndexedDB`提供了一个解决方案

#### 优点：
- 储存量理论上没有上限
- 所有操作都是异步的，相比 LocalStorage 同步操作性能更高，尤其是数据量较大时
- 原生支持储存JS的对象
- 是个正经的数据库，意味着数据库能干的事它都能干

#### 缺点：
- 操作非常繁琐
- 本身有一定门槛

关于indexedDB的使用基本使用步骤如下：
- 打开数据库并且开始一个事务
- 创建一个 object store
- 构建一个请求来执行一些数据库操作，像增加或提取数据等。
- 通过监听正确类型的 DOM 事件以等待操作完成。
- 在操作结果上进行一些操作（可以在 request对象中找到）
- 关于使用indexdb的使用会比较繁琐，大家可以通过使用Godb.js库进行缓存，最大化的降低操作难度

## 二、区别

- 三个都是客户端本地存储数据，cookie的存储是小型的数据，一般不超过4kb，sessionStorage和LocalStorage用来存储大数据，可以存储5MB
- Cookie是客户端和服务器端发送http请求中携带的
- SessionStorage和 localStorage是存储在本地的数据。
- Cookie在设置的过期时间内是生效的，一旦是超出过期时间就自动失效，清除
- SessionStorage是关闭标签之后失效，关闭标签之前一直存在
- LocalStorage 是永久存在。

## 三、应用场景

在了解了上述的前端的缓存方式后，我们可以看看针对不对场景的使用选择：

- 标记用户与跟踪用户行为的情况，推荐使用cookie
- 适合长期保存在本地的数据（令牌），推荐使用localStorage
- 敏感账号一次性登录，推荐使用sessionStorage
- 存储大量数据的情况、在线文档（富文本编辑器）保存编辑历史的情况，推荐使用indexedDB
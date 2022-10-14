###  PM2
::: tip PM2
NODE.JS 的高级生产流程管理器。<br/>
PM2 是一个守护进程管理器，它将帮助您管理和保持您的应用程序 24/7 在线。
:::
#### PM2 能解决什么问题？
我们的线上Node项目，可以通过 `node app` 来启动，但是一旦报错就可能直接导致整个服务崩溃。

所以我们需要有一个工具来管理 Node项目， 让它能实现如性能监控、自动重启、负载均衡等功能。

PM2 包含一个自动负载均衡器。
```js
// 安装
$ npm install pm2 -g
```

#### PM2 的常见命令
```js
// 运行某个项目
$ pm2 start app.js

// 监控所有启动的进程
$ pm2 monit

// ======= 微服务
// 列出所有进程：
$ pm2 list         // 显示所有进程
// 对进程进行操作
$ pm2 stop [**]    // 停止进程
$ pm2 restart [**] // 重启进程
$ pm2 delete [**]  // 删除进程
$ pm2 reload all   // 重载所有进程
// 日志操作
$ pm2 logs [**]
$ pm2 flush       // 清空所有日志
// [**]里面可以传入 id值 或 all
// all对所有进程采取行动
// id作用于特定的进程 ID

// ====== 如何更新 PM2
// 1. 安装最新的 pm2 版本：
$ npm install pm2@latest -g
// 2. 然后更新内存中的 PM2 ：
$ pm2 update
```


参考地址：<br/>
<a href="https://pm2.keymetrics.io/" target="_blank">PM2官网</a> <br/>
<a href="https://www.npmjs.com/package/pm2" target="_blank">PM2 npm地址</a> <br/>
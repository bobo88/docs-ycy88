## Taro+vue3 微信小程序踩坑记录

记录开发过程中需要注意的小问题

### 微信小程序的头部导航栏问题

头部导航栏和底部导航栏是最高层的，可以通过 app.config.js 配置头部导航栏的样式和隐藏头部导航栏

```js
export default {
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "陆运货物无缝清关系统",
    navigationBarTextStyle: "black",
    onReachBottomDistance: 50,
  },
};
```

### 小程序分包

#### 什么是分包？

把一个完整的项目，按照需求划分为不同的子包，在构建时打包成不同的包，用户在使用的时候按需进行加载。

#### 为什么需要分包？

小程序是比较轻便的，为了使每个用户使用小程序的时候，可以体验快速的速度，小程序限制每个包不能超过 2MB ,这就限制了小程序的功能拓展。

#### 如何分包

需要在主包 app.confg.js 文件里面配置，一般分包之后， 是由主包，和几个子包构成，tabBar 是放在主包里面，目录如下:

```js
export default {
  pages: ["pages/login/index", "pages/home/index", "pages/mine/index"],
  subpackages: [
    {
      //sub 大陆子包
      root: "pages/subCN",
      pages: [
        "truck/home/index",
        "truck/addCar/index",
        "unbind/home/index",
        "confirm/home/index",
        "confirm/recordList/index",
        "confirm/details/index",
        "confirm/receipt/index",
        "confirm/singleShot/index",
        "confirm/changeType/index",
        "carQuery/home/index",
        "truck/trayInfo/index",
      ],
    },
    {
      //sub 香港子包
      root: "pages/subHK",
      pages: [
        "bundle/home/index",
        "bundle/addCar/index",
        "bundle/ccrn/index",
        "bundle/detail/index",
        "bundle/selectGoods/index",
        "bundleInquire/home/index",
        "bundleInquire/recordList/index",
        "bundleInquire/details/index",
        "bundleInquire/receipt/index",
        "unbind/home/index",
      ],
    },
    {
      //sub 用户中心自包
      root: "pages/subUser",
      pages: [
        "wallet/index",
        "register/index",
        "findPwd/index",
        "setPwd/index",
        "concat/index",
        "webPage/index",
        "bill/index",
        "recharge/index",
      ],
    },
  ],
};
```

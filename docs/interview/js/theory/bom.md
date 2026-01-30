# BOM对象的理解
:::tip 内容简介
- window
- location
- navigator
- screen
- history
:::

## BOM对象是什么
`BOM` (Browser Object Model)，浏览器对象模型，提供了独立于内容与浏览器窗口进行交互的对象

### 作用
其作用就是跟浏览器做一些交互效果,比如如何进行页面的后退，前进，刷新，浏览器的窗口发生变化，滚动条的滚动，以及获取客户的一些信息如：浏览器品牌版本，屏幕分辨率


### DOM对象是什么
DOM是指文档对象模型，网页面呈现的内容都可以说是文档对象模型，DOM 是为了操作元素节点出现的API标准

### BOM和DOM的区别
BOM是js对浏览器对象进行交互和操作，DOM是js对元素进行交互和操作

## window
`Bom` 的核心对象是 `window` ，它表示浏览器的一个实例
在浏览器中，`window` 对象有双重角色，即是浏览器窗口的一个接口，又是全局对象
因此所有在全局作用域中声明的变量、函数都会变成 `window` 对象的属性和方法
```js
var name = 'js每日一题';
function lookName(){
  alert(this.name);
}

console.log(window.name);  //js每日一题
lookName();                //js每日一题
window.lookName();         //js每日一题
```
## location

url地址如下：
```sh
http://foouser:barpassword@www.wrox.com:80/WileyCDA/?q=javascript#contents

```
location属性描述如下：
## navigator
`navigator` 对象主要用来获取浏览器的属性，区分浏览器类型。属性较多，且兼容性比较复杂

下表列出了 `navigator` 对象接口定义的属性和方法：

## screen
保存的纯粹是客户端能力信息，也就是浏览器窗口外面的客户端显示器的信息，比如像素宽度和像素高度

## history
`history` 对象主要用来操作浏览器URL的历史记录，可以通过参数向前，向后，或者向指定URL跳转
常用的属性如下:
- history.go():向最近的一个记录中包含指定字符串的页面跳转
- history.forward()：向前跳转一个页面
- history.back()：向后跳转一个页面
- history.length：获取历史记录数
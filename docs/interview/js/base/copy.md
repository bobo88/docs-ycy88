# 深拷贝和浅拷贝
:::tip 专题简介
- 深浅拷贝区别
- 解构赋值
- 手动实现深浅拷贝
:::
## 深拷贝和浅拷贝的区别
- 深拷贝:是创建一块空间，把原来的数据的属性一个一个拿过去
- 浅拷贝:浅拷贝是拷贝地址

## 解构赋值是深拷贝还是浅拷贝?
- 一维数组和一维对象是深拷贝
- 多维数据和多维对象是浅拷贝

## 日常工作怎么实现深拷贝?
通过 JSON.parse(JSON.stringiFy(obj))去实现
- 原理:改变原来对象的性质来实现深拷贝的效果
- 弊端：
 1. 针对js一些关键字会丢失
 2. 比如:function 、 null、正则表达式拷贝会丢失无效

 ## 如何解决不常用对象的深拷贝
 - 利用工具函数:比如lodash
 - 手写一个深拷贝

## 手写深拷贝
 思路：
  1. null和基础类型(number,boolean,string)直接返回
  2. array和可以for in的对象，通过for in递归拷贝
  3. 处理function,Map,Set
  4. 处理正则表达式

```js
//手写深拷贝
/**
 * 思路：
 * 1、null和基础类型(number,boolean,string)直接返回
 * 2、array和可以for in的对象，通过for in递归拷贝
 * 3、处理function,Map,Set
 * 4、处理正则表达式
 * 参考地址:https://www.cnblogs.com/echolun/p/16157161.html
 *
 **/
//是否是对象
let isObject = (data, map = new Map()) => {
  const type = typeof data;
  return data !== null && (type === "object" || type === "function");
};

//判断对象类型
let getObjectType = (obj) => {
  return Object.prototype.toString.call(obj);
};

//克隆正则
let cloneRegExp = (obj) => {
  const { source, flags, lastIndex } = obj;
  let obj_ = new RegExp(source, flags);
  obj_.lastIndex = lastIndex;
  return obj_;
};
//克隆其他
let cloneOtherObject = (obj, type) => {
  const basicTypes = [
    "[object Boolean]",
    "[object Number]",
    "[object String]",
    "[object Date]",
  ];
  if (basicTypes.includes(type)) {
    return new obj.constructor(obj.valueOf());
  }
  if (type === "[object Symbol]") {
    return Object(obj.valueOf);
  }
  if (type === "[object RegExp]") {
    return cloneRegExp(obj);
  }
  if (type === "[object Function]") {
    return obj;
  }
};
//深拷贝
let deepClone = (data, map = new Map()) => {
  if (!isObject(data)) {
    return data;
  }
  let obj;
  const objType = getObjectType(data);
  const ergodicTypes = [
    "[object Array]",
    "[object Object]",
    "[object Set]",
    "[object Map]",
  ];
  if (ergodicTypes.includes(objType)) {
    obj = new data.constructor();
  } else {
    return cloneOtherObject(data, objType);
  }
  //处理循环引用问题，防止栈溢出
  if (map.has(data)) {
    return map.get(data);
  }
  map.set(data, obj);
  //拷贝Set
  if (objType === "[object Set]") {
    obj.forEach((val, key) => {
      obj.add(key, deepClone(val));
    });
    return obj;
  }
  //拷贝Map
  if (objType === "[object Map]") {
    obj.forEach((val, key) => {
      obj.set(key, deepClone(val));
    });
    return obj;
  }
  //拷贝数组和{}
  for (let key in data) {
    obj[key] = deepClone(data[key], map);
  }
  return obj;
};
let obj = {
  name: "听风",
  age: 29,
  other: {
    gender: "male",
    arr: [1, 2, 3],
  },
};
deepClone(obj);
```
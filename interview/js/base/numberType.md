# 数据类型
:::tip 专题简介
1. 基本类型
2. 引用类型
3. 存储区别
:::

## 基本数据类型
- Number
- Booblean
- String
- Undefined
- Null
- Symbol

## 引用类型
- Object
- Array
- Function
- Date
- RegExp
- Map
- Set

## 存储区别
基本数据类型和引用数据类型存储在内存中的位置不同：
- 基本数据类型存储在栈中
- 引用类型的对象存储于堆中

当我们把变量赋值给一个变量时，解析器首先要确认的就是这个值是基本类型值还是引用类型值


## 判断数据类型的方法
1. typeOf:判断基本数据类型的,number,string,boolean,symbol
2. instanceof:判断引用数据类型:Array,Object,Function,undefined,Null,Date,RegExp
3. constructor:排除 undefined 和 Null 其他的基础数据类型和引用类型都可以判断
4. Object.prototype.toString:对象原型方法判断，所有的数据类型都可以判断

## 小结
- 声明变量时不同的内存地址分配：
 - 简单类型的值存放在栈中，在栈中存放的是对应的值
 - 引用类型对应的值存储在堆中，在栈中存放的是指向堆内存的地址
- 不同的类型数据导致赋值变量时的不同：
 - 简单类型赋值，是生成相同的值，两个对象对应不同的地址
 - 复杂类型赋值，是将保存对象的内存地址赋值给另一个变量。也就是两个变量指向堆内存中同一个对象
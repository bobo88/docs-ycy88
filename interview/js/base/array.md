# 数组的常用方法
:::tip 专题简介
- 操作方法
- 排序方法
- 转换方法
- 迭代方法
:::
## 一、操作方法
主要是对数组的增、删、改、查等有哪些方法

### 增
下面前三种是对原数组产生影响的增添方法，第四种则不会对原数组产生影响
- push()
- unshift()
- splice()
- concat()

#### push()
方法接收任意数量的参数，并将它们添加到数组末尾，返回数组的最新长度
```js
let colors = []; // 创建一个数组
let count = colors.push("red", "green"); // 推入两项
console.log(count) // 2
```
#### unshift()
在数组开头添加任意多个值，然后返回新的数组长度
```js
let colors = new Array(); // 创建一个数组
let count = colors.unshift("red", "green"); // 从数组开头推入两项
alert(count); // 2
```
#### splice()
传入三个参数，分别是开始位置、0（要删除的元素数量）、插入的元素，返回空数组
```js
let colors = ["red", "green", "blue"];
let removed = colors.splice(1, 0, "yellow", "orange")
console.log(colors) // red,yellow,orange,green,blue
console.log(removed) // []
```
#### concat()
首先会创建一个当前数组的副本，然后再把它的参数添加到副本末尾，最后返回这个新构建的数组，不会影响原始数组
```js
let colors = ["red", "green", "blue"];
let colors2 = colors.concat("yellow", ["black", "brown"]);
console.log(colors); // ["red", "green","blue"]
console.log(colors2); // ["red", "green", "blue", "yellow", "black", "brown"]
```

### 删
下面三种都会影响原数组，最后一项不影响原数组： 

- pop()
- shift()
- splice()
- slice()
 #### pop()
方法用于删除数组的最后一项，同时减少数组的`length` 值，返回被删除的项
```js
let colors = ["red", "green"]
let item = colors.pop(); // 取得最后一项
console.log(item) // green
console.log(colors.length) // 1
```
#### shift()
方法用于删除数组的第一项，同时减少数组的`length` 值，返回被删除的项
```js
let colors = ["red", "green"]
let item = colors.shift(); // 取得第一项
console.log(item) // red
console.log(colors.length) // 1
```
#### splice()
传入两个参数，分别是开始位置，删除元素的数量，返回包含删除元素的数组
```js
let colors = ["red", "green", "blue"];
let removed = colors.splice(0,1); // 删除第一项
console.log(colors); // green,blue
console.log(removed); // red，只有一个元素的数组
```
#### slice()
用于创建一个包含原有数组中一个或多个元素的新数组，不会影响原始数组
```js
let colors = ["red", "green", "blue", "yellow", "purple"];
let colors2 = colors.slice(1);
let colors3 = colors.slice(1, 4);
console.log(colors)   // red,green,blue,yellow,purple
concole.log(colors2); // green,blue,yellow,purple
concole.log(colors3); // green,blue,yellow
```
### 改
即修改原来数组的内容，常用`splice`
- splice()
传入三个参数，分别是开始位置，要删除元素的数量，要插入的任意多个元素，返回删除元素的数组，对原数组产生影响
```js
let colors = ["red", "green", "blue"];
let removed = colors.splice(1, 1, "red", "purple"); // 插入两个值，删除一个元素
console.log(colors); // red,red,purple,blue
console.log(removed); // green，只有一个元素的数组
```

### 查
即查找元素，返回元素坐标或者元素值
- indexOf():返回要查找的元素在数组中的位置，如果没找到则返回 -1
- includes():返回要查找的元素在数组中的位置，找到返回`true`，否则`false`
- find():返回第一个匹配的元素

## 二、排序方法
数组有两个方法可以用来对元素重新排序：
- reverse():顾名思义，将数组元素方向反转
- sort():方法接受一个比较函数，用于判断哪个值应该排在前面
### 1、reverse
顾名思义，将数组元素方向反转
```js
let values = [1, 2, 3, 4, 5];
values.reverse();
alert(values); // 5,4,3,2,1
```
### 2、sort 排序

数组内置排序方法，通过系统字符默认排序,直接使用 sort 排序排序不准确，需要调用比较方法，因为 sort 排序是根据首位数字进行排序的，对于两位数字的排序不准确。

```js
//不准确排序
let errSortArr = [4, 1, 5, 56, 2, 12, 34];
errSortArr.sort();
console.log(errSortArr); //[1, 12, 2, 34, 4, 5, 56]

//sort正确排序
let arr = [90, 13, 56, 45, 12, 66];
arr.sort((a, b) => {
  return a - b;
});
console.log(arr); // [12,13,45,56,66,90]

//数组对象sort排序
let objArr = [{ id: 20 }, { id: 12 }, { id: 40 }];
objArr.sort((a, b) => {
  return a.id - b.id;
});
console.log(objArr); //[{id:12},{id:20},{id:40}]
```

### 3、冒泡排序

原理：就是两个相邻的数据进行两两比较，小的放在前面，大的放在后面，这样一轮下来之后，最小的到了第一位，然后再进行第二轮第三轮的比较.
首先确定比较的轮数，再次确定每次比较的次数。

```js
//冒泡排序
let arr = [90, 13, 56, 45, 12, 66];
//确定循环比较的轮次
for (let i = 0; i < arr.length - 1; i++) {
  //确定循环比较的次数
  for (let j = 0; j < arr.length - 1 - i; j++) {
    let temp = arr[j];
    if (arr[j] > arr[j + 1]) {
      arr[j] = arr[j + 1];
      arr[j + 1] = temp;
    }
  }
}
console.log(arr); //[12, 13, 45, 56, 66, 90]
```

### 4、选择排序

思路：首先在未排序的数组里面找到最小（大）放在数组的起始位置。
再从剩余元素中继续寻找最小（大）元素，返回放在已排序数组的末尾。

```js
let arr = [90, 13, 56, 45, 12, 66];
for (i = 0; i < arr.length; i++) {
  for (j = i + 1; j < arr.length; j++) {
    let temp = arr[i];
    if (arr[i] > arr[j]) {
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
}
console.log(arr); //[12, 13, 45, 56, 66, 90]
```
### 5、插入排序

思路：将数据第一个元素看作一个有序序列，把第二个元素到最后一个元素当作是未排序序列。
从头到尾一次扫描未排序序列，将扫描到的每个元素插入有序序列合适的位置。
如果待插入的元素和有序序列中某个元素相等，则将待插入元素插入到相等元素的后面。

```js
let arr = [90, 13, 56, 45, 12, 66];
for (let i = 1; i < arr.length; i++) {
  for (let j = 0; j < i; j++) {
    if (arr[i] < arr[j]) {
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
}
```

### 6、快速排序

思路：在已知到数组中取一个基准，将其余的数据以基准为中心，大于放右边，小于放左边。将左右两个子集重复上面的步骤。

```js
let arr = [90, 1, 13, 56, 45, 12, 66];
let quickSortArr = (tempArr) => {
  if (tempArr.length <= 1) {
    return tempArr;
  }
  let pivotIndex = Math.floor(tempArr.length / 2);
  let pivot = tempArr.splice(pivotIndex, 1);
  let leftArr = [];
  let rightArr = [];
  for (let i = 0; i < tempArr.length; i++) {
    if (tempArr[i] < pivot) {
      leftArr.push(tempArr[i]);
    } else {
      rightArr.push(tempArr[i]);
    }
  }
  return quickSortArr(leftArr).concat(pivot, quickSortArr(rightArr));
};

let newArr = quickSortArr(arr);
console.log(newArr); //[1, 12, 13, 45, 56, 66, 90]
```

### 7.堆排序

概念：就是完全二叉树，分为大顶堆和小顶堆
大顶堆：每个节点的值都大于或者等于它的左右子节点值。
小顶堆：每个节点的值都小于或者等于它的左右孩子点值。

公式：
a、每个元素 arr[i]的左右孩子节点分别是 arr[i*2+1]、arr[i*2+2];
b、要找到最后一个不是叶子结点的结点为（arr.length/2-1）往下取整。

实现思路：  
1、首先要实现堆结构，大顶堆，那么整个序列的最大值就是堆顶的根结点。
2、将堆顶元素和最后一个元素进行互换，那么末尾元素就存入了最大值。
3、将剩余的 n-1 个元素重新构建成一个大顶堆，重复上面的操作。
参考地址：
https://blog.csdn.net/qq_48315043/article/details/121405814
https://blog.csdn.net/weixin_46726346/article/details/112974224

```js
let arr = [90, 13, 56, 45, 12, 66];
//数组元素互换
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
//实现堆结构
function adHeap(i, arr, length) {
  let temp = arr[i];
  for (k = i * 2 + 1; k < length; k = k * 2 + 1) {
    if (k + 1 < length && arr[k] < arr[k + 1]) {
      k++;
    }
    if (arr[k] > temp) {
      arr[i] = arr[k];
      i = k;
    } else {
      break;
    }
  }
  arr[i] = temp;
  return arr;
}

//实现堆排序
function heapSort(arr) {
  let result = [];
  for (let i = parseInt(arr.length / 2) - 1; i >= 0; i--) {
    adHeap(i, arr, arr.length);
  }
  for (let j = arr.length - 1; j > 0; j--) {
    swap(arr, 0, j);
    result = adHeap(0, arr, j);
  }
  return result;
}
let newArr = heapSort(arr);
console.log(newArr);
```

### 8、归并排序

## 三、转换方法
常见的转换方法有
- join():接收一个参数，即字符串分隔符，返回包含所有项的字符串
```js
let colors = ["red", "green", "blue"];
alert(colors.join(",")); // red,green,blue
alert(colors.join("||")); // red||green||blue
```
## 四、迭代方法
常用来迭代数组的方法（都不改变原数组）有如下:
- some()
- every()
- forEach()
- filter()
- map()
### some()
对数组每一项都运行传入的测试函数，如果至少有1个元素返回 `true` ，则这个方法返回 `true`
```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let someResult = numbers.some((item, index, array) => item > 2);
console.log(someResult) // true
```

### every()
对数组每一项都运行传入的测试函数，如果所有元素都返回 true ，则这个方法返回 true
```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let everyResult = numbers.every((item, index, array) => item > 2);
console.log(everyResult) // false
```

### forEach()
对数组每一项都运行传入的函数，没有返回值
```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
numbers.forEach((item, index, array) => {
    // 执行某些操作
});
```
### filter()
对数组每一项都运行传入的函数，函数返回 `true` 的项会组成数组之后返回
```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let filterResult = numbers.filter((item, index, array) => item > 2);
console.log(filterResult); // 3,4,5,4,3
```
### map()
对数组每一项都运行传入的函数，返回由每次函数调用的结果构成的数组
```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let mapResult = numbers.map((item, index, array) => item * 2);
console.log(mapResult) // 2,4,6,8,10,8,6,4,2
```
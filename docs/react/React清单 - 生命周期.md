### React清单 - 生命周期
::: tip 生命周期
Mounting(挂载)：已插入真实 DOM <br/>
Updating(更新)：正在被重新渲染 <br/>
Unmounting(卸载)：已移出真实 DOM <br/>
:::
#### 一、旧的生命周期：
![An image](~@/lifecycle_react_old.jpeg)
```js
// 1. 挂载
constructor
componentWillMount
render
componentDidMount

// 2. 更新
componentWillReceiveProps
shouldComponentUpdate
componentWillUpdate
render
componentDidUpdate

// 3. 卸载
componentWillUnmount
```

#### 二、新的生命周期：
![An image](~@/lifecycle_react_new.jpg)

```js
// 1. 挂载
constructor
getDerivedStateFromProps
render
componentDidMount

// 2. 更新
getDerivedStateFromProps
shouldComponentUpdate
render
getSnapshotBeforeUpdate
componentDidUpdate

// 3. 卸载
componentWillUnmount
```

#### 三、新旧生命周期对比
```js
// 1. 挂载
// 旧 ------------------------------- 新
// constructor                      constructor                 // 相同
// componentWillMount               getDerivedStateFromProps    // 不同
// render                           render                      // 相同
// componentDidMount                componentDidMount           // 相同

// 2. 更新
// 旧 ------------------------------- 新
// componentWillReceiveProps        getDerivedStateFromProps    // 不同
// shouldComponentUpdate            shouldComponentUpdate       // 相同
// componentWillUpdate                                          // 不同
// render                           render                      // 相同
//                                  getSnapshotBeforeUpdate     // 不同
// componentDidUpdate               componentDidUpdate          // 相同

// 3. 卸载
// componentWillUnmount             componentWillUnmount        // 相同
```
得出结论：React从v16.3开始废弃 componentWillMount componentWillReceiveProps componentWillUpdate 三个钩子函数（三个带 Will 的）。


<!-- 
    useState 让函数式组件能够使用 state
    useEffect 让函数式组件可以模拟生命周期方法，并进行副作用操作
    useReducer 让我们能够更清晰地处理状态数据
    useContext 可以获取 context 值

    useEffect 相当于 class Component 中的 componentDidMount、componentDidUpdate、componentWillUnmount 三个生命周期的综合。


    为什么需要hooks 或者说 hooks解决了什么问题？

    在组件之间复用状态逻辑难
        自定义hook可以轻松实现state的复用状态。
    复杂组件变得难以理解
        高阶组件
    难以理解的class
        this的工作机制
 -->
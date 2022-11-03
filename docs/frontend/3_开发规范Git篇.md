## 开发规范 Git 篇

::: tip 概念
Git commit message 规范： 现在市面上比较流行的方案是 约定式提交规范（Conventional Commits）。
:::

#### 规范提交的好处：

- 便于程序员对提交历史进行追溯，了解发生了什么情况。
- 约束每一次提交，提升代码改动历史的清晰度。
- 格式化的 Commit Message 才可以用于自动化输出 Change log。
- 方便集成 GitLab && JIRA 实现自动化 workflow。

### 一、Git 提交规范

```jsx
// 格式如下：
<type>(<scope>):<subject>
<body>
<footer>

{/* 格式解读 */}
<类型>[可选的作用域]: <描述>
[可选的正文]
[可选的脚注]

名称	作用
type	用于说明 Git Commit 的类别，只允许使用下表的标识
scope	用于说明 Commit 影响的范围，比如数据层、控制层、视图层等
subject	Commit 目的的简短描述，一般不超过50个字符
body	可忽略，可多行，详细的描述，与header之间空一行
footer	可忽略，一般用于不兼容更新或关闭issue，与body之间空一行

备注：subject是 commit 目的的简短描述，不超过50个字符。
1. 以动词开头，使用第一人称现在时，比如change，而不是changed或changes
2. 第一个字母小写
3. 结尾不加句号（.）
```

```html
类型 描述
<!-- 主要 Type -->
fix 修复bug，可以是QA发现的bug，也可以是研发自己发现的bug feat 新功能（feature）

<!-- 特殊 Type -->
docs 文档撰写或更新 style 格式，不影响代码运行的变动 chore
构建过程或辅助工具的变动 refactor 重构，既不是新增功能，也不是修改bug的代码变动
revert 回滚到上一个版本 merge 代码合并

<!-- 其他 Type -->
sync 同步主线或分支的bug test 增加软件测试 perf 优化相关，比如提升性能、体验 ci
与CI（持续集成服务）有关的改动
```

### 二、工具安装

需要安装的工具： commitizen、cz-conventional-changelog、commitlint、husky

#### 1. Commitizen 是一个撰写合格 Commit message 的工具。

而 cz-conventional-changelog 适配器提供 conventional-changelog 标准（约定式提交标准）。基于不同需求，也可以使用不同适配器。

```js
// 全局安装 commitizen 和 cz-conventional-changelog
$ npm install -g commitizen cz-conventional-changelog

// 全局模式下，需要 ~/.czrc 配置文件, 为commitizen指定Adapter。
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```

#### 2. 项目内安装 commitlint & husky

```js
$ npm i husky -D
$ npm i @commitlint/cli @commitlint/config-conventional -D
```

```js
// 下面的命令显示上次发布后的变动，每个commit占据一行。你只看行首，就知道某次 commit 的目的。
$ git log <last tag> HEAD --pretty=format:%s

// 下面的命令仅仅显示本次发布新增加的功能。
$ git log <last release> HEAD --grep feature
```

### 三、

#### 备注：

- 插件推荐：
  在 VS Code 上面强烈推荐 Commit Message Editor 插件，可以快速生成 Git Commit Message

参考：<br />
<a href="https://gitmoji.dev/" target="_blank">gitmoji</a><br />
<a href="http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html" target="_blank">Commit message 和 Change log 编写指南</a><br />
<a href="https://www.ikxin.com/715.html" target="_blank">Git Commit Message 提交规范</a><br />
<a href="https://zhuanlan.zhihu.com/p/105537435" target="_blank">Git Commit Message 提交规范</a><br />
<a href="https://docs.gitlab.com/ee/integration/jira/index.html" target="_blank">第三方 Jira 集成</a><br />
<a href="https://www.cnblogs.com/xiao2shiqi/p/13514548.html" target="_blank">集成 GitLab && JIRA 实现自动化工作流 </a><br />
<a href="https://github.com/commitizen/cz-cli" target="_blank">commitizen</a><br />

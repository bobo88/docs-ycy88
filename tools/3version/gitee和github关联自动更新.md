## gitee仓库关联github同步更新
::: tip 痛点分析
    github国内用户使用总是网络比较慢，gitee网络比较快，但是github又需要备份，手动更新备份不够友好
:::
### gitee同步到gitHub方法
- gitee提供的镜像操作
- 配置git的config通过git命令

### gitee提供的镜像操作
仓库镜像管理功能用于配置和管理仓库镜像；配置仓库镜像可以实现不同平台之间仓库分支、标签和提交信息的自动同步。

#### Gitee 支持设置两种镜像
- Push:用于将 Gitee 的仓库自动镜像到 GitHub 。
- Pull：用于将 GitHub 的仓库镜像到 Gitee 。

#### 仓库镜像会同步的内容
- 分支
- 标签
- 提交记录

#### 配置仓库镜像流程
以push镜像为例添加
##### 1.添加 Push 方向的镜像
Push 方向的镜像用于将 Gitee 的仓库自动镜像到 GitHub 
:::
配置此镜像后，当你提交代码到 Gitee 的仓库时，Gitee 会自动向 GitHub 同步仓库。
:::
以ycy88为例流程如下:

1. 登录gitee > 然后进入到ycy88这个仓库 > 点击管理
2. 点击仓库镜像管理 > 添加镜像
3. 填写资料,镜像方向选择Push > 镜像仓库选择github对应需要更新的仓库 > 私人令牌（从github获取到）
4. github添加私人令牌 > 复制粘贴 > 点击添加按钮就绑定了仓库镜像 > 点击更新按钮就会将gitee仓库所有的内容同步到github仓库

##### 2.添加github私人令牌
1. 点击头像 > 右侧弹窗 > 选择settings
2. 选择 Developer settings > Personal access tokens > Tokens (classic) > Generate a personal access token
3. 填写资料 > Note随便填写 > 点击按钮Generate token >复制token

##### 3.注意事项
仓库镜像是限时开放的，暂时是免费的，后期不知道是否会收费

### 配置git的config配置
实现自动同步，通过git提交的时候自动同步

#### 实现两个仓库的同步
##### 1. 准备两个仓库
分别在两个平台创建一个相同名字的仓库，当然，你也可以在a平台上导入b平台已有的仓库，github和gitee目前都支持从别的平台导入仓库
##### 2. 克隆到本地
需要注意的是，你要保证其中一个是主仓库。如果是多人合作仓库的话，想两个平台的远程仓库同时多人合作并保持同步是相对困难的

需要做的是，既然gitee是主战场，那就对gitee进行克隆操作
```sh
git clone https://gitee.com/li_junfang1209/ycy88.git
```
##### 3.设置第二个仓库的url
克隆完毕后，直接进入该仓库的.git文件夹，修改config文件
```sh
[core]
    repositoryformatversion = 0
    filemode = true
    bare = false
    logallrefupdates = true
[remote "origin"]
    #gitee
    url = https://gitee.com/li_junfang1209/ycy88.git
    #github
    url = https://github.com/lijunfang1209/ycy88.git
    fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
    remote = orgin
    merge = ref/heads/master
```
执行```git remote -v```，你可以看到github链接的仓库也显示了出来，后面带有push后缀，代表我们只能往这个仓库上传，并不能执行```git pull```操作
```sh
git remote -v
```
这时候的设置已经完成了，你可以进行一次修改文件后的git push操作，两个仓库都可以同步！而且上传的编号都是相同的！

<a href="https://blog.csdn.net/m0_61115595/article/details/126925137" target="_blank">仓库镜像配置参考地址</a> 
<a href="https://blog.csdn.net/muxuen/article/details/125360459" target="_blank">git命令config配置参考地址</a> <br/>
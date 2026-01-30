## Jenkins 配置

::: tip Jenkins - 构建伟大，无所不能
Jenkins 是开源 CI&CD 软件领导者， 提供超过 1000 个插件来支持构建、部署、自动化， 满足任何项目的需要。
:::

#### Jenkins 运行的整体步骤（需要先安装好 jdk）：

- 1. 下载 Jenkins（jenkins.war：https://mirrors.jenkins.io/war/latest/jenkins.war）.
- 2. 打开终端进入到下载目录.
- 3. 运行命令 java -jar jenkins.war --httpPort=8888.
- 4. 打开浏览器进入链接 http://localhost:8888.
- 5. 按照说明完成安装.

### 一、下载安装（以 windows 为例）

#### 1.1 下载安装 Java jdk（注意版本需要在 [11, 17] 之间）

::: warning 版本注意
注意 Java jdk 版本需要在 [11, 17] 之间，否则不支持 Jenkins 的运行。
:::

- https://www.oracle.com/in/java/technologies/downloads/#jdk17-windows （首选）
- https://www.java.com/zh-CN/download/

#### 1.2 下载安装 Jenkins

- 官网镜像地址: https://mirrors.jenkins.io/ （首选）
- 下载地址： https://jenkins.io/download/
- 华为镜像地址: https://mirrors.huaweicloud.com/home

### 二、运行截图

![An image](/images/tools/jenkins/jenkins.png)

### 三、TODO

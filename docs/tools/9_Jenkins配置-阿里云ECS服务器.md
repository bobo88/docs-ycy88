## Jenkins 配置 - 阿里云 ECS 服务器

### 一、下载安装（基于 CentOS 8.5 64 位）

- 定位到自定义的目录，比如： /root
- 下载压缩包：wget https://download.oracle.com/java/17/latest/jdk-17_linux-x64_bin.tar.gz -O jdk_17.tgz
- 解压压缩包：tar zxvf jdk_17.tgz
- 移动解压文件：
  - mkdir /usr/local/java
  - mv /root/jdk-17.0.5 /usr/local/java
- 修改环境变量

  - 修改环境变量，通过命令: vim /etc/profile
  - 用 vim 编辑器来编辑 profile 文件，在文件末尾添加一下内容（按“i”进入编辑）

  ```js
  export JAVA_HOME=/usr/local/java
  export JRE_HOME=${JAVA_HOME}/jre
  export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib:$CLASSPATH
  export JAVA_PATH=${JAVA_HOME}/bin:${JRE_HOME}/bin
  export PATH=$PATH:${JAVA_PATH}
  ```

### 二、运行截图

<img width="100%" src="~@/tools/jenkins/jenkins.png" /><br/>

### 三、TODO

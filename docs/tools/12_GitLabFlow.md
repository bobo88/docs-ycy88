## Gitlab Flow

Git Flow 分支较多，非常适用于版本发布的工作流程。但不太适合代码部署非常频繁的敏捷开发场景。

GitHub Flow对Git Flow做了简化，并充分利用了GitHub 的Pull Request功能，是一个非常轻便的基于分支的工作流。它只维护一个长期分支master，其它的无论是做什么用途的分支都算临时分支，用完即删除。如此，无论何时发布master，其都是最新的内容。

GitLab Flow则是吸收了Git Flow和GitHub Flow的优点，遵循“上游优先”的策略，做到既简单容易操作，又能满足不同的工作流程。


流程特点：
- 快速的版本迭代
- 方便稳定的代码部署以及发布
- 更好的错误溯源、更少的系统性流程错误
- 清晰的code review


<!-- https://docs.gitlab.cn/jh/topics/gitlab_flow.html -->

<!-- https://www.cnblogs.com/xiaoqi/p/gitlab-flow.html -->

<!-- https://cloud.tencent.com/developer/article/1646937 -->

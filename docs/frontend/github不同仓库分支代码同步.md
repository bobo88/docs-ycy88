# github 不同仓库分支代码同步

## 一、方案目标

**1、单向同步**： `[xxxx]` → `ycy88-dev-apps-store`

**2、全自动**：只要  `[xxxx]`仓库有分支新增/修改/删除，自动同步

**3、安全可靠**：使用  GitHub Secret + Deploy Key

## 二、具体逻辑（流程概览）

```text

[开发者 / CI push] --> [xxxx] 仓库
       |
       v
GitHub Action 自动触发
       |
       |-- Checkout 全部分支
       |-- 设置 SSH（读取 Secret）
       |-- Push --mirror 到 ycy88-dev-apps-store
       v
ycy88-dev-apps-store 更新


```

- **触发条件**：分支创建、删除、push  事件

- **Action  运行环境**：GitHub  云端服务器

- **认证方式**：Deploy Key  公钥在目标仓库，私钥存到源仓库  Secret

- **同步方式**：`git push --mirror`（保证分支、标签、提交记录一模一样）

## 三、具体逻辑（流程概览）

**1、在本地生成  SSH key（供  Action  使用）**

```text
/*
* 注意生成的这个SSH可以在任何的目录去生成，
* SSH Key是源仓库有权限去操作目标仓库的增/删/改/查凭证
*/
mkdir -p ~/.ssh/[xxxx]_sync
cd ~/.ssh/[xxxx]_sync

ssh-keygen -t ed25519 -C "[xxxx]-sync" -f ./[xxxx]_sync_key

```

生成结果：

```text
[xxxx]_sync_key      # 私钥，放入源仓库 Secret
[xxxx]_sync_key.pub  # 公钥，放入目标仓库 Deploy Key

```

注意：本地生成只是为了拿到  key，Action  运行时在  GitHub  云端使用  Secret

**2、配置目标仓库（ycy88-dev-apps-store）**

1.  打开  GitHub → `ycy88-dev-apps-store → Settings → Deploy Keys → Add deploy key`
2.  填写：

    - Title: `Sync from copy-[xxxx]`
    - Key:  粘贴  `.pub`  公钥内容
    - 勾选  **Allow write access**

3.  保存

目标仓库允许  Action  使用该  key push

**3、配置源仓库  Secret（[xxxx]）**

1.  打开  `[xxxx]` → Settings → Secrets → Actions → New repository secret
2.  填写：

    - Name: `HQ_DEV_DEPLOY_KEY`
    - Value:  粘贴私钥  `.key`  内容

3.  保存

> 这样  Action  云端执行时可以访问  Secret，实现自动认证

**4、创建  GitHub Action workflow**

在  `[xxxx]`  仓库创建：

.github/workflows/sync-to-ycy88-dev.yml

```text
name: Event-driven Branch Sync [xxxx] → ycy88-dev-apps-store

on:
  push:
    branches:
      - '**'  # 任意分支 push
  create:
    branches:
      - '**'  # 任意分支创建
  delete:
    branches:
      - '**'  # 任意分支删除
  workflow_dispatch:
    inputs:
      branch:
        description: 'Branch name to delete in B repo (for manual testing)'
        required: false

jobs:
  sync:
    runs-on: ubuntu-latest
    if: github.repository == '[ABCD]/[xxxx]'

    steps:
      # 1️⃣ Setup SSH
      - name: Setup SSH
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.HQ_DEV_DEPLOY_KEY }}" > ~/.ssh/id_ed25519
          chmod 600 ~/.ssh/id_ed25519
          ssh-keyscan github.com >> ~/.ssh/known_hosts

      # 2️⃣ Checkout [xxxx] 仓库（仅用于 push / create）
      - name: Checkout [xxxx]
        if: github.event_name == 'push' || github.event_name == 'create'
        uses: actions/checkout@v4
        with:
          repository: [ABCD]/[xxxx]
          fetch-depth: 0

      # 3️⃣ 获取触发的分支名
      - name: Set branch name
        id: vars
        run: |
          if [ "$GITHUB_EVENT_NAME" = "workflow_dispatch" ]; then
            echo "BRANCH_NAME=${{ github.event.inputs.branch }}" >> $GITHUB_ENV
          elif [ "$GITHUB_EVENT_NAME" = "delete" ]; then
            BRANCH_NAME=$(jq -r .ref < "$GITHUB_EVENT_PATH")
            BRANCH_NAME=${BRANCH_NAME#refs/heads/}
            echo "BRANCH_NAME=$BRANCH_NAME" >> $GITHUB_ENV
          else
            echo "BRANCH_NAME=${GITHUB_REF#refs/heads/}" >> $GITHUB_ENV
          fi
          echo "Detected branch: $BRANCH_NAME"

      # 4️⃣ Push 或创建分支 → 同步到 ycy88-dev-apps-store 仓库
      - name: Push branch to ycy88-dev-apps-store
        if: github.event_name == 'push' || github.event_name == 'create'
        run: |
          set -e
          echo "Syncing branch $BRANCH_NAME to B repo"
          git fetch origin $BRANCH_NAME
          git checkout $BRANCH_NAME
          git remote add mirror git@github.com:[ABCD]/ycy88-dev-apps-store.git
          git push --force mirror origin/$BRANCH_NAME:refs/heads/$BRANCH_NAME
          echo "✅ Branch $BRANCH_NAME successfully synced to B repo (without .github)."

      # 5️⃣ 删除分支 → 删除 ycy88-dev-apps-store 仓库对应分支
      - name: Delete branch in ycy88-dev-apps-store
        if: github.event_name == 'delete' || (github.event_name == 'workflow_dispatch' && github.event.inputs.branch != '')
        run: |
          set -e
          echo "Deleting branch $BRANCH_NAME from B repo"

          if [ "$BRANCH_NAME" = "main" ]; then
            echo "Branch '$BRANCH_NAME' is default branch. Skipping delete."
            exit 0
          fi

          echo "Cloning B repo as bare repository..."
          git clone --bare git@github.com:[ABCD]/ycy88-dev-apps-store.git temp_repo
          cd temp_repo

          if git show-ref --verify --quiet refs/heads/$BRANCH_NAME; then
            echo "Branch '$BRANCH_NAME' exists. Deleting..."
            git push origin --delete "$BRANCH_NAME"
            echo "✅ Branch '$BRANCH_NAME' deleted in B repo."
          else
            echo "⚠️ Branch '$BRANCH_NAME' does not exist. Nothing to do."
          fi
name: Event-driven Branch Sync [xxxx] → ycy88-dev-apps-store

on:
  push:
    branches:
      - '**'  # 任意分支 push
  create:
    branches:
      - '**'  # 任意分支创建
  delete:
    branches:
      - '**'  # 任意分支删除
  workflow_dispatch:
    inputs:
      branch:
        description: 'Branch name to delete in B repo (for manual testing)'
        required: false

jobs:
  sync:
    runs-on: ubuntu-latest
    if: github.repository == '[ABCD]/[xxxx]'

    steps:
      # 1️⃣ Setup SSH
      - name: Setup SSH
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.HQ_DEV_DEPLOY_KEY }}" > ~/.ssh/id_ed25519
          chmod 600 ~/.ssh/id_ed25519
          ssh-keyscan github.com >> ~/.ssh/known_hosts

      # 2️⃣ Checkout [xxxx] 仓库（仅用于 push / create）
      - name: Checkout [xxxx]
        if: github.event_name == 'push' || github.event_name == 'create'
        uses: actions/checkout@v4
        with:
          repository: [ABCD]/[xxxx]
          fetch-depth: 0

      # 3️⃣ 获取触发的分支名
      - name: Set branch name
        id: vars
        run: |
          if [ "$GITHUB_EVENT_NAME" = "workflow_dispatch" ]; then
            echo "BRANCH_NAME=${{ github.event.inputs.branch }}" >> $GITHUB_ENV
          elif [ "$GITHUB_EVENT_NAME" = "delete" ]; then
            BRANCH_NAME=$(jq -r .ref < "$GITHUB_EVENT_PATH")
            BRANCH_NAME=${BRANCH_NAME#refs/heads/}
            echo "BRANCH_NAME=$BRANCH_NAME" >> $GITHUB_ENV
          else
            echo "BRANCH_NAME=${GITHUB_REF#refs/heads/}" >> $GITHUB_ENV
          fi
          echo "Detected branch: $BRANCH_NAME"

      # 4️⃣ Push 或创建分支 → 同步到 ycy88-dev-apps-store 仓库
      - name: Push branch to ycy88-dev-apps-store
        if: github.event_name == 'push' || github.event_name == 'create'
        run: |
          set -e
          echo "Syncing branch $BRANCH_NAME to B repo"
          git fetch origin $BRANCH_NAME
          git checkout $BRANCH_NAME
          git remote add mirror git@github.com:[ABCD]/ycy88-dev-apps-store.git
          git push --force mirror origin/$BRANCH_NAME:refs/heads/$BRANCH_NAME
          echo "✅ Branch $BRANCH_NAME successfully synced to B repo (without .github)."

      # 5️⃣ 删除分支 → 删除 ycy88-dev-apps-store 仓库对应分支
      - name: Delete branch in ycy88-dev-apps-store
        if: github.event_name == 'delete' || (github.event_name == 'workflow_dispatch' && github.event.inputs.branch != '')
        run: |
          set -e
          echo "Deleting branch $BRANCH_NAME from B repo"

          if [ "$BRANCH_NAME" = "main" ]; then
            echo "Branch '$BRANCH_NAME' is default branch. Skipping delete."
            exit 0
          fi

          echo "Cloning B repo as bare repository..."
          git clone --bare git@github.com:[ABCD]/ycy88-dev-apps-store.git temp_repo
          cd temp_repo

          if git show-ref --verify --quiet refs/heads/$BRANCH_NAME; then
            echo "Branch '$BRANCH_NAME' exists. Deleting..."
            git push origin --delete "$BRANCH_NAME"
            echo "✅ Branch '$BRANCH_NAME' deleted in B repo."
          else
            echo "⚠️ Branch '$BRANCH_NAME' does not exist. Nothing to do."
          fi

```

**四、总结**

- 完整覆盖：新增、修改、删除、合并所有分支   /  删除分支 main 除外不同步
- 单向同步，安全可靠
- 多人  push  不受限制
- Action  云端运行，一次性生成  SSH key  进行配置绑定

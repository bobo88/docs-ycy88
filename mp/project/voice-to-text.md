# 微信语音转文字功能实现

在微信小程序中实现语音转文字功能，可以通过以下两种主流方案实现，具体选择取决于开发需求和资源准备情况：

## **方案一：使用微信同声传译插件（推荐）**

这是微信官方提供的语音识别插件，集成简单且无需自建服务器，适合快速开发。  
**实现步骤**：

1. **添加插件**  
   在小程序管理后台的“插件管理”中搜索并添加“微信同声传译”插件（插件 ID：`wx069ba97219f66d99`）。
2. **配置`app.json`**  
   在全局配置文件中声明插件：
   ```json
   "plugins": {
     "WechatSI": {
       "version": "0.3.6",
       "provider": "wx069ba97219f66d99"
     }
   }
   ```
3. **代码实现**
   - **初始化插件**：
     ```javascript
     const plugin = requirePlugin("WechatSI");
     const manager = plugin.getRecordRecognitionManager();
     ```
   - **录音控制**：  
     通过`touchstart`和`touchend`事件控制录音开始与结束，并调用插件的`start`和`stop`方法。
   - **结果回调**：  
      监听`manager.onStop`事件获取转换后的文字结果，示例代码：
     ```javascript
     manager.onStop = (res) => {
       if (res.result) {
         this.setData({ content: res.result });
         // 触发结果传递或其他逻辑
       }
     };
     ```
     **优势**：无需处理音频格式转换，支持实时识别，适合短语音场景。

### 完整的示例代码逻辑

```vue
<template>
  <view class="Todolist-page">
    <!-- 其他代码，略... -->

    <!-- 修改录音按钮区域 -->
    <view class="record-area">
      <view
        class="input-box"
        style="
          display: flex;
          padding: 40rpx;
          width: 100% !important;
          background: #fff;
        "
      >
        <u-input
          size="small"
          v-model="urlInput"
          :maxlength="200"
          placeholder="请输入当前待办事项内容"
        />

        <view style="margin-left: 10px; width: 100px">
          <u-button type="success" @click="inputAddTodolist">
            生成待办事项
          </u-button>
        </view>
      </view>

      <!-- 录音区域 -->
      <view
        class="record-btn"
        :class="{ recording: isRecording }"
        @touchstart="startRecording"
        @touchend="stopRecording"
      >
        <u-icon name="mic" color="#fff" size="40"></u-icon>
        <text>{{ isRecording ? "松开结束" : "语音录入" }}</text>
      </view>
      <!-- End -->
    </view>
  </view>
</template>

<script setup lang="ts">
// 其他代码...
// 初始化插件实例 ‌:ml-citation{ref="2,8" data="citationList"}
const plugin = ref(null);
const manager = ref(null);
const isRecording = ref(false);

// 数据加载和处理方法
const loadTodolists = async () => {
  // 加载数据的逻辑
  // 略...
};

const buildTodolist = async (inputText: any) => {
  // 生成待办事项（逻辑）
  // 略...
};

// 初始化语音识别回调 ‌:ml-citation{ref="8" data="citationList"}
const initRecognition = () => {
  plugin.value = requirePlugin("WechatSI");
  manager.value = plugin.value.getRecordRecognitionManager();

  // 绑定回调事件
  manager.value.onStart = () => {
    isRecording.value = true;
  };

  manager.value.onRecognize = (res) => {
    if (res.result) {
      resultText.value = res.result;
    }
  };

  manager.value.onStop = (res) => {
    isRecording.value = false;
    if (res.result) {
      // 生成灵感
      buildTodolist(res.result || "未能识别语音内容");
    } else {
      console.error("[识别失败]:", res);
    }
  };
};

// 录音操作 ‌:ml-citation{ref="1,8" data="citationList"}
const startRecording = () => {
  manager.value.start({
    lang: "zh_CN",
    duration: 60000,
  });
};

const stopRecording = () => {
  manager.value.stop();
};

const inputAddTodolist = () => {
  // 生成灵感
  buildTodolist(urlInput.value || "手动录入的灵感内容Is Mock.");
  urlInput.value = "";
};

// 生命周期钩子
onMounted(() => {
  // 申请录音权限
  wx.authorize({
    scope: "scope.record",
    success() {
      console.log("录音权限已授权");

      initRecognition();
    },
    fail() {
      uni.showModal({
        title: "权限提示",
        content: "请前往设置开启录音权限",
        success(res) {
          if (res.confirm) wx.openSetting();
        },
      });
    },
  });
});

onShow(() => {
  loadTodolists();
});
</script>

<style lang="scss" scoped>
// 略...
</style>
```

## **方案二：自建服务器 + 第三方 API（灵活扩展）**

若需支持长语音或需要更高识别准确率，可结合服务器与第三方语音识别 API（如百度 AI、讯飞等）。  
**实现步骤**：

1. **小程序端录音与上传**
   - 使用`wx.getRecorderManager`录制音频（格式建议为`mp3`或`aac`），并通过`wx.uploadFile`上传至服务器。
   - 关键参数示例：
     ```javascript
     const options = {
       duration: 60000, // 最长录音时间
       sampleRate: 16000, // 采样率需与API要求一致（如百度API需16000或8000）
       format: "mp3",
     };
     ```
2. **服务端处理与调用 API**
   - **接收音频文件**：使用`multer`等中间件接收上传文件。
   - **调用语音识别 API**：
     - 百度 AI 示例：需申请 API Key 并调用其语音识别接口。
     - 微信原生接口：通过`access_token`调用微信语音识别接口（需处理格式转换）。
3. **返回结果至小程序**  
   将识别后的文本通过接口返回，小程序端接收并展示。

## **注意事项**

1. **权限与兼容性**
   - 需在`app.json`中声明录音权限：`"requiredPrivateInfos": ["getRecorderManager"]`。
   - iOS 与安卓对音频播放的支持可能不同，需测试兼容性。
2. **错误处理**
   - 插件错误码处理（如`-30003`表示说话间隔太短）。
   - 网络异常或 API 调用失败时需重试机制。
3. **性能优化**
   - 长语音建议分片上传或使用流式识别。
   - 本地缓存临时文件以减少服务器压力。

## **总结**

- **快速开发**：优先选择微信同声传译插件，适合短语音和简单场景。
- **定制化需求**：结合自建服务器与第三方 API，支持长语音、多语言识别等复杂功能。

具体代码示例可参考微信官方文档及上述引用中的 GitHub 仓库。

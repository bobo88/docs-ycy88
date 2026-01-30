# 转换网页内容技术

::: tip 几种可行的技术方案

- 方案 1：手动复制粘贴源码（最简单可行）
- 方案 2：使用 iframe + JavaScript 采集（受 CORS 限制）
- 方案 3：代理服务器抓取（推荐）

:::

![An image](/images/from-zero/fe/fetch-source.jpg)

## **方案 1：手动复制粘贴源码（最简单可行）**

在你的网站上提供一个 `<textarea>` 输入框，并引导用户手动复制目标网页源码粘贴进去，然后提交到后台分析。

**优点**：

- 兼容所有网页，不受 CORS 跨域限制。
- 可以获取用户私有网页（如内网、需要登录的页面）。
- 适用于任何浏览器，不需要额外权限。

**实现方式**：

1. 添加一个 `textarea` 输入框。
2. 用户按 `Ctrl+U` 查看源码，`Ctrl+A` 全选，`Ctrl+C` 复制，然后粘贴到 `textarea`。
3. 提交到服务器进行分析。

```html
<textarea id="sourceCode" placeholder="请粘贴网页源码"></textarea>
<button onclick="submitSourceCode()">提交分析</button>

<script>
  function submitSourceCode() {
    const code = document.getElementById("sourceCode").value;
    fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: code }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }
</script>
```

## **方案 2：使用 iframe + JavaScript 采集（受 CORS 限制）**

你可以在你的网页中用 `<iframe>` 打开目标网站，然后用 JavaScript 获取 `iframe` 里的 `document.documentElement.outerHTML` 来抓取源码。

**代码示例**：

```html
<iframe id="targetFrame" src="https://example.com"></iframe>
<button onclick="fetchIframeSource()">获取源码</button>

<script>
  function fetchIframeSource() {
    const iframe = document.getElementById("targetFrame");
    try {
      const sourceCode = iframe.contentDocument.documentElement.outerHTML;
      console.log(sourceCode);
    } catch (error) {
      console.error("无法获取源码，可能受CORS限制");
    }
  }
</script>
```

**问题**：

- **CORS 限制**：现代浏览器禁止 JavaScript 访问跨域 `iframe`，所以无法获取大部分外部网页的源码。
- **适用场景**：只能在目标网页允许 `iframe` 嵌套，并且不阻止跨域访问的情况下可用。

## **方案 3：利用 WebView（适用于 Electron、App 内置浏览器）**

如果你的项目是在 Electron、移动 App（WebView）等环境下，可以通过 `WebView` 渲染网页并抓取 `innerHTML`。

Electron 示例：

```javascript
const { BrowserWindow } = require("electron");

let win = new BrowserWindow({ webPreferences: { nodeIntegration: false } });
win.loadURL("https://example.com");

win.webContents
  .executeJavaScript("document.documentElement.outerHTML")
  .then((html) => console.log(html));
```

**优点**：

- 适用于桌面应用。
- 不受 CORS 限制，可以直接访问目标网页源码。

**缺点**：

- 需要用户下载 Electron 应用，而不是直接在网页中完成。

## **方案 4：代理服务器抓取（推荐）**

你的服务器可以充当“代理”，用后端请求目标网页并返回源码。

### **Node.js 版本**

```javascript
const express = require("express");
const axios = require("axios");
const app = express();

app.get("/fetch-source", async (req, res) => {
  const { url } = req.query;
  try {
    const response = await axios.get(url);
    res.send(response.data);
  } catch (error) {
    res.status(500).send("获取失败：" + error.message);
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

**使用方法**：

```
https://your-server.com/fetch-source?url=https://example.com
```

**问题**：

- **目标网站可能会封锁爬虫**（可使用 `user-agent` 伪装）。
- **部分网站可能需要登录才能访问**（可以考虑模拟 Cookie）。

::: tip python 版本
转换网页的技术可以用 python 写， 直接用 python 写了一个简单的示例项目，启动 chromedriver, 打开网页，下载网页，使用 trafilatura，集成到一起。
:::

```python
# === app.py
from flask import Flask, request, jsonify
from webpage2markdown import webpage_driver
import atexit

app = Flask(__name__)

# 在应用启动时初始化driver
webpage_driver.init_driver()

@app.route('/api/webpage', methods=['POST'])
def get_webpage():
    try:
        data = request.get_json()

        if not data or 'url' not in data:
            return jsonify({
                'error': 'Missing URL parameter'
            }), 400

        url = data['url']
        print(f'Processing URL: {url}')

        # 获取输出格式，默认为markdown
        output_format = data.get('format', 'markdown')
        if output_format not in ['html', 'markdown']:
            output_format = 'markdown'

        result = webpage_driver.get_webpage_content(url, output_format=output_format)
        return jsonify(result)

    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 500

# 确保在应用退出时关闭driver
def cleanup():
    try:
        if webpage_driver.driver:
            webpage_driver.driver.quit()
    except:
        pass

atexit.register(cleanup)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

```python
# === webpage2markdown.py
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
import time
import os
import random
from trafilatura import extract, extract_metadata

def setup_chrome_driver():
    """设置Chrome驱动的配置，添加反检测机制"""
    chrome_options = Options()

    # 基本设置
    chrome_options.add_argument('--headless')  # 无头模式
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')

    # 1. 反检测基本设置
    chrome_options.add_argument('--disable-blink-features=AutomationControlled')
    chrome_options.add_experimental_option('excludeSwitches', ['enable-automation'])
    chrome_options.add_experimental_option('useAutomationExtension', False)

    # 2. 随机User-Agent
    user_agents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
    ]
    chrome_options.add_argument(f'user-agent={random.choice(user_agents)}')

    # 3. 随机窗口大小
    window_sizes = ['1920,1080', '1366,768', '1440,900', '1536,864']
    chrome_options.add_argument(f'--window-size={random.choice(window_sizes)}')

    # 4. 设置下载参数
    chrome_options.add_experimental_option('prefs', {
        'download.default_directory': os.getcwd(),
        'download.prompt_for_download': False,
        'download.directory_upgrade': True,
        'safebrowsing.enabled': True
    })

    # 创建Chrome驱动实例
    service = Service('/usr/bin/chromedriver')
    driver = webdriver.Chrome(service=service, options=chrome_options)

    # 注入 JavaScript 来移除 WebDriver 特征
    stealth_js = """
    // 移除 webdriver 标记
    Object.defineProperty(navigator, 'webdriver', {
        get: () => undefined
    });

    // 修改 navigator 属性
    const originalQuery = window.navigator.permissions.query;
    window.navigator.permissions.query = (parameters) => (
        parameters.name === 'notifications' ?
            Promise.resolve({ state: Notification.permission }) :
            originalQuery(parameters)
    );

    // 添加 Chrome 运行时特征
    window.chrome = {
        runtime: {}
    };
    """

    driver.execute_cdp_cmd('Page.addScriptToEvaluateOnNewDocument', {
        'source': stealth_js
    })

    # 添加随机语言和请求头
    driver.execute_cdp_cmd('Network.setExtraHTTPHeaders', {
        'headers': {
            'Accept-Language': random.choice(['en-US,en;q=0.9', 'zh-CN,zh;q=0.9']),
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive'
        }
    })

    return driver

def save_webpage(url, save_method='html', output_path='webpage'):
    """保存网页内容"""
    driver = setup_chrome_driver()

    try:
        # 添加随机延时避免固定模式
        # time.sleep(random.uniform(3, 7))
        print(f'正在访问网页: {url}')
        # 访问网页
        driver.get(url)

        # 模拟人类滚动行为
        # driver.execute_script("""
        #     const scroll = () => {
        #         window.scrollTo(0, window.scrollY + Math.random() * 100);
        #         if (window.scrollY < document.body.scrollHeight - window.innerHeight) {
        #             setTimeout(scroll, Math.random() * 1000);
        #         }
        #     };
        #     scroll();
        # """)

        # 等待页面加载完成
        # time.sleep(random.uniform(4, 6))

        if save_method == 'html':
            html_content = driver.page_source
            with open(f'{output_path}.html', 'w', encoding='utf-8') as f:
                f.write(html_content)
            print(f'HTML内容已保存到 {output_path}.html')

        elif save_method == 'screenshot':
            driver.save_screenshot(f'{output_path}.png')
            print(f'截图已保存到 {output_path}.png')

        elif save_method == 'pdf':
            print_options = {
                'printBackground': True,
                'paperWidth': 8.27,
                'paperHeight': 11.7
            }
            pdf_data = driver.execute_cdp_cmd('Page.printToPDF', print_options)

            with open(f'{output_path}.pdf', 'wb') as f:
                f.write(bytes.fromhex(pdf_data['data']))
            print(f'PDF已保存到 {output_path}.pdf')

    except Exception as e:
        print(f'发生错误: {str(e)}')

    finally:
        driver.quit()

class WebpageDriver:
    def __init__(self):
        self.driver = None

    def init_driver(self):
        """初始化Chrome驱动"""
        if self.driver is None:
            self.driver = setup_chrome_driver()
        return self.driver

    def get_webpage_content(self, url, output_format='html'):
        """获取网页内容并返回
        Args:
            url: 网页URL
            output_format: 输出格式，可选 'html' 或 'markdown'
        """
        if self.driver is None:
            self.init_driver()

        try:
            # 访问网页
            self.driver.get(url)

            # 模拟人类滚动行为
            # self.driver.execute_script("""
            #     const scroll = () => {
            #         window.scrollTo(0, window.scrollY + Math.random() * 100);
            #         if (window.scrollY < document.body.scrollHeight - window.innerHeight) {
            #             setTimeout(scroll, Math.random() * 1000);
            #         }
            #     };
            #     scroll();
            # """)

            html_content = self.driver.page_source

            if output_format == 'markdown':
                # 使用 trafilatura 提取正文并转换为 markdown
                markdown_content = extract(html_content, output_format='markdown')
                # 提取元数据
                metadata = extract_metadata(html_content)

                result = {
                    'content': markdown_content,
                    'metadata': {
                        'title': metadata.title if metadata else None,
                        'author': metadata.author if metadata else None,
                        'date': metadata.date if metadata else None,
                        'description': metadata.description if metadata else None
                    }
                }
                return result

            return {'content': html_content}

        except Exception as e:
            print(f'发生错误: {str(e)}')
            # 如果发生错误，重新初始化driver
            try:
                self.driver.quit()
            except:
                pass
            self.driver = None
            raise e

    def __del__(self):
        """析构函数，确保driver被正确关闭"""
        if self.driver:
            try:
                self.driver.quit()
            except:
                pass

# 创建全局实例
webpage_driver = WebpageDriver()

if __name__ == '__main__':
    url = 'https://www.51cto.com/article/804938.html'
    save_webpage(url, save_method='html', output_path='output/webpage')

```

## **方案 5：浏览器扩展**

你可以开发一个 Chrome 插件，获取当前页面的源码并提交到你的服务器。

**manifest.json**

```json
{
  "manifest_version": 3,
  "name": "网页源码抓取",
  "version": "1.0",
  "permissions": ["activeTab", "scripting"],
  "background": {
    "service_worker": "background.js"
  },
  "action": {
    "default_popup": "popup.html"
  }
}
```

**background.js**

```javascript
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: fetchPageSource,
  });
});

function fetchPageSource() {
  const source = document.documentElement.outerHTML;
  fetch("https://your-server.com/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ source }),
  });
}
```

**优点**：

- **用户点击插件即可抓取网页源码**，不需要手动复制粘贴。
- **可以绕过 CORS 限制**，因为插件运行在用户的浏览器上下文。

**缺点**：

- **需要用户安装 Chrome 插件**，不是所有用户都愿意安装。

## **最终推荐方案**

1. **普通用户**：使用 **方案 1（手动复制粘贴）**，简单易用，适用于所有情况。
2. **技术用户**：使用 **方案 5（浏览器扩展）**，自动抓取，不受 CORS 限制。
3. **后端代理**（如果你想自动抓取公网网站）：使用 **方案 4（代理服务器抓取）**。

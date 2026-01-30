---
tag:
  - 前端博客小站
title: 前端博客小站
description: 前端博客小站
head:
  - - meta
    - name: og:title
      content: 前端博客小站
  - - meta
    - name: og:description
      content: 前端博客小站
---

<!-- # Bob's Blog -->

<!-- ## 欢迎关注：“Bob思维自习室” 公众号 -->

<!-- ::: tip ⭐️ 「Bob思维自习室」公众号
我把本站的部分精华内容发表到「Bob思维自习室」公众号，开通了【**团队管理**】和【**重塑认知**】的专栏！
::: -->

<!-- ![An image](/images/mp/ycy88-code.jpg) -->
<!-- <img src="/images/mp/ycy88-code.jpg" style="width:68%;" alt="“Bob思维自习室” 公众号"> -->

<style>
.tech-card {
  text-decoration: none !important;
}
</style>

<div style="margin: 0 auto;">
  <img src="/images/ljf-2.png" alt="ljf" class="ljf-img" style="width: 200px; height:200px;  border-radius: 50%;">
  <span>abc</span>
</div>

## 网站版块介绍

<!-- <div class="tech-section">
  <h3 class="tech-title">🌟 前沿技术</h3>
  <div class="tech-grid">
    <a href="/daily/" class="tech-card">
      <div class="tech-icon">Latest</div>
      <span class="tech-name">最新文档</span>
    </a>
    <a href="/AI/" class="tech-card">
      <div class="tech-icon">AI</div>
      <span class="tech-name">AI人工智能</span>
    </a>
    <a href="/ROS2/" class="tech-card">
      <div class="tech-icon">ROS2</div>
      <span class="tech-name">ROS2机器人</span>
    </a>
  </div>
</div> -->

<div class="tech-section">
  <h3 class="tech-title">🚀 技术栈</h3>
  <div class="tech-grid">
    <a href="/node/" class="tech-card">
      <div class="tech-icon">Node</div>
      <span class="tech-name">Node 系列</span>
    </a>
    <a href="/vue/" class="tech-card">
      <div class="tech-icon">Vue</div>
      <span class="tech-name">VUE 系列</span>
    </a>
    <a href="/react/" class="tech-card">
      <div class="tech-icon">React</div>
      <span class="tech-name">React 系列</span>
    </a>
    <a href="/shopify/" class="tech-card">
      <div class="tech-icon">Shopify</div>
      <span class="tech-name">Shopify系列</span>
    </a>
    <a href="/mp/" class="tech-card">
      <div class="tech-icon">MP</div>
      <span class="tech-name">小程序系列</span>
    </a>
    <a href="/devices/" class="tech-card">
      <div class="tech-icon">Devices</div>
      <span class="tech-name">跨端｜音视频</span>
    </a>
  </div>
</div>

<div class="tech-section">
  <h3 class="tech-title">🔧 工程实践</h3>
  <div class="tech-grid">
    <a href="/interview/" class="tech-card">
      <div class="tech-icon">Devices</div>
      <span class="tech-name">知识点总结</span>
    </a>
    <a href="/tools/" class="tech-card">
      <div class="tech-icon">Tools</div>
      <span class="tech-name">前端工程化</span>
    </a>
    <a href="/algorithm/" class="tech-card">
      <div class="tech-icon">Algorithm</div>
      <span class="tech-name">数据结构与算法</span>
    </a>
    <a href="/performance/" class="tech-card">
      <div class="tech-icon">Perfor</div>
      <span class="tech-name">性能优化</span>
    </a>
    <a href="/micro-fe/" class="tech-card">
      <div class="tech-icon">MicroFE</div>
      <span class="tech-name">微前端</span>
    </a>
    <a href="/ts/" class="tech-card">
      <div class="tech-icon">TS</div>
      <span class="tech-name">Typescript</span>
    </a>
  </div>
</div>

<style>
.tech-section {
  margin: 3rem 0;
}

.tech-title {
  margin-bottom: 2rem !important;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  background: linear-gradient(45deg, #00c6ff, #0072ff, #6a1b9a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 20px rgba(0, 198, 255, 0.3);
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
}

.tech-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  color: #fedc5e;
  background: #8fd1e1;
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  text-decoration: none;
}

.tech-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.tech-card:hover::before {
  left: 100%;
}

.tech-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  background: #fedc5e;

  border-color: rgba(255, 255, 255, 0.4);
  text-decoration: none;
}
.tech-card:hover .tech-name {
  color: #282828 !important;
  text-decoration: none;
}
/* .tech-card:hover .tech-icon {
  color: #fff;
} */

.tech-icon {
  font-size: 2.5rem;
  margin-bottom: 0.8rem;
  color: #999;
  /* filter: drop-shadow(0 0 10px rgba(0, 198, 255, 0.3)); */
}

.tech-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #fedc5e;
  text-align: center;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .tech-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }

  .tech-card {
    padding: 1rem;
  }

  .tech-icon {
    font-size: 2rem;
  }

  .tech-name {
    font-size: 0.95rem;
  }
}
</style>

## 版权信息

Copyright © 2018-至今 [www.ycy88.com](http://www.ycy88.com) All Rights Reserved.
备案号：[粤 ICP 备 2022114378 号](http://beian.miit.gov.cn)

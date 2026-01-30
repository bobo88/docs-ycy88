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

<div class="profile-section">
  <div class="profile-container">
    <div class="profile-left">
      <img src="/images/ljf-2.png" alt="ljf" class="profile-img">
    </div>
    <div class="profile-right">
      <h2 class="profile-name">Victoria J. Li</h2>
      <p class="profile-title">前端开发工程师 & 知识博主</p>
      <div class="profile-desc">
        <p>专注于前端技术栈的深度探索与实践，热爱分享技术心得与成长经验。</p>
        <!-- <p>致力于构建高质量的技术内容，帮助开发者提升技能水平。</p> -->
      </div>
      <div class="profile-tags">
        <span class="tag">Shopify</span>
        <span class="tag">Vue.js</span>
        <span class="tag">React</span>
        <span class="tag">Node.js</span>
        <span class="tag">JavaScript</span>
        <span class="tag">TS</span>
        <span class="tag">小程序</span>
        <span class="tag">前端</span>
        <span class="tag">管理</span>
      </div>
    </div>
  </div>
</div>

<style>
.profile-section {
  margin: 0 0 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.05));
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.profile-container {
  display: flex;
  align-items: center;
  gap: 3rem;
  max-width: 800px;
  margin: 0 auto;
}

.profile-left {
  flex-shrink: 0;
}

.profile-img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.profile-img:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
}

.profile-right {
  flex: 1;
}

.profile-name {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(45deg, #00c6ff, #0072ff, #6a1b9a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.profile-title {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.profile-desc {
  margin-bottom: 2rem;
}

.profile-desc p {
  margin-bottom: 0.8rem;
  line-height: 1.6;
  color: #555;
}

.profile-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.tag {
  padding: 0.4rem 1rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 2rem;
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
}

.tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

@media (max-width: 768px) {
  .profile-container {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }

  .profile-name {
    font-size: 2rem;
  }

  .profile-img {
    width: 150px;
    height: 150px;
  }

  .profile-tags {
    justify-content: center;
  }
}
</style>

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
  color: #c8c7c5;
  background: #002fa7;
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
  background: #c8c7c5;
  border-color: rgba(255, 255, 255, 0.4);
  text-decoration: none;
}
.tech-card:hover .tech-name {
  color: #002fa7 !important;
  text-decoration: none;
}
.tech-card:hover .tech-icon {
  color: #282828;
}

.tech-icon {
  font-size: 2.5rem;
  margin-bottom: 0.8rem;
  color: #fff;
  /* filter: drop-shadow(0 0 10px rgba(0, 198, 255, 0.3)); */
}

.tech-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #c8c7c5;
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

Copyright © 2018-至今 [www.ycy88.com](http://www.ycy88.com) All Rights Reserved.<br/>
备案号：[粤 ICP 备 2022114378 号](http://beian.miit.gov.cn)

## 前端博客小站

<main class="home">
  <header class="hero">
    <img src="/images/ljf-2.png" alt="ljf" class="ljf-img">
    <!-- <div class="yb-title">前端博客小站</div> -->
    <p class="description">全方位涵盖技术团队规范、全栈技能、算法、主流技术和团队管理的关键元素。</p>
    <p class="actions">
      <a class="route-link action-button primary" href="/standard/" aria-label="前端规范">前端规范 </a>
      <a class="route-link action-button secondary" href="/node/" aria-label="Node系列">Node系列</a>
      <a class="route-link action-button secondary" href="/vue/" aria-label="VUE系列">VUE系列</a>
      <a class="route-link action-button secondary" href="/mp/" aria-label="小程序系列">小程序系列</a>
      <a class="route-link action-button secondary" href="/react/" aria-label="React系列">React系列</a>
      <a class="route-link action-button secondary" href="/interview/" aria-label="知识点总结">知识点总结</a>
    </p>
  </header>
  <div class="features">
    <div class="feature">
      <h2>规范流程和最佳实践</h2>
      <p>探讨技术团队中的规范流程和最佳实践，以提高开发效率和代码质量。</p>
    </div>
    <div class="feature">
      <h2>Node 系列</h2>
      <p>深入研究和实践 Node.js 技术栈，拓展对 Node 生态系统的全面理解。</p>
    </div>
    <div class="feature">
      <h2>泛服务端</h2>
      <p>解析全栈工程师的必经之路，聚焦设计模式、数据结构和数据库等核心概念。</p>
    </div>
    <div class="feature">
      <h2>算法</h2>
      <p>探讨算法的关键思想，提供深入的算法理论和实际应用示例。</p>
    </div>
    <div class="feature">
      <h2>主流技术</h2>
      <p>介绍 VUE、React、网络协议、TypeScript 等主流技术，涵盖跨端解决方案、小程序开发以及 CI/CD 实践。</p>
    </div>
    <div class="feature">
      <h2>团队管理</h2>
      <p>着眼于团队管理的重要性，讨论构建协作高效的技术团队的关键元素。</p>
    </div>
   
  </div>

::: tip 你我共勉
别去做太多准备，那只会束缚你前进的决心和脚步。

保持进击，随时复盘，及时调整。
:::

  <!-- Copyright © www.ycy88.com All Rights Reserved. 备案号：粤ICP备2022114378号 -->
  <div class="footer">
    <p>Copyright © 2018-至今 www.ycy88.com All Rights Reserved. </p>
    <p>备案号：<a class="route-link action-button secondary" href="http://beian.miit.gov.cn">粤ICP备2022114378号</a></p>
  </div>
  
</main>

<style>
  
  .vp-doc h2 {
    border-top: none !important;
  }

  .ljf-img {
    margin: 0 auto;
    width: 200px;
    height: 200px;
    border: 1px dashed #fff;
    border-radius: 50%;
    overflow: hidden;
  }
  .theme-container.no-sidebar.has-toc .vp-page{
    padding-inline-end: 0 !important;
  }
  .theme-hope-content {
    max-width: 100% !important;
  }
  .home {
    padding: var(--navbar-height) 2rem 0;
    max-width: var(--homepage-width);
    margin: 0 auto;
    display: block;
  }
  .home .hero {
    text-align: center;
  }
  .home .hero .action-button {
    margin-bottom: 20px;
    margin-right: 30px;
    display: inline-block;
    font-size: 1.2rem;
    padding: 0.8rem 1.6rem;
    border-width: 2px;
    border-style: solid;
    border-radius: 4px;
    box-sizing: border-box;
    text-decoration: none;
  }
  .home .hero .action-button.primary {
    color: #fff;
    background-color: #3eaf7c;
    border-color: #3eaf7c;
  }
  .home .hero .action-button.secondary {
    color: #3eaf7c;
    background-color: #fff;
    border-color: #3eaf7c;
  }
  .home .hero .action-button.secondary:hover {
    color: #fff;
    background-color: #3eaf7c;
    border-color: #3eaf7c;
  }

  .home .features {
    border-top: 1px solid #eaecef;
    padding: 1.2rem 0;
    margin-top: 2.5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: stretch;
    justify-content: space-between;
  }
  .home .feature {
    flex-grow: 1;
    flex-basis: 30%;
    max-width: 30%;
  }
  .home .feature h2 {
    font-size: 1.4rem;
    font-weight: 500;
    border-bottom: none;
    padding-bottom: 0;
    color: #333;
  }
  .home .feature p {
    color: #666;
    font-size: 1rem;
  }
  .home .footer {
    padding: 2.5rem;
    border-top: 1px solid #eaecef;
    text-align: center;
    color: #666;
    font-size: 14px;
  }
</style>

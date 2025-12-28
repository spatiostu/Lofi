# Lofi

> 极简、纯粹、黑白风格的 Hexo 博客主题。

> A minimalist, black & white theme for Hexo.

![](https://s2.loli.net/2025/12/27/xN7iMnbRPJdT6pQ.png)

## 介绍 (Introduction)

**Lofi** 是一款专为专注于写作的人设计的 Hexo 主题。它剥离了所有不必要的装饰，只保留最核心的阅读体验。

**核心特点：**
- **极简黑白设计**：经典的报纸风格，耐看且不干扰阅读。
- **超快加载**：体积小巧，没有复杂的动画和沉重的库。
- **响应式布局**：在手机、平板和电脑上都有完美的阅读体验。
- **PJAX 支持**：页面切换无刷新，体验丝般顺滑。
- **评论系统**：内置 Artalk 评论系统支持（自托管的隐私友好评论系统）。
- **站内搜索**：原生支持本地搜索功能。

---

## 安装指南 (Installation)

就像给手机换壁纸一样简单，只需三步即可使用。

### 第一步：下载主题
进入你的 Hexo 博客目录，打开终端（命令行），运行以下命令：

```bash
git clone https://github.com/spatiostu/lofi.git themes/lofi
```

或者，你也可以直接点击右上角的 **Code -> Download ZIP**，下载后解压，把文件夹改名为 `lofi`，然后放入博客的 `themes` 目录下。

### 第二步：启用主题
打开博客根目录下的 `_config.yml` 文件（不是主题目录下的那个），找到 `theme` 这一行，修改为：

```yaml
theme: lofi
```

### 第三步：安装必要插件
为了让主题的搜索和渲染功能正常工作，你需要安装几个小插件。在博客根目录下运行：

```bash
npm install hexo-renderer-ejs hexo-generator-searchdb --save
```

---

## 配置指南 (Configuration)

主题的配置文件位于 `themes/lofi/_config.yml`。你可以根据需要修改它。

### 1. 菜单设置 (Menu)
设置导航栏的链接。

```yaml
menu:
  首页: /
  归档: /archives
  友链: /friends
  关于: /about
```
需在source目录下创建两个页面文档：`about/index.md`、`friends/index.md`。每个文档的内容可以自定义，例如：

```markdown
---
title: 友情链接
date: 2024-03-20 12:00:00
type: friends

---
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
<a href="https://www.FriendDomain.com/" target="_blank" class="friend-card">
    <div class="font-bold text-lg mb-2">FriendName</div>
    <div class="text-xs font-mono opacity-60">FriendDescription</div>
</a>
```

### 2. 个人信息 (Profile)
设置你的头像和社交媒体链接。

```yaml
avatar: /images/avatar.jpg  # 头像路径
favicon: /images/favicon.png # 网站图标
description: "这里写一句你的座右铭"
social:
  github: https://github.com/yourname
```

### 3. 评论系统 (Comments)
本主题内置了 [Artalk](https://artalk.js.org/) 评论系统。如果你部署了 Artalk Server，可以在这里配置：

```yaml
artalk:
  enable: true
  server: 'https://your-artalk-server.com' 
  site: '你的站点名称'
```

如果不需要评论功能，将 `enable` 改为 `false` 即可。

### 4. 底部信息 (Footer)
自定义页面底部的版权信息。

```yaml
footer:
  copyright: "© 2024 你的名字"
```
---
### 5. CDN 配置
为了加速主题静态资源加载，你可以配置 CDN。

```yaml
cdn:
  enable: true
  url: https://res.your-domain.com/
```

如不需要 CDN 加速，将 `enable` 改为 `false` 即可。

---

## 开源协议 (License)

[MIT License](LICENSE)

Copyright (c) 2025 Spatio Studio
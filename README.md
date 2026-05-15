# Onda Media Converter

> 私密、快速、完全在浏览器中运行的音视频转码工具。

## 功能

-  **本地处理** — 所有文件在你的设备上处理，不会上传到任何服务器
-  **零文件大小限制** — 不受云端转换服务的大小限制，理论上支持任意大文件
-  **多格式支持** — 音频支持 MP3 / WAV / FLAC / M4A / AAC / OGG 等；视频支持 MP4 / MOV / AVI / MKV / WEBM 等
-  **极速性能** — 基于 WebAssembly 的 FFmpeg 引擎，提供接近原生的编解码速度
-  **隐私优先** — 无需注册、无数据收集、文件从始至终不离开你的浏览器

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React 19 + Vite 8 |
| UI 组件库 | Ant Design 5 |
| 路由 | React Router v7 |
| 图标 | Material Symbols Outlined |
| 字体 | Sora |
| 转码引擎 | FFmpeg WebAssembly (计划中) |

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 项目结构

```
src/
├── components/     # Header、Footer 等公共组件
├── context/        # React Context 全局状态管理
├── layouts/        # 页面布局
├── pages/          # 6 个页面
│   ├── Home.jsx              # 首页 - 文件上传
│   ├── ChooseFormat.jsx      # 选择目标格式
│   ├── Converting.jsx        # 转换进度
│   ├── Done.jsx              # 下载完成文件
│   ├── HowItWorks.jsx        # 工作原理介绍
│   └── SupportedFormats.jsx  # 支持格式列表
└── styles/         # 全局样式 & 字体
```

## 设计说明

UI 完全还原 Stitch 设计稿，采用：
- Glassmorphism 玻璃态面板（`backdrop-filter: blur(20px)`）
- Material Design 3 设计令牌（颜色、圆角、间距、阴影）
- Sora 字体排版体系

## License

MIT

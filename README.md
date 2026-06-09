# 乡野共富 | 山野好物品牌馆 (Rural Commerce Studio)

这是一个为“乡野共富”项目打造的高端、现代化的数字品牌展馆页面。本项目以“极简杂志风”为设计灵感，旨在通过卓越的视觉排版和丝滑的交互体验，将中国优质农产品（如秦岭猕猴桃、元阳红米、武夷笋干等）背后的产地故事与品质承诺优雅地传递给消费者。

## 🌟 核心特色 (Features)

- **极简杂志风 (Minimalist Editorial Design)**: 采用充足的留白、几何线条与大面积高清图片，并配合精心调整的西文/中文混合排版，营造出高端生活方式品牌质感。
- **动态呼吸感 (Smooth Micro-Animations)**: 引入平滑的元素入场渐现效果和图片悬停慢镜放大特效。
- **流畅的页面转场 (Page Transitions)**: 借助 Framer Motion 实现了如同原生 App 般平滑顺畅的导航切换与组件更替。
- **滚动进度指示 (Scroll Indicator)**: 页面顶部自带跟随阅读进度的细线进度条。

## 🛠 技术栈 (Tech Stack)

项目经过全面重构，采用了前沿的前端工程化体系：

- **核心框架**: [React](https://react.dev/) + [Vite](https://vitejs.dev/) (提供极速的冷启动与热更新)
- **CSS 引擎**: [Tailwind CSS v4](https://tailwindcss.com/) (使用最新 `@theme` 变量系统与纯享工具类体验)
- **动效库**: [Framer Motion](https://www.framer.com/motion/) (实现精细的转场和滚动揭示动画)
- **图标库**: [Lucide React](https://lucide.dev/) (提供极简轻量的 SVG 矢量图标)

## 🚀 快速预览与启动 (Quick Start)

### 方式一：无环境本地直接预览（推荐）
在经过单文件内联构建后，你无需配置任何 Node.js 等开发环境，只需在项目根目录下**双击运行 `index.html`**，即可在浏览器中获得与线上一致的极简体验、视觉特效和页面功能！

### 方式二：本地开发环境
请确保你的环境已安装了 Node.js（推荐使用 v18+）。

1. **安装依赖**
   ```bash
   npm install
   ```

2. **启动本地开发服务器**
   ```bash
   npm run dev
   ```

3. **构建生产版本**（自动生成单文件 `index.html` 到根目录）
   ```bash
   npm run build
   ```

## 📂 项目结构 (Project Structure)

- `index.html` - 经过编译后的单文件部署版（包含全部内联 JS/CSS），支持直接在本地双击打开（依赖根目录 `assets/` 中的图片）。
- `src/index.html` - Vite 构建系统的原始 HTML 模板入口。
- `src/App.jsx` - 包含所有主要视图组件、路由导航及动画逻辑的核心入口。
- `src/index.css` - 全局样式及 Tailwind CSS v4 的自定义主题（Theme Variables）配置。
- `public/assets/images/` - 项目中使用的所有高清静态图片资源（编译后输出至根目录 `assets/`）。

---
*“把山野里的好东西，带到更多人的餐桌。”*

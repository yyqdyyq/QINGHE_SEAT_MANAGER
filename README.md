## 青禾自习室座位管理前端原型

一个用于共享自习室管理者查看和管理座位使用情况的前端 Dashboard 原型，基于 **React + TypeScript + Vite + Tailwind CSS**，使用本地假数据，无需后端即可运行。

### 功能特性

- 座位网格视图（A01–C08 共 24 个座位）
- 统计卡片：总座位数 / 占用中 / 空闲中 / 即将到期
- 筛选：按状态（全部 / 空闲 / 占用中 / 即将到期）、按套餐类型（次卡 / 日卡 / 周卡 / 月卡）
- 右侧详情抽屉：展示座位状态、客户信息、时间信息
- 新增 / 安排 / 编辑入座弹窗
- 结束使用：恢复为空闲状态
- 现代化 SaaS Dashboard 风格界面，基础响应式布局

### 技术栈

- React 18
- TypeScript
- Vite
- Tailwind CSS

### 本地运行

在项目根目录（例如 `d:\Local\AI_project\Qinghe_seat_manager`）执行：

```bash
npm install
npm run dev
```

然后在浏览器中访问 `http://localhost:5173`。

### 构建生产版本

```bash
npm run build
npm run preview
```

### 目录结构概览

- `package.json` / `tsconfig*.json` / `vite.config.ts` / `tailwind.config.js` / `postcss.config.js`
- `src/App.tsx`：页面主布局与核心状态管理
- `src/types/seat.ts`：座位相关类型定义
- `src/data/seats.ts`：座位假数据（24 个座位）
- `src/utils/time.ts`：时间与时长格式化函数
- `src/components/layout/Header.tsx`：顶部栏
- `src/components/dashboard/StatsCards.tsx`：统计卡片
- `src/components/dashboard/FilterBar.tsx`：筛选栏
- `src/components/seats/SeatGrid.tsx` / `SeatCard.tsx`：座位网格与卡片
- `src/components/seats/SeatDetailDrawer.tsx`：右侧详情抽屉
- `src/components/seats/CheckInModal.tsx`：新增/编辑入座弹窗
- `src/components/common/Modal.tsx` / `Tag.tsx`：通用弹窗与状态标签


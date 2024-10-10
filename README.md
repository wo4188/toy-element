# 前言

为了目录扁平，只创建 `packages` 这么一个 pnpm 工作区，项目的分包结构如下：
```shell
- components # 组件目录
- core # npm 包入口
- docs # 文档目录
- hooks # 组合式API hooks 目录
- play # 组件开发实验室
- theme # 主题目录
- utils # 工具函数目录
```

每个组件的目录大致结构如下：
```shell
- Xxx.test.tsx
- Xxx.vue
- types.ts
- style.css
- index.ts
- constants.ts
```

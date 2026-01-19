---
name: git-commit
description: 帮助你理解并生成用户需要的是怎样的描述风格，怎样格式和规范的commit-message。在涉及git的commit操作之前必须先调用此技能来了解用户的commit规范和偏好！
allowed-tools: Bash, Read, Write, Edit
---

# Git Commit Message creater
 
## 提交消息格式规范
1. `类型: 描述`（冒号后有空格）
2. **描述至少 5 个字符**（中文通常是3个字以上）
具体类型如下:
- `feat: `
- `fix: 
- `update: `
- `style: `
- `refactor: `

## message 内容规范
功能或者修改点的概括

## 例子
feat:添加自定义提示词功能支持 update:优化AI生成/重写流程和UI

- 新增prompt编辑弹窗，支持用户在生成/重写时自定义提示词
- 统一单任务和多任务的AI进度提示UI
- 优化useAIGenerate任务队列管理，强制更新确保UI同步
- 新增get_mindmap_context工具获取完整思维导图上下文
- 在systemPrompts中明确用户prompt优先级最高
- 修复aiDiffManager的global action节点删除和文本修改逻辑
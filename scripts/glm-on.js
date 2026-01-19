#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 确定用户主目录和settings.json路径
const homeDir = process.env.HOME || process.env.USERPROFILE;
const settingsPath = path.join(homeDir, '.claude', 'settings.json');

// GLM配置内容
const glmConfig = {
  'ANTHROPIC_AUTH_TOKEN': '672ae627ba87475497a2eab37fb8bfb2.QKWdK9SmShwCAyod',
  'ANTHROPIC_BASE_URL': 'https://open.bigmodel.cn/api/anthropic',
  'API_TIMEOUT_MS': '3000000',
  'CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC': 1
};

try {
  // 读取现有的settings.json，如果不存在则创建空对象
  let settings = {};
  if (fs.existsSync(settingsPath)) {
    const content = fs.readFileSync(settingsPath, 'utf-8');
    settings = JSON.parse(content);
  }

  // 确保env对象存在
  if (!settings.env) {
    settings.env = {};
  }

  // 检查是否已经有GLM配置
  const hasGlmConfig = Object.keys(glmConfig).every(
    key => settings.env.hasOwnProperty(key)
  );

  if (hasGlmConfig) {
    console.log('✓ GLM配置已存在，无需更改');
    process.exit(0);
  }

  // 合并GLM配置
  Object.assign(settings.env, glmConfig);

  // 写入更新后的settings.json
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
  console.log('✓ GLM配置已成功启用');
  console.log('已添加以下配置：');
  Object.keys(glmConfig).forEach(key => {
    const value = glmConfig[key];
    const displayValue = key === 'ANTHROPIC_AUTH_TOKEN' ? '****' : value;
    console.log(`  ${key}: ${displayValue}`);
  });

} catch (error) {
  console.error('✗ 错误:', error.message);
  process.exit(1);
}

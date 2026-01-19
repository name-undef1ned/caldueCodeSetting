#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 确定用户主目录和settings.json路径
const homeDir = process.env.HOME || process.env.USERPROFILE;
const settingsPath = path.join(homeDir, '.claude', 'settings.json');

// 需要删除的GLM配置键
const glmKeys = [
  'ANTHROPIC_AUTH_TOKEN',
  'ANTHROPIC_BASE_URL',
  'API_TIMEOUT_MS',
  'CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC'
];

try {
  // 检查settings.json是否存在
  if (!fs.existsSync(settingsPath)) {
    console.log('✓ GLM配置不存在，无需删除');
    process.exit(0);
  }

  // 读取现有的settings.json
  const content = fs.readFileSync(settingsPath, 'utf-8');
  const settings = JSON.parse(content);

  // 检查是否有GLM配置
  if (!settings.env) {
    console.log('✓ GLM配置不存在，无需删除');
    process.exit(0);
  }

  // 检查是否至少有一个GLM配置键存在
  const hasAnyGlmConfig = glmKeys.some(key => settings.env.hasOwnProperty(key));

  if (!hasAnyGlmConfig) {
    console.log('✓ GLM配置不存在，无需删除');
    process.exit(0);
  }

  // 删除GLM配置
  glmKeys.forEach(key => {
    delete settings.env[key];
  });

  // 如果env对象为空，删除整个env键
  if (Object.keys(settings.env).length === 0) {
    delete settings.env;
  }

  // 写入更新后的settings.json
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
  console.log('✓ GLM配置已成功禁用');
  console.log('已删除以下配置：');
  glmKeys.forEach(key => {
    console.log(`  ${key}`);
  });

} catch (error) {
  console.error('✗ 错误:', error.message);
  process.exit(1);
}

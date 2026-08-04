/**
 * Phase 2 打包脚本：生成可安装 zip（Phase 1 + 跨机 Relay 能力）。
 * 内容：manifest/index.ts + lib（含 websocket-transport）+ tools（正式 4 个）
 *       + routes + assets（构建产物）+ vendor（bcryptjs/ws/plugin-runtime）
 *       + relay-server（部署文件，不含 node_modules/测试）
 * 排除：docs/ scripts/ ui/（源码） phase0/ .sdk-* node_modules/ 测试工具 旧 zip
 *
 * 用法：node scripts/package-zip.mjs
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'session-bridge.zip');

/** 相对路径清单（目录递归展开） */
const INCLUDE_DIRS = [
  'lib',
  'routes',
  'tools',
  'assets',
  'vendor/bcryptjs',
  'vendor/ws',
  'relay-server',
];
const INCLUDE_FILES = [
  'manifest.json',
  'index.ts',
  'vendor/plugin-runtime.js',
  'vendor/plugin-runtime.d.ts',
];
/** 工具里排除测试文件 */
const EXCLUDE_FILES = [
  'tools/test-message-bus.ts',
  'tools/test-room.ts',
  'tools/test-tools.ts',
  'tools/test-transport.ts',
  'tools/test-websocket-transport.ts',
  'relay-server/test-smoke.mjs',
  'relay-server/package-lock.json',
  'relay-server/node_modules',
];

function collect(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(ROOT, full).replace(/\\/g, '/');
    if (EXCLUDE_FILES.some((e) => rel === e || rel.startsWith(e + '/'))) continue;
    if (entry.isDirectory()) collect(full, out);
    else out.push(rel);
  }
  return out;
}

const files = [...INCLUDE_FILES];
for (const d of INCLUDE_DIRS) {
  collect(path.join(ROOT, d), files);
}

// 去重 + 排序
const unique = [...new Set(files)].sort();

if (fs.existsSync(OUT)) fs.rmSync(OUT);
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'sb-zip-'));
for (const rel of unique) {
  const src = path.join(ROOT, rel);
  const dst = path.join(tmpDir, rel);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(src, dst);
}
execSync(`powershell -NoProfile -Command "Compress-Archive -Path '${tmpDir}\\*' -DestinationPath '${OUT}' -Force"`);
fs.rmSync(tmpDir, { recursive: true, force: true });

const sizeKB = Math.round(fs.statSync(OUT).size / 1024);
console.log(`✅ session-bridge.zip (${sizeKB}KB, ${unique.length} files)`);
for (const f of unique) console.log(`  ${f}`);

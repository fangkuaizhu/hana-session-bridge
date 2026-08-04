// lib/store.ts
// JSON 文件读写工具（房间持久化）。
// 房间数据存储在插件私有数据目录 plugin-data/session-bridge/rooms/ 下。
// 使用 Node fs 同步 API：插件数据目录是插件自有存储，可直接 fs 读写。
import fs from 'node:fs';
import path from 'node:path';

/** 读 JSON 文件，不存在返回 null */
export function readJSON<T>(filePath: string): T | null {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as T;
  } catch (e: unknown) {
    // 文件不存在 → null；JSON 损坏 → 返回 null 并让调用方删除/忽略（设计文档 §8.7）
    return null;
  }
}

/** 写 JSON 文件（覆盖），自动创建父目录 */
export function writeJSON<T>(filePath: string, data: T): void {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

/** 追加 JSONL 行，自动创建父目录 */
export function appendJSONL<T>(filePath: string, entry: T): void {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.appendFileSync(filePath, `${JSON.stringify(entry)}\n`, 'utf-8');
}

/** 删除文件（不存在时静默成功） */
export function deleteFile(filePath: string): void {
  try {
    fs.rmSync(filePath, { force: true });
  } catch { /* ignore */ }
}

/** 列出目录下所有文件路径（不存在返回空数组） */
export function listFiles(dir: string): string[] {
  try {
    return fs.readdirSync(dir).map((f) => path.join(dir, f));
  } catch {
    return [];
  }
}

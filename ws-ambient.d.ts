// ws-ambient.d.ts
// ws 包（node_modules/ws 与 vendor/ws）不自带类型声明，且项目未安装 @types/ws。
// lib/websocket-transport.ts 使用 `typeof import('ws')` 类型查询，需要 'ws' 模块声明。
// 此处提供最小 ambient 声明（仅覆盖实际用到的实例 API），供 tsc 命令行补查 lib 时
// 作为额外编译单元引入：npx tsc ... <files> ws-ambient.d.ts
declare module 'ws' {
  class WebSocket {
    constructor(url?: string, options?: unknown);
    readyState: number;
    url: string;
    on(event: string | symbol, listener: (...args: any[]) => void): this;
    once(event: string | symbol, listener: (...args: any[]) => void): this;
    removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
    off(event: string | symbol, listener: (...args: any[]) => void): this;
    removeAllListeners(event?: string | symbol): this;
    send(data: unknown, options?: unknown, callback?: (error?: Error) => void): void;
    close(code?: number, reason?: string): void;
    terminate(): void;
    ping(data?: unknown, mask?: boolean | (() => void), callback?: () => void): void;
    pong(data?: unknown, mask?: boolean | (() => void), callback?: () => void): void;
  }
  export = WebSocket;
}

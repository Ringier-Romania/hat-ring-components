export type LogLevel = 'silent' | 'error' | 'warn' | 'info' | 'debug';
export declare function LogHelper_error(message: string, ...args: unknown[]): void;
export declare function LogHelper_warn(message: string, ...args: unknown[]): void;
export declare function LogHelper_info(message: string, ...args: unknown[]): void;
export declare function LogHelper_debug(message: string, ...args: unknown[]): void;
export declare function LogHelper_getLevel(): LogLevel;
export declare function LogHelper_isLevelEnabled(level: LogLevel): boolean;

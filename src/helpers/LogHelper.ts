/**
 * Log levels for the application.
 * Controlled by LOG_LEVEL environment variable.
 *
 * Levels (from least to most verbose):
 * - 'silent' (0): No output
 * - 'error'  (1): Only errors
 * - 'warn'   (2): Errors + warnings
 * - 'info'   (3): Errors + warnings + info (default)
 * - 'debug'  (4): All messages including debug
 */

import {UtilsHelper_getErrorMessage} from './UtilsHelper';

export type LogLevel = 'silent' | 'error' | 'warn' | 'info' | 'debug';

const LOG_LEVEL_VALUES: Record<LogLevel, number> = {
    silent: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
};

function getConfiguredLogLevel(): number {
    const envLevel = (process.env.LOG_LEVEL || 'info').toLowerCase() as LogLevel;
    return LOG_LEVEL_VALUES[envLevel] ?? LOG_LEVEL_VALUES.info;
}

function shouldLog(level: LogLevel): boolean {
    return LOG_LEVEL_VALUES[level] <= getConfiguredLogLevel();
}

function formatArgs(args: unknown[]): unknown[] {
    return args.map(arg => {
        if (arg instanceof Error) {
            return UtilsHelper_getErrorMessage(arg);
        }
        return arg;
    });
}

/**
 * Log an error message. Shown when LOG_LEVEL >= 'error'.
 */
export function LogHelper_error(message: string, ...args: unknown[]): void {
    if (shouldLog('error')) {
        console.error(message, ...formatArgs(args));
    }
}

/**
 * Log a warning message. Shown when LOG_LEVEL >= 'warn'.
 */
export function LogHelper_warn(message: string, ...args: unknown[]): void {
    if (shouldLog('warn')) {
        console.warn(message, ...formatArgs(args));
    }
}

/**
 * Log an info message. Shown when LOG_LEVEL >= 'info'.
 */
export function LogHelper_info(message: string, ...args: unknown[]): void {
    if (shouldLog('info')) {
        console.info(message, ...formatArgs(args));
    }
}

/**
 * Log a debug message. Shown when LOG_LEVEL >= 'debug'.
 */
export function LogHelper_debug(message: string, ...args: unknown[]): void {
    if (shouldLog('debug')) {
        console.log(message, ...formatArgs(args));
    }
}

/**
 * Get the current log level.
 */
export function LogHelper_getLevel(): LogLevel {
    const envLevel = (process.env.LOG_LEVEL || 'info').toLowerCase() as LogLevel;
    return LOG_LEVEL_VALUES[envLevel] !== undefined ? envLevel : 'info';
}

/**
 * Check if a specific log level is enabled.
 */
export function LogHelper_isLevelEnabled(level: LogLevel): boolean {
    return shouldLog(level);
}


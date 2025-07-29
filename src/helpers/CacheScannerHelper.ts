import _ from "lodash";

interface ScannerState {
    status: 'running' | 'stopping' | 'done' | 'stopped' | null;
    keys: string[];
    totalKeys: number;
    cursor: any;
    error: any | null;
    values: any;
}

if (!global['_scanners']) {
    global['_scanners'] = new Map<string, ScannerState>();
}

export function CacheScannerHelper_getData(match: string) {
    const state = getScannerState(match);
    const dataToSend = {
        keys: [...state.keys],
        totalKeys: state.totalKeys,
        cursor: state.cursor,
        status: state.status,
        error: state.error,
        values: _.cloneDeep(state.values)
    };
    state.keys = [];
    state.values = {};
    return dataToSend;
}

function getScannerState(id: string): ScannerState {
    if (!global['_scanners'].has(id)) {
        global['_scanners'].set(id, {
            status: null,
            keys: [],
            totalKeys: 0,
            cursor: 0,
            error: null,
            values: {}
        });
    }
    return global['_scanners'].get(id)!;
}

export function CacheScannerHelper_removeScanner(id: string) {
    const state = global['_scanners'].get(id);
    if (state) {
        global['_scanners'].delete(id);
    }
}

export function CacheScannerHelper_stopScanning(id: string) {
    if (CacheScannerHelper_getStatus(id) !== 'stopping') {
        CacheScannerHelper_setStatus(id, 'stopping');
        CacheScannerHelper_removeScanner(id);
    }
}

export function CacheScannerHelper_getStatus(id: string): 'running' | 'stopping' | 'done' | 'stopped' | null {
    if (!global['_scanners'].has(id)) {
        return null;
    }
    return getScannerState(id).status;
}

export function CacheScannerHelper_setStatus(id: string, status: 'running' | 'stopping' | 'done' | 'stopped' | null) {
    getScannerState(id).status = status;
}

async function scanKeys(
    cacheAdapter,
    startCursor,
    match,
    count,
    timeout,
    sleep,
    processKeys:  (keys: string[])  => Promise<void>,
) {
    if (CacheScannerHelper_getStatus(match) === 'running') {
        return;
    }
    CacheScannerHelper_setStatus(match, 'running');
    const state = getScannerState(match);
    state.totalKeys = 0;
    state.error = null;

    try {
        let cursor = startCursor;
        const startTime = Date.now();

        do {
            if (Date.now() - startTime > timeout || ['stopping', null].includes(CacheScannerHelper_getStatus(match))) {
                break;
            }

            if (cacheAdapter.scan) {
                const scan = await cacheAdapter.scan(cursor, match, count);
                cursor = scan.cursor;
                if (scan.keys.length > 0) {
                    await processKeys(scan.keys);
                    state.keys.push(...scan.keys);
                }

                state.totalKeys += scan.keys.length;
                state.cursor = scan.cursor;
            } else {
                const keys = await cacheAdapter.keys();
                await processKeys(keys);
                cursor = 0;
                state.cursor = 0;
                state.totalKeys = keys.length;
                state.keys = keys;
            }

            if (cursor !== 0) {
                await new Promise((resolve) => setTimeout(resolve, sleep));
            }
        } while (cursor !== 0);

    } catch (e: any) {
        console.error(e);
        state.error = { stack: e?.stack };
    } finally {
        const currentStatus = CacheScannerHelper_getStatus(match);
        if (currentStatus === 'running') {
            CacheScannerHelper_setStatus(match, 'done');
        } else if (currentStatus === 'stopping') {
            CacheScannerHelper_setStatus(match, 'stopped');
        }
    }
}

export async function CacheScannerHelper_getAllKeysByScan(cacheAdapter, startCursor, match, getValue, count, timeout, sleep) {
    console.info('CacheScannerHelper_getAllKeysByScan_start', match);
    await scanKeys(cacheAdapter, startCursor, match, count, timeout, sleep, async (keys: string[]) => {
        if (getValue) {
            const scannerState = global['_scanners'].get(match);
            for (const key of keys) {
                scannerState.values[key] = await cacheAdapter.get(key);
            }
        }
    });
    console.info('CacheScannerHelper_getAllKeysByScan_end', match);
}

export async function CacheScannerHelper_clearKeysByScan(cacheAdapter, startCursor, match, count, timeout, sleep) {
    console.info('CacheScannerHelper_clearKeysByScan_start', match);

    await scanKeys(cacheAdapter, startCursor, match, count, timeout, sleep, async (keys: string[]) => {
        keys.forEach((key) => {
            if (cacheAdapter.unlink) {
                cacheAdapter.unlink(key);
            } else {
                cacheAdapter.del(key);
            }
        });
    });
    console.info('CacheScannerHelper_clearKeysByScan_end', match);
}

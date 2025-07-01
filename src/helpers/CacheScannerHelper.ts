import events from 'events';

interface EmitterState {
    emitter: events.EventEmitter;
    status: 'running' | 'stopping' | null;
}

const emitters = new Map<string, EmitterState>();

export function CacheScannerHelper_createStreamingResponse(match: string): Response {
    const emitter = CacheScannerHelper_getEmitter(match);
    let events_listener: (counter: any) => void;

    const stream = new ReadableStream({
        start(controller) {
            events_listener = (stream) => {
                const data = `data: ${JSON.stringify({ stream })}\r\n\r\n`;
                controller.enqueue(data)
            }
            emitter.off('stream', events_listener)
            emitter.on('stream', events_listener)
        },
        cancel() {
            emitter.removeListener('stream', events_listener)
        }
    });

    return new Response(stream, {
        status: 200,
        headers: {
            'Content-Type': 'text/event-stream',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache'
        }
    });
}

function getEmitterState(id: string): EmitterState {
    if (!emitters.has(id)) {
        emitters.set(id, {
            emitter: new events.EventEmitter(),
            status: null,
        });
    }
    return emitters.get(id)!;
}

export function CacheScannerHelper_getEmitter(id: string): events.EventEmitter {
    return getEmitterState(id).emitter;
}

export function CacheScannerHelper_removeEmitter(id: string) {
    const state = emitters.get(id);
    if (state) {
        state.emitter.removeAllListeners();
        emitters.delete(id);
    }
}

export function CacheScannerHelper_getStatus(id: string): 'running' | 'stopping' | null {
    if (!emitters.has(id)) {
        return null;
    }
    return getEmitterState(id).status;
}

export function CacheScannerHelper_setStatus(id: string, status: 'running' | 'stopping' | null) {
    getEmitterState(id).status = status;
}

async function scanKeys(
    cacheAdapter,
    startCursor,
    match,
    count,
    timeout,
    sleep,
    processKeys: (keys: string[]) => void
) {
    if (CacheScannerHelper_getStatus(match) === 'running') {
        return;
    }
    let totalKeys = 0;
    CacheScannerHelper_setStatus(match, 'running');
    const emitter = CacheScannerHelper_getEmitter(match);

    try {
        let cursor = startCursor;
        const startTime = Date.now();

        do {
            if (Date.now() - startTime > timeout || CacheScannerHelper_getStatus(match) === 'stopping') {
                break;
            }

            const scan = await cacheAdapter.scan(cursor, match, count);
            cursor = scan.cursor;
            totalKeys += scan.keys.length;

            if (scan.keys.length > 0) {
                processKeys(scan.keys);
            }

            emitter.emit("stream", { totalKeys, keys: scan.keys, cursor: scan.cursor });

            if (cursor !== 0) {
                await new Promise((resolve) => setTimeout(resolve, sleep));
            }
        } while (cursor !== 0);

    } catch (e) {
        console.error(e);
        CacheScannerHelper_getEmitter(match).emit("stream", { error: { stack: e.stack } });
    } finally {
        CacheScannerHelper_setStatus(match, null);
        CacheScannerHelper_removeEmitter(match);
    }
}

export async function CacheScannerHelper_getAllKeysByScan(cacheAdapter, startCursor, match, count, timeout, sleep ) {
    await scanKeys(cacheAdapter, startCursor, match, count, timeout, sleep, () => {});
}

export async function CacheScannerHelper_clearKeysByScan(cacheAdapter, startCursor, match, count, timeout, sleep ) {
    const process = (keys: string[]) => {
        keys.forEach((key) => {
            if (cacheAdapter.unlink) {
                cacheAdapter.unlink(key);
            } else {
                cacheAdapter.del(key);
            }
        });
    };
    await scanKeys(cacheAdapter, startCursor, match, count, timeout, sleep, process);
}

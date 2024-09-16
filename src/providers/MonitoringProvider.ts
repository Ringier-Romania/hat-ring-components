interface MonitoringService {
    counter(metric: string): void;
    flush(): void;
    gauge(metric: string, value: number): void;
}

interface MonitoringProviderTimer {
    done(): number;
}

export class MonitoringProvider {

    monitoringProvider = global['monitoringProvider'] as MonitoringService;

    static async counter(metric: string) {
        if(global['monitoringProvider'] && global['monitoringProvider'].counter) {
            global['monitoringProvider'].counter(metric);
        }
    }

    static async flush() {
        if(global['monitoringProvider'] && global['monitoringProvider'].flush) {
            global['monitoringProvider'].flush();
        }
    }

    static async gauge(metric: string, value: number) {
        if(global['monitoringProvider'] && global['monitoringProvider'].gauge) {
            global['monitoringProvider'].gauge(metric, value);
        }
    }

    static getMonitoringProvider() {
        return global['monitoringProvider'];
    }


    static timer(metric: string | string[], timeout?: number, buckets?: number[]){
        if(global['monitoringProvider'] && global['monitoringProvider'].timer) {
            return global['monitoringProvider'].timer(metric, timeout, buckets);
        }
    };
}

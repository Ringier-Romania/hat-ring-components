interface MonitoringService {
    counter(metric: string): void;
    flush(): void;
    gauge(metric: string, value: number): void;
}

export class MonitoringProvider {

    monitoringProvider = global['monitoringProvider'] as MonitoringService;

    static async counter(metric: string) {
        if(global['monitoringProvider'] && global['monitoringProvider'].counter) {
            console.log('counter', metric);
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
}

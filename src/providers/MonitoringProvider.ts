interface MonitoringService {
    counter(metric: string): void;
    flush(): void;
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

    static getMonitoringProvider() {
        return global['monitoringProvider'];
    }
}

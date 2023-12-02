interface Gtag {
    (command: 'config', targetId: string, config?: any): void;
    (command: 'set', config: any): void;
    (command: 'consent', action: string, config?: any): void;
    (command: 'event', eventName: string, eventParams?: any): void;
}

interface Window {
    gtag: Gtag;
}
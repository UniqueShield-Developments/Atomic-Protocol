import { Client } from "atomic-net";
export declare class NethernetClient {
    connected: boolean;
    onConnected: () => void;
    onCloseConnection: (reason: any) => void;
    onEncapsulated: (buffer: any, address: any) => void;
    nethernet: Client;
    constructor(options?: any);
    connect(): Promise<void>;
    sendReliable(data: any): void;
    set credentials(value: any);
    get credentials(): any;
    set signalHandler(handler: (signal: any) => void);
    handleSignal(signal: any): void;
    ping(timeout?: number): Promise<unknown>;
    close(): void;
}

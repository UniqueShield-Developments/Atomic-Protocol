import { EventEmitter } from 'node:events';
import { Client } from 'raknet-native';
export declare class RaknetClient extends EventEmitter {
    connected: boolean;
    onConnected: () => void;
    onCloseConnection: (reason: any) => void;
    onEncapsulated: (buffer: any, address: any) => void;
    raknet: Client;
    constructor(options: any);
    ping(timeout?: number): Promise<unknown>;
    connect(): void;
    close(): void;
    sendReliable(buffer: Buffer, immediate: boolean): number | undefined;
}

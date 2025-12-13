import { Events } from "atomic-codec";
import { ClientOptions } from "../types";
import { Connection } from "./connection";
export declare class Client extends Connection {
    features: any;
    options: ClientOptions;
    startGameData: any;
    clientRuntimeId: any;
    tick: bigint;
    connectTimeout: NodeJS.Timeout;
    viewDistance: number;
    accessToken: string;
    clientIdentityChain: string;
    clientUserChain: string;
    nethernet: any;
    networkSettingsRequested: boolean;
    on<K extends keyof Events>(event: K, listener: Events[K]): this;
    once<K extends keyof Events>(event: K, listener: Events[K]): this;
    constructor(options: ClientOptions);
    setStatus(value: number): void;
    connect(): void;
    disconnect(reason: string, hide?: any): void;
    close(): void;
    init(): void;
    get entityId(): any;
    private onEncapsulated;
    readPacket(packet: any): void;
    _connect: () => Promise<void>;
    sendLogin(): void;
    onDisconnectRequest(packet: any): void;
    onPlayStatus(statusPacket: {
        status: string;
    }): void;
}

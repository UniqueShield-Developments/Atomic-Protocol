import type { IceServer } from "atomic-net";
import { SignalStructure } from "atomic-net";
import { EventEmitter } from "node:events";
import { WebSocket } from "ws";
import { Tokens } from "../types";
export declare class NethernetSignal extends EventEmitter {
    networkId: string;
    tokens: Tokens;
    version: string;
    ws: WebSocket | null;
    credentials: IceServer[];
    private heartbeat;
    private destroyed;
    constructor(networkId: string, tokens: Tokens, version: string);
    connect(): Promise<void>;
    destroy(): Promise<void>;
    init(): Promise<void>;
    private onOpen;
    private onError;
    private onClose;
    private onMessage;
    write(signal: SignalStructure): void;
}

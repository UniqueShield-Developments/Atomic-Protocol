import { ClientOptions } from "../types";
import { Client } from "./client";
export declare enum AuthenticationType {
    Full = 0,
    Guest = 1,
    SelfSigned = 2
}
export declare const realmAuth: (options: ClientOptions) => Promise<unknown>;
export declare const authenticate: (client: Client, options: ClientOptions) => Promise<void>;
export declare function OptIn(options: any): Promise<{
    ok: boolean;
    status: number;
    body?: undefined;
} | {
    ok: boolean;
    status: number;
    body: string | undefined;
}>;

import { ClientOptions } from "../types";
import { Client } from "./client";
export declare enum AuthenticationType {
    Full = 0,
    Guest = 1,
    SelfSigned = 2
}
export declare const realmAuth: (options: ClientOptions) => Promise<unknown>;
export declare const authenticate: (client: Client, options: ClientOptions) => Promise<void>;
/**
 * Opts the player into realm story features for the given realm
 * @param options Contains the authflow/token data and the target `realmId`.
 * @returns Promise with request outcome, including status code and optional response body when failed.
 */
export declare function OptIn(options: any): Promise<{
    ok: boolean;
    status: number;
    body?: undefined;
} | {
    ok: boolean;
    status: number;
    body: string | undefined;
}>;

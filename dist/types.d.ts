import { Authflow } from "prismarine-auth";
export declare const clientStatus: {
    Disconnected: number;
    Connecting: number;
    Authenticating: number;
    Initializing: number;
    Initialized: number;
};
export declare const PUBLIC_KEY = "MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAECRXueJeTDqNRRgJi/vlRufByu/2G0i2Ebt6YMar5QX/R0DIIyrJMcUpruK4QveTfJSTp3Shlq4Gk34cD/4GUWwkv0DVuzeuB+tXija7HBxii03NHDbPAD0AKnLr2wdAp";
export interface Token {
    userXUID: string;
    userHash: string;
    XSTSToken: string;
    expiresOn: string;
}
export interface Tokens {
    realms: Token;
    bedrock: Token;
    mcToken: {
        token: string;
        expiresOn: string;
    };
}
export interface ClientOptions {
    host?: string;
    port?: number;
    realmId?: number;
    inviteCode?: string;
    authflow: Authflow | Tokens;
    protocolVersion?: number;
    version?: string;
    debug?: boolean;
    connectTimeout?: number;
    skinData?: any;
    delayedInit?: boolean;
    followPort?: boolean;
    viewDistance?: number;
    skipPing?: boolean;
    packets?: string[];
    username?: string;
    profilesFolder?: string;
    networkId?: bigint;
    transport?: string;
    useSignalling?: boolean;
}
export declare enum CompressionAlgorithm {
    None = "none",
    Zlib = "zlib",
    Gzip = "gzip"
}

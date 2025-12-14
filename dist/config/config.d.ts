export declare const config: {
    debug: boolean;
    protocol: number;
    minecraftVersion: string;
    deviceModel: string;
    connectTimeout: number;
    autoInitPlayer: boolean;
    ignoredPackets: number[];
    parties: {
        xbox: string;
        realm: string;
    };
    realmHeaders: {
        "Cache-Control": string;
        Charset: string;
        "Content-Type": string;
        "Client-Version": string;
        "User-Agent": string;
        "Accept-Language": string;
        "Accept-Encoding": string;
    };
    endpoints: {
        worlds: string;
        address: (realmId: number) => string;
        acceptInvite: (code: string) => string;
    };
};
export declare const defaultOptions: {
    transport: string;
    version: string;
    autoInitPlayer: boolean;
    connectTimeout: number;
    packets: never[];
};

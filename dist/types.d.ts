import { AddPlayerPacket } from "./packets/packet_add_player";
import { EmotePacket } from "./packets/packet_emote";
import { PlayerListPacket } from "./packets/packet_player_list";
import { PlayerSkinPacket } from "./packets/packet_player_skin";
import { TextPacket } from "./packets/packet_text";
import { TickSyncPacket } from "./packets/packet_tick_sync";
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
export interface McsToken {
    token: string;
    expiresOn: string;
}
export interface Tokens {
    realms: Token;
    bedrock: Token;
    mcs: McsToken;
}
export interface ClientOptions {
    host?: string;
    port?: number;
    realmId?: number;
    inviteCode?: string;
    tokens: Tokens;
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
    retryOnUnavailableRealm?: boolean;
    unavailableRealmRetryDelay?: number;
}
export declare enum CompressionAlgorithm {
    None = "none",
    Zlib = "zlib",
    Gzip = "gzip"
}
export interface Events {
    session: () => void;
    start_game: () => void;
    connect_allowed: () => void;
    tick_sync: (packet: TickSyncPacket) => void;
    player_list: (packet: PlayerListPacket) => void;
    player_skin: (packet: PlayerSkinPacket) => void;
    add_player: (packet: AddPlayerPacket) => void;
    text: (packet: TextPacket) => void;
    close: () => void;
    error: () => void;
    disconnect: () => void;
    emote: (packet: EmotePacket) => void;
}

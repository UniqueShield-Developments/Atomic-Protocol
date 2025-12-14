/**
 * ClientCacheBlobStatusPacket
 * Unknown packet ID
 * No description
 */
export interface ClientCacheBlobStatusPacket {
    misses: number;
    haves: number;
    missing: number[];
    have: number[];
}
export declare const ClientCacheBlobStatusPacketInfo: import("./metadata").PacketMetadata;

/**
 * ClientCacheMissResponsePacket
 * Unknown packet ID
 * No description
 */
export interface ClientCacheMissResponsePacket {
    blobs: Blob[];
}
export interface Blob {
    hash: number;
    payload: ByteArray;
}
export type ByteArray = any;
export declare const ClientCacheMissResponsePacketInfo: import("./metadata").PacketMetadata;

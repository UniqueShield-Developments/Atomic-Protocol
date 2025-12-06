/**
 * ResourcePackChunkDataPacket
 * Packet ID: 83
 * Resource Pack Chunk Data
 */
export interface ResourcePackChunkDataPacket {
    pack_id: string;
    chunk_index: number;
    progress: number;
    payload: ByteArray;
}
export type ByteArray = any;
export declare const ResourcePackChunkDataPacketInfo: import("./metadata").PacketMetadata;

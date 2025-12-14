/**
 * ResourcePackChunkRequestPacket
 * Packet ID: 84
 * Resource Pack Chunk Request
 */
export interface ResourcePackChunkRequestPacket {
    pack_id: string;
    chunk_index: number;
}
export declare const ResourcePackChunkRequestPacketInfo: import("./metadata").PacketMetadata;

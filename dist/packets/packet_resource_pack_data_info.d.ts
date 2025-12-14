/**
 * ResourcePackDataInfoPacket
 * Packet ID: 82
 * Resource Pack Data Info
 */
export interface ResourcePackDataInfoPacket {
    pack_id: string;
    max_chunk_size: number;
    chunk_count: number;
    size: number;
    hash: ByteArray;
    is_premium: boolean;
    pack_type: "addon" | "cached" | "copy_protected" | "behavior" | "persona_piece" | "resources" | "skins" | "world_template";
}
export type ByteArray = any;
export declare const ResourcePackDataInfoPacketInfo: import("./metadata").PacketMetadata;

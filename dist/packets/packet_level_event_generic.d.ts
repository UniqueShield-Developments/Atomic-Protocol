/**
 * LevelEventGenericPacket
 * Packet ID: 124
 * LevelEventGenericPacket
 */
export interface LevelEventGenericPacket {
    event_id: number;
    nbt: NbtLoop;
}
export type NbtLoop = any;
export declare const LevelEventGenericPacketInfo: import("./metadata").PacketMetadata;

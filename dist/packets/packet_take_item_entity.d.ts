/**
 * TakeItemEntityPacket
 * Unknown packet ID
 * No description
 */
export interface TakeItemEntityPacket {
    runtime_entity_id: Varint64;
    target: number;
}
export type Varint64 = any;
export declare const TakeItemEntityPacketInfo: import("./metadata").PacketMetadata;

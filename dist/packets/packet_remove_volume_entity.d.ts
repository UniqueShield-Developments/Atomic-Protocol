/**
 * RemoveVolumeEntityPacket
 * Packet ID: 167
 * Sends a volume entity to be removed from server to client.
 */
export interface RemoveVolumeEntityPacket {
    entity_id: Varint64;
}
export type Varint64 = any;
export declare const RemoveVolumeEntityPacketInfo: import("./metadata").PacketMetadata;

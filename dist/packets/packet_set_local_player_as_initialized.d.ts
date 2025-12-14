/**
 * SetLocalPlayerAsInitializedPacket
 * Packet ID: 113
 * Set Local Player As Initialized
 */
export interface SetLocalPlayerAsInitializedPacket {
    runtime_entity_id: Varint64;
}
export type Varint64 = any;
export declare const SetLocalPlayerAsInitializedPacketInfo: import("./metadata").PacketMetadata;

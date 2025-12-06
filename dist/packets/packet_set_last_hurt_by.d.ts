/**
 * SetLastHurtByPacket
 * Packet ID: 96
 * Any time a player is hit, the id of the last mob that attacked them is sent to the client
 */
export interface SetLastHurtByPacket {
    entity_type: number;
}
export declare const SetLastHurtByPacketInfo: import("./metadata").PacketMetadata;

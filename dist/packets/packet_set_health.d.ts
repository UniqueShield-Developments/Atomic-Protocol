/**
 * SetHealthPacket
 * Packet ID: 42
 * This packet is sent to the client when the player is spawned in and when they respawn.
 */
export interface SetHealthPacket {
    health: number;
}
export declare const SetHealthPacketInfo: import("./metadata").PacketMetadata;

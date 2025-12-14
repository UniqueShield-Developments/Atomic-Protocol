/**
 * DeathInfoPacket
 * Packet ID: 189
 * Sent from the server to client when player dies (Level::onPlayerDeath).
 */
export interface DeathInfoPacket {
    cause: string;
    messages: string[];
}
export declare const DeathInfoPacketInfo: import("./metadata").PacketMetadata;

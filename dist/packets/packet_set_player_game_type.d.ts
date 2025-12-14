/**
 * SetPlayerGameTypePacket
 * Packet ID: 62
 * Set Player Game Type
 */
export interface SetPlayerGameTypePacket {
    gamemode: GameMode;
}
export type GameMode = "survival" | "creative" | "adventure" | "survival_spectator" | "creative_spectator" | "fallback" | "spectator";
export declare const SetPlayerGameTypePacketInfo: import("./metadata").PacketMetadata;

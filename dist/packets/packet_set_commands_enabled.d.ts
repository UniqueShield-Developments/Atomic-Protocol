/**
 * SetCommandsEnabledPacket
 * Packet ID: 59
 * This is used by the world settings screen, cheats, EDU builds for teachers, and various other places to enable cheats/commands
 */
export interface SetCommandsEnabledPacket {
    enabled: boolean;
}
export declare const SetCommandsEnabledPacketInfo: import("./metadata").PacketMetadata;

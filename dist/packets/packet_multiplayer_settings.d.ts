/**
 * MultiplayerSettingsPacket
 * Packet ID: 139
 * Syncs multiplayer settings
 */
export interface MultiplayerSettingsPacket {
    action_type: "enable_multiplayer" | "disable_multiplayer" | "refresh_join_code";
}
export declare const MultiplayerSettingsPacketInfo: import("./metadata").PacketMetadata;

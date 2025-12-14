/**
 * SettingsCommandPacket
 * Packet ID: 140
 * Requests a setting to be changed through commands.
 */
export interface SettingsCommandPacket {
    command_line: string;
    suppress_output: boolean;
}
export declare const SettingsCommandPacketInfo: import("./metadata").PacketMetadata;

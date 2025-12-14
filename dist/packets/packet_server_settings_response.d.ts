/**
 * ServerSettingsResponsePacket
 * Packet ID: 103
 * Server Settings Response
 */
export interface ServerSettingsResponsePacket {
    form_id: number;
    data: string;
}
export declare const ServerSettingsResponsePacketInfo: import("./metadata").PacketMetadata;

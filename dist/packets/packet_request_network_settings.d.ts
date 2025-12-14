/**
 * RequestNetworkSettingsPacket
 * Packet ID: 193
 * Requests tunable options from host to client (compression threshold and algorithm).
 */
export interface RequestNetworkSettingsPacket {
    client_protocol: number;
}
export declare const RequestNetworkSettingsPacketInfo: import("./metadata").PacketMetadata;

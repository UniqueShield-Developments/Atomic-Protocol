/**
 * ServerStatsPacket
 * Packet ID: 192
 * Used to send performance and other valuable stats back to the client
 */
export interface ServerStatsPacket {
    server_time: number;
    network_time: number;
}
export declare const ServerStatsPacketInfo: import("./metadata").PacketMetadata;

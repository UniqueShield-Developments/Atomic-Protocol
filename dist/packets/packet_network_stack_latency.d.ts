/**
 * NetworkStackLatencyPacket
 * Packet ID: 115
 * Ping Packet
 */
export interface NetworkStackLatencyPacket {
    timestamp: number;
    needs_response: number;
}
export declare const NetworkStackLatencyPacketInfo: import("./metadata").PacketMetadata;

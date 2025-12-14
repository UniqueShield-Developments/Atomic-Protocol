/**
 * PacketViolationWarningPacket
 * Packet ID: 156
 * This is sent when the client detects a malformed packet
 */
export interface PacketViolationWarningPacket {
    violation_type: "malformed";
    severity: "warning" | "final_warning" | "terminating";
    packet_id: number;
    reason: string;
}
export declare const PacketViolationWarningPacketInfo: import("./metadata").PacketMetadata;

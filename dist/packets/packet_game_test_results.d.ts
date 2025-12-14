/**
 * GameTestResultsPacket
 * Packet ID: 195
 * Game Test Results Packet
 */
export interface GameTestResultsPacket {
    succeeded: boolean;
    error: string;
    name: string;
}
export declare const GameTestResultsPacketInfo: import("./metadata").PacketMetadata;

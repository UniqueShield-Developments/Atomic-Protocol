/**
 * ScriptMessagePacket
 * Packet ID: 177
 * Used to send custom messages between client and server.
 */
export interface ScriptMessagePacket {
    message_id: string;
    data: string;
}
export declare const ScriptMessagePacketInfo: import("./metadata").PacketMetadata;

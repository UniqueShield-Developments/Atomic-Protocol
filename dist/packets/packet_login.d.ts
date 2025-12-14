/**
 * LoginPacket
 * Packet ID: 1
 * Sent once from client to server at login. About 100k.
 */
export interface LoginPacket {
    protocol_version: number;
    tokens: any;
}
export declare const LoginPacketInfo: import("./metadata").PacketMetadata;

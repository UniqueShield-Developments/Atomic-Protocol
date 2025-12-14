/**
 * ServerToClientHandshakePacket
 * Packet ID: 3
 * Server->Client Handshake
 */
export interface ServerToClientHandshakePacket {
    token: string;
}
export declare const ServerToClientHandshakePacketInfo: import("./metadata").PacketMetadata;

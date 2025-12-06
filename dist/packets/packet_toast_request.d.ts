/**
 * ToastRequestPacket
 * Packet ID: 186
 * Pushes a UI toast message to be displayed by the client
 */
export interface ToastRequestPacket {
    title: string;
    message: string;
}
export declare const ToastRequestPacketInfo: import("./metadata").PacketMetadata;

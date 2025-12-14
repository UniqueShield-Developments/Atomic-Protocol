/**
 * ModalFormRequestPacket
 * Packet ID: 100
 * Modal Form Request
 */
export interface ModalFormRequestPacket {
    form_id: number;
    data: string;
}
export declare const ModalFormRequestPacketInfo: import("./metadata").PacketMetadata;

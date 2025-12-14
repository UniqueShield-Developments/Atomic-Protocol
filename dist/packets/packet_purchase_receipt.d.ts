/**
 * PurchaseReceiptPacket
 * Packet ID: 92
 * Sent from client to server
 */
export interface PurchaseReceiptPacket {
    receipts: string[];
}
export declare const PurchaseReceiptPacketInfo: import("./metadata").PacketMetadata;

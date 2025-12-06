/**
 * TickingAreasLoadStatusPacket
 * Packet ID: 179
 * Used to inform the client that the server is waiting for ticking areas to finish preloading.
 */
export interface TickingAreasLoadStatusPacket {
    preload: boolean;
}
export declare const TickingAreasLoadStatusPacketInfo: import("./metadata").PacketMetadata;

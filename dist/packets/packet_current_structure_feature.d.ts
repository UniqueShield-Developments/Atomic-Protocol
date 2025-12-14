/**
 * CurrentStructureFeaturePacket
 * Packet ID: 314
 * Informs the client of which Structure Feature they are currently occupying.
 */
export interface CurrentStructureFeaturePacket {
    current_feature: string;
}
export declare const CurrentStructureFeaturePacketInfo: import("./metadata").PacketMetadata;

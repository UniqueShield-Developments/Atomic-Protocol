/**
 * TrimDataPacket
 * Unknown packet ID
 * No description
 */
export interface TrimDataPacket {
    patterns: {
        item_name: string;
        pattern: string;
    }[];
    materials: {
        material: string;
        color: string;
        item_name: string;
    }[];
}
export declare const TrimDataPacketInfo: import("./metadata").PacketMetadata;

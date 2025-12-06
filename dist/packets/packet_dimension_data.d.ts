/**
 * DimensionDataPacket
 * Unknown packet ID
 * No description
 */
export interface DimensionDataPacket {
    definitions: {
        id: string;
        max_height: number;
        min_height: number;
        generator: "legacy" | "overworld" | "flat" | "nether" | "end" | "void";
    }[];
}
export declare const DimensionDataPacketInfo: import("./metadata").PacketMetadata;

/**
 * StructureTemplateDataExportResponsePacket
 * Unknown packet ID
 * No description
 */
export interface StructureTemplateDataExportResponsePacket {
    name: string;
    success: boolean;
    nbt: {
        success: "true";
        value: Nbt;
    };
    response_type: "export" | "query" | "import";
}
export type Nbt = any;
export declare const StructureTemplateDataExportResponsePacketInfo: import("./metadata").PacketMetadata;

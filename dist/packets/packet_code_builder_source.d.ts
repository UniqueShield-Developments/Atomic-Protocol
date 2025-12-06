/**
 * CodeBuilderSourcePacket
 * Packet ID: 178
 * This is EDU exclusive, used in getInterface() of WebviewSystem
 */
export interface CodeBuilderSourcePacket {
    operation: "none" | "get" | "set" | "reset";
    category: "none" | "code_status" | "instantiation";
    code_status: "none" | "not_started" | "in_progress" | "paused" | "error" | "succeeded";
}
export declare const CodeBuilderSourcePacketInfo: import("./metadata").PacketMetadata;

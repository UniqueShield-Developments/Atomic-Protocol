/**
 * DebugRendererPacket
 * Unknown packet ID
 * No description
 */
export interface DebugRendererPacket {
    type: string;
    has_data: boolean;
    data: {
        has_data: "true";
        value: DebugMarkerData;
    };
}
export interface DebugMarkerData {
    text: string;
    position: Vec3f;
    color: number;
    duration: number;
}
export interface Vec3f {
    x: number;
    y: number;
    z: number;
}
export declare const DebugRendererPacketInfo: import("./metadata").PacketMetadata;

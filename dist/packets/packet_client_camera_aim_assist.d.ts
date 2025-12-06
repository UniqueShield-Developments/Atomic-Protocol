/**
 * ClientCameraAimAssistPacket
 * Packet ID: 321
 * Client-side activation of aim-assist
 */
export interface ClientCameraAimAssistPacket {
    preset_id: string;
    action: "set_from_camera_preset" | "clear";
    allow_aim_assist: boolean;
}
export declare const ClientCameraAimAssistPacketInfo: import("./metadata").PacketMetadata;

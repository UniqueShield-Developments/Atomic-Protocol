/**
 * LabTablePacket
 * Packet ID: 109
 * For the EDU Chemistry Lab Table block actor.
 */
export interface LabTablePacket {
    action_type: "combine" | "react" | "reset";
    position: Vec3i;
    reaction_type: number;
}
export interface Vec3i {
    x: number;
    y: number;
    z: number;
}
export declare const LabTablePacketInfo: import("./metadata").PacketMetadata;

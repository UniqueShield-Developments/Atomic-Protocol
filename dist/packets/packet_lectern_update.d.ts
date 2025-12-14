/**
 * LecternUpdatePacket
 * Packet ID: 125
 * This is used for the Lectern Block Actor.
 */
export interface LecternUpdatePacket {
    page: number;
    page_count: number;
    position: Vec3i;
}
export interface Vec3i {
    x: number;
    y: number;
    z: number;
}
export declare const LecternUpdatePacketInfo: import("./metadata").PacketMetadata;

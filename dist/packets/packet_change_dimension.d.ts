/**
 * ChangeDimensionPacket
 * Packet ID: 61
 * The server sends this packet from the level to kick off dimension changing process.
 */
export interface ChangeDimensionPacket {
    dimension: number;
    position: Vec3f;
    respawn: boolean;
    loading_screen_id: number | null;
}
export interface Vec3f {
    x: number;
    y: number;
    z: number;
}
export declare const ChangeDimensionPacketInfo: import("./metadata").PacketMetadata;

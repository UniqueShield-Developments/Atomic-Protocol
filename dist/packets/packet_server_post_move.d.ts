/**
 * ServerPostMovePacket
 * Unknown packet ID
 * No description
 */
export interface ServerPostMovePacket {
    position: Vec3f;
}
export interface Vec3f {
    x: number;
    y: number;
    z: number;
}
export declare const ServerPostMovePacketInfo: import("./metadata").PacketMetadata;

/**
 * UpdateClientInputLocksPacket
 * Packet ID: 196
 * UpdateClientInputLocksPacket
 */
export interface UpdateClientInputLocksPacket {
    locks: InputLockFlags;
    position: Vec3f;
}
export type InputLockFlags = {
    move: boolean;
    jump: boolean;
    sneak: boolean;
    mount: boolean;
    dismount: boolean;
    rotation: boolean;
};
export interface Vec3f {
    x: number;
    y: number;
    z: number;
}
export declare const UpdateClientInputLocksPacketInfo: import("./metadata").PacketMetadata;

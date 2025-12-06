/**
 * SpawnExperienceOrbPacket
 * Packet ID: 66
 * Spawn Experience Orb
 */
export interface SpawnExperienceOrbPacket {
    position: Vec3f;
    count: number;
}
export interface Vec3f {
    x: number;
    y: number;
    z: number;
}
export declare const SpawnExperienceOrbPacketInfo: import("./metadata").PacketMetadata;

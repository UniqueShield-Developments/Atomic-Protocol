/**
 * LevelSoundEventV2Packet
 * Unknown packet ID
 * No description
 */
export interface LevelSoundEventV2Packet {
    sound_id: number;
    position: Vec3f;
    block_id: number;
    entity_type: string;
    is_baby_mob: boolean;
    is_global: boolean;
}
export interface Vec3f {
    x: number;
    y: number;
    z: number;
}
export declare const LevelSoundEventV2PacketInfo: import("./metadata").PacketMetadata;

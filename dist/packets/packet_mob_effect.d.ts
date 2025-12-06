/**
 * MobEffectPacket
 * Packet ID: 28
 * Mob Effect
 */
export interface MobEffectPacket {
    runtime_entity_id: Varint64;
    event_id: "add" | "update" | "remove";
    effect_id: number;
    amplifier: number;
    particles: boolean;
    duration: number;
    tick: Varint64;
}
export type Varint64 = any;
export declare const MobEffectPacketInfo: import("./metadata").PacketMetadata;

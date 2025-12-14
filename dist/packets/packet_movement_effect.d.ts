/**
 * MovementEffectPacket
 * Packet ID: 318
 * These packets are sent to the client to update specific MovementEffects
 */
export interface MovementEffectPacket {
    runtime_id: Varint64;
    effect_type: MovementEffectType;
    effect_duration: number;
    tick: Varint64;
}
export type Varint64 = any;
export type MovementEffectType = "GLIDE_BOOST" | "invalid";
export declare const MovementEffectPacketInfo: import("./metadata").PacketMetadata;

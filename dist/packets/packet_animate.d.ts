/**
 * AnimatePacket
 * Unknown packet ID
 * No description
 */
export interface AnimatePacket {
    action_id: "none" | "swing_arm" | "unknown" | "wake_up" | "critical_hit" | "magic_critical_hit";
    runtime_entity_id: Varint64;
    data: number;
    has_swing_source: boolean;
    swing_source: {
        has_swing_source: "true";
        value: string;
    };
}
export type Varint64 = any;
export declare const AnimatePacketInfo: import("./metadata").PacketMetadata;

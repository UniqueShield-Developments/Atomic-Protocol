/**
 * InteractPacket
 * Unknown packet ID
 * No description
 */
export interface InteractPacket {
    action_id: "leave_vehicle" | "mouse_over_entity" | "npc_open" | "open_inventory";
    target_entity_id: Varint64;
    has_position: boolean;
    position: {
        has_position: "true";
        value: Vec3f;
    };
}
export type Varint64 = any;
export interface Vec3f {
    x: number;
    y: number;
    z: number;
}
export declare const InteractPacketInfo: import("./metadata").PacketMetadata;

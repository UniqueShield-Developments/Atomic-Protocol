/**
 * PositionTrackingDbBroadcastPacket
 * Unknown packet ID
 * No description
 */
export interface PositionTrackingDbBroadcastPacket {
    broadcast_action: "update" | "destory" | "not_found";
    tracking_id: number;
    nbt: Nbt;
}
export type Nbt = any;
export declare const PositionTrackingDbBroadcastPacketInfo: import("./metadata").PacketMetadata;

/**
 * ToggleCrafterSlotRequestPacket
 * Unknown packet ID
 * No description
 */
export interface ToggleCrafterSlotRequestPacket {
    position: Vec3li;
    slot: number;
    disabled: boolean;
}
export interface Vec3li {
    x: number;
    y: number;
    z: number;
}
export declare const ToggleCrafterSlotRequestPacketInfo: import("./metadata").PacketMetadata;

/**
 * HurtArmorPacket
 * Packet ID: 38
 * Hurt Armor
 */
export interface HurtArmorPacket {
    cause: number;
    damage: number;
    armor_slots: number;
}
export declare const HurtArmorPacketInfo: import("./metadata").PacketMetadata;

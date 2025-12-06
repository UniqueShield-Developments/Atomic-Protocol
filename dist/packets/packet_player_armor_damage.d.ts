/**
 * PlayerArmorDamagePacket
 * Packet ID: 149
 * Sent from server whenever the player's armor takes damage.
 */
export interface PlayerArmorDamagePacket {
    entries: ArmorDamageEntry[];
}
export interface ArmorDamageEntry {
    armor_slot: "helmet" | "chestplate" | "leggings" | "boots" | "body";
    damage: number;
}
export declare const PlayerArmorDamagePacketInfo: import("./metadata").PacketMetadata;

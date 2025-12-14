/**
 * UnlockedRecipesPacket
 * Packet ID: 199
 * Sent from server to client, for all previously unlocked recipes on load and for any newly unlocked recipes during gameplay.
 */
export interface UnlockedRecipesPacket {
    unlock_type: "empty" | "initially_unlocked" | "newly_unlocked" | "remove_unlocked" | "remove_all_unlocked";
    recipes: string[];
}
export declare const UnlockedRecipesPacketInfo: import("./metadata").PacketMetadata;

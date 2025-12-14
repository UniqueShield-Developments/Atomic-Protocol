/**
 * SetPlayerInventoryOptionsPacket
 * Packet ID: 307
 * SetPlayerInventoryOptionsPacket
 */
export interface SetPlayerInventoryOptionsPacket {
    left_tab: "none" | "construction" | "equipment" | "items" | "nature" | "search" | "survival";
    right_tab: "none" | "fullscreen" | "crafting" | "armor";
    filtering: boolean;
    layout: "none" | "survival" | "recipe_book" | "creative";
    crafting_layout: "none" | "survival" | "recipe_book" | "creative";
}
export declare const SetPlayerInventoryOptionsPacketInfo: import("./metadata").PacketMetadata;

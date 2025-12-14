/**
 * GuiDataPickItemPacket
 * Packet ID: 54
 * The server telling the client what item slot to hover over in the hotbar.
 */
export interface GuiDataPickItemPacket {
    item_name: string;
    item_effects: string;
    hotbar_slot: number;
}
export declare const GuiDataPickItemPacketInfo: import("./metadata").PacketMetadata;

/**
 * SetHudPacket
 * Packet ID: 308
 * This packet is only used via the set hud command. This is for 3rd party content.
 */
export interface SetHudPacket {
    elements: Element[];
    visibility: "hide" | "reset";
}
export type Element = "PaperDoll" | "Armour" | "ToolTips" | "TouchControls" | "Crosshair" | "HotBar" | "Health" | "ProgressBar" | "Hunger" | "AirBubbles" | "VehicleHealth" | "EffectsBar" | "ItemTextPopup";
export declare const SetHudPacketInfo: import("./metadata").PacketMetadata;

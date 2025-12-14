/**
 * UpdateSoftEnumPacket
 * Packet ID: 114
 * This is used for the scoreboard and tag systems (overwhelmingly used by 3rd party content)
 */
export interface UpdateSoftEnumPacket {
    enum_type: string;
    options: string[];
    action_type: "add" | "remove" | "update";
}
export declare const UpdateSoftEnumPacketInfo: import("./metadata").PacketMetadata;

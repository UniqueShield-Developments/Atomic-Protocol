/**
 * ServerboundPackSettingChangePacket
 * Packet ID: 329
 * Sent from the client to the server when players change Pack Settings (pack UI).
 */
export interface ServerboundPackSettingChangePacket {
    pack_id: string;
    pack_setting: {
        name: string;
        type: "float" | "bool" | "string";
        value: {
            type: "float";
            value: number;
        } | {
            type: "bool";
            value: boolean;
        } | {
            type: "string";
            value: string;
        };
    };
}
export declare const ServerboundPackSettingChangePacketInfo: import("./metadata").PacketMetadata;

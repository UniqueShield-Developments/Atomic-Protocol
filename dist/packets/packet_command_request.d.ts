/**
 * CommandRequestPacket
 * Unknown packet ID
 * No description
 */
export interface CommandRequestPacket {
    command: string;
    origin: CommandOrigin;
    internal: boolean;
    version: string;
}
export interface CommandOrigin {
    origin: string;
    uuid: string;
    request_id: string;
    player_entity_id: number;
}
export declare const CommandRequestPacketInfo: import("./metadata").PacketMetadata;

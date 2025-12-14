/**
 * BlockPickRequestPacket
 * Packet ID: 34
 * Player picks up a block in the world; client to server.
 */
export interface BlockPickRequestPacket {
    x: number;
    y: number;
    z: number;
    add_user_data: boolean;
    selected_slot: number;
}
export declare const BlockPickRequestPacketInfo: import("./metadata").PacketMetadata;

/**
 * SetMovementAuthorityPacket
 * Unknown packet ID
 * No description
 */
export interface SetMovementAuthorityPacket {
    movement_authority: "client" | "server" | "server_with_rewind";
}
export declare const SetMovementAuthorityPacketInfo: import("./metadata").PacketMetadata;

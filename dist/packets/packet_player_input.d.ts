/**
 * PlayerInputPacket
 * Unknown packet ID
 * No description
 */
export interface PlayerInputPacket {
    motion_x: number;
    motion_z: number;
    jumping: boolean;
    sneaking: boolean;
}
export declare const PlayerInputPacketInfo: import("./metadata").PacketMetadata;

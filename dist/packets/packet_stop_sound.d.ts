/**
 * StopSoundPacket
 * Packet ID: 87
 * Allows you to stop a sound or all sounds on all clients, only used in a /command
 */
export interface StopSoundPacket {
    name: string;
    stop_all: boolean;
    stop_music_legacy: boolean;
}
export declare const StopSoundPacketInfo: import("./metadata").PacketMetadata;

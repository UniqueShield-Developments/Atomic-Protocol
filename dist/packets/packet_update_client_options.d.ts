/**
 * UpdateClientOptionsPacket
 * Packet ID: 323
 * Sync the player's options (mostly settings) to the server.
 */
export interface UpdateClientOptionsPacket {
    graphics_mode: "simple" | "fancy" | "advanced" | "ray_traced" | null;
}
export declare const UpdateClientOptionsPacketInfo: import("./metadata").PacketMetadata;

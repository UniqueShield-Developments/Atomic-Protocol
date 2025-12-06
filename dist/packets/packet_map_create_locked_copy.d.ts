/**
 * MapCreateLockedCopyPacket
 * Packet ID: 131
 * This is fired when the user locks a map item utilizing the Cartography Table in game.
 */
export interface MapCreateLockedCopyPacket {
    original_map_id: number;
    new_map_id: number;
}
export declare const MapCreateLockedCopyPacketInfo: import("./metadata").PacketMetadata;

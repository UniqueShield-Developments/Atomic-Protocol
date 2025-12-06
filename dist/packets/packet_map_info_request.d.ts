/**
 * MapInfoRequestPacket
 * Packet ID: 68
 * In the case of the client being unable to find map data for a map item it sends a uuid for a map to the server.
 */
export interface MapInfoRequestPacket {
    map_id: number;
    client_pixels: {
        rgba: number;
        index: number;
    }[];
}
export declare const MapInfoRequestPacketInfo: import("./metadata").PacketMetadata;

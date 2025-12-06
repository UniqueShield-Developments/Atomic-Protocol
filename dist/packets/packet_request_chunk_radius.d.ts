/**
 * RequestChunkRadiusPacket
 * Packet ID: 69
 * The client can't just change the view radius without the server's approval, otherwise there could be holes on unrendered area.
 */
export interface RequestChunkRadiusPacket {
    chunk_radius: number;
    max_radius: number;
}
export declare const RequestChunkRadiusPacketInfo: import("./metadata").PacketMetadata;

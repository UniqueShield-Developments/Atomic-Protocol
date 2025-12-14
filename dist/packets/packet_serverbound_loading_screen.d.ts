/**
 * ServerboundLoadingScreenPacket
 * Packet ID: 312
 * Sent from the client to the server to message to the server about the state of the loading screen.
 */
export interface ServerboundLoadingScreenPacket {
    type: number;
    loading_screen_id: number | null;
}
export declare const ServerboundLoadingScreenPacketInfo: import("./metadata").PacketMetadata;

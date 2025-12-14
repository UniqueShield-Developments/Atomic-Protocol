/**
 * PlayerVideoCapturePacket
 * Unknown packet ID
 * No description
 */
export interface PlayerVideoCapturePacket {
    action: "stop" | "start";
    payload: {
        action: "start";
        frame_rate: number;
        file_prefix: string;
    };
}
export declare const PlayerVideoCapturePacketInfo: import("./metadata").PacketMetadata;

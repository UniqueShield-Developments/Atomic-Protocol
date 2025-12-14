/**
 * RemoveObjectivePacket
 * Packet ID: 106
 * Using the scoreboard command, users can remove objectives that are tracked on the scoreboard.
 */
export interface RemoveObjectivePacket {
    objective_name: string;
}
export declare const RemoveObjectivePacketInfo: import("./metadata").PacketMetadata;

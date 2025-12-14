/**
 * SimulationTypePacket
 * Packet ID: 168
 * Sent from the server to the client when setting the simulation type for toolbox mode. (Not yet suported)
 */
export interface SimulationTypePacket {
    type: "game" | "editor" | "test" | "invalid";
}
export declare const SimulationTypePacketInfo: import("./metadata").PacketMetadata;

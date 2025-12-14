/**
 * AnvilDamagePacket
 * Packet ID: 141
 * Requests an anvil to be damaged.
 */
export interface AnvilDamagePacket {
    damage: number;
    position: BlockCoordinates;
}
export interface BlockCoordinates {
    x: number;
    y: number;
    z: number;
}
export declare const AnvilDamagePacketInfo: import("./metadata").PacketMetadata;

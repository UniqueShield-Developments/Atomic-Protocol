/**
 * UpdateBlockSyncedPacket
 * Packet ID: 110
 * Used to sync moving blocks with clients so they render correctly
 */
export interface UpdateBlockSyncedPacket {
    position: BlockCoordinates;
    block_runtime_id: number;
    flags: UpdateBlockFlags;
    layer: number;
    entity_unique_id: number;
    transition_type: "entity" | "create" | "destroy";
}
export interface BlockCoordinates {
    x: number;
    y: number;
    z: number;
}
export type UpdateBlockFlags = {
    neighbors: boolean;
    network: boolean;
    no_graphic: boolean;
    unused: boolean;
    priority: boolean;
};
export declare const UpdateBlockSyncedPacketInfo: import("./metadata").PacketMetadata;

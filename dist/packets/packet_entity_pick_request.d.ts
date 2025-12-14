/**
 * EntityPickRequestPacket
 * Unknown packet ID
 * No description
 */
export interface EntityPickRequestPacket {
    runtime_entity_id: number;
    selected_slot: number;
    with_data: boolean;
}
export declare const EntityPickRequestPacketInfo: import("./metadata").PacketMetadata;

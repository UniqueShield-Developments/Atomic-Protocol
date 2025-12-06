/**
 * EditorNetworkPacket
 * Packet ID: 190
 * General use Editor specific packet - carries a payload of whatever serialized data that the individual IEditorNetworkPayload generates.
 */
export interface EditorNetworkPacket {
    route_to_manager: boolean;
    payload: Nbt;
}
export type Nbt = any;
export declare const EditorNetworkPacketInfo: import("./metadata").PacketMetadata;

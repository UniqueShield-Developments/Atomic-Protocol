/**
 * ResourcePackClientResponsePacket
 * Unknown packet ID
 * No description
 */
export interface ResourcePackClientResponsePacket {
    response_status: "none" | "refused" | "send_packs" | "have_all_packs" | "completed";
    resourcepackids: ResourcePackIds;
}
export type ResourcePackIds = string[];
export declare const ResourcePackClientResponsePacketInfo: import("./metadata").PacketMetadata;

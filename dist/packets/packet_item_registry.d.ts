/**
 * ItemRegistryPacket
 * Packet ID: 162
 * Item data from the server. Contains component information.
 */
export interface ItemRegistryPacket {
    itemstates: Itemstates;
}
export type Itemstates = {
    name: string;
    runtime_id: number;
    component_based: boolean;
    version: "legacy" | "data_driven" | "none";
    nbt: Nbt;
}[];
export type Nbt = any;
export declare const ItemRegistryPacketInfo: import("./metadata").PacketMetadata;

/**
 * MobArmorEquipmentPacket
 * Unknown packet ID
 * No description
 */
export interface MobArmorEquipmentPacket {
    runtime_entity_id: Varint64;
    helmet: Item;
    chestplate: Item;
    leggings: Item;
    boots: Item;
    body: Item;
}
export type Varint64 = any;
export interface Item {
    network_id: number;
    payload: {
        network_id: "0";
        value: void;
    };
}
export declare const MobArmorEquipmentPacketInfo: import("./metadata").PacketMetadata;

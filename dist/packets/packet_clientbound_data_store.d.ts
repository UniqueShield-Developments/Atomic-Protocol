/**
 * ClientboundDataStorePacket
 * Unknown packet ID
 * No description
 */
export interface ClientboundDataStorePacket {
    entries: {
        type: "update" | "change" | "removal";
        payload: {
            type: "update";
            name: string;
            property: string;
            path: string;
            data_type: "double" | "bool" | "string";
            data: {
                data_type: "double";
                value: number;
            } | {
                data_type: "bool";
                value: boolean;
            } | {
                data_type: "string";
                value: string;
            };
            update_count: number;
        } | {
            type: "change";
            name: string;
            property: string;
            update_count: number;
            data_type: "double" | "bool" | "string";
            data: {
                data_type: "double";
                value: number;
            } | {
                data_type: "bool";
                value: boolean;
            } | {
                data_type: "string";
                value: string;
            };
        } | {
            type: "removal";
            name: string;
        };
    }[];
}
export declare const ClientboundDataStorePacketInfo: import("./metadata").PacketMetadata;

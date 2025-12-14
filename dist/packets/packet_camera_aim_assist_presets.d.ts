/**
 * CameraAimAssistPresetsPacket
 * Packet ID: 320
 * Camera aim-assist registry presets/categories data sent from the server to clients.
 */
export interface CameraAimAssistPresetsPacket {
    categories: {
        name: string;
        entity_priorities: {
            id: string;
            priority: number;
        }[];
        block_priorities: {
            id: string;
            priority: number;
        }[];
        block_tags: number[];
        entity_default: number | null;
        block_default: number | null;
    }[];
    presets: {
        id: string;
        exclusion_settings: {
            blocks: string[];
            entities: string[];
            block_tags: string[];
        };
        target_liquids: string[];
        item_settings: {
            id: string;
            category: string;
        }[];
        default_item_settings: string | null;
        hand_settings: string | null;
    }[];
    operation: "set" | "add_to_existing";
}
export declare const CameraAimAssistPresetsPacketInfo: import("./metadata").PacketMetadata;

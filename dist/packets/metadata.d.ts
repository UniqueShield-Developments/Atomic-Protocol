export interface PacketMetadata {
    id?: number;
    name: string;
    description?: string;
    direction?: string;
}
export declare const PACKET_METADATA: Record<string, PacketMetadata>;

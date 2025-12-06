/**
 * RequestPermissionsPacket
 * Packet ID: 185
 * Sent from client to server. Used to request a new Permissions Levels.
 */
export interface RequestPermissionsPacket {
    entity_unique_id: number;
    permission_level: PermissionLevel;
    requested_permissions: RequestPermissions;
}
export type PermissionLevel = "visitor" | "member" | "operator" | "custom";
export type RequestPermissions = {
    build: boolean;
    mine: boolean;
    doors_and_switches: boolean;
    open_containers: boolean;
    attack_players: boolean;
    attack_mobs: boolean;
    operator: boolean;
    teleport: boolean;
};
export declare const RequestPermissionsPacketInfo: import("./metadata").PacketMetadata;

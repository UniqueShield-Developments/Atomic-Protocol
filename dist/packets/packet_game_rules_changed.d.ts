/**
 * GameRulesChangedPacket
 * Packet ID: 72
 * Updates game rules.
 */
export interface GameRulesChangedPacket {
    rules: GameRuleI32[];
}
export interface GameRuleI32 {
    name: string;
    editable: boolean;
    type: "bool" | "int" | "float";
    value: {
        type: "bool";
        value: boolean;
    } | {
        type: "int";
        value: number;
    } | {
        type: "float";
        value: number;
    };
}
export declare const GameRulesChangedPacketInfo: import("./metadata").PacketMetadata;

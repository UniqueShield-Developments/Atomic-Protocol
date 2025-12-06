"use strict";
/**
 * SetSpawnPositionPacket
 * Packet ID: 43
 * When a player logs in or the SetWorldSpawnCommand is used this is sent from the server to the client. Does not change when using a bed, that is a separate packet (RespawnPacket)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetSpawnPositionPacketInfo = void 0;
exports.SetSpawnPositionPacketInfo = {
    id: 43,
    name: "set_spawn_position",
    description: "When a player logs in or the SetWorldSpawnCommand is used this is sent from the server to the client. Does not change when using a bed, that is a separate packet (RespawnPacket)",
};

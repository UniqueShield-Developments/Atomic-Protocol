"use strict";
/**
 * UpdatePlayerGameTypePacket
 * Packet ID: 151
 * The server will send this back to all clients on receipt of the SetPlayerGameTypePacket so that cached game type and permissions flags in mLevel on all clients is kept up to date.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePlayerGameTypePacketInfo = void 0;
exports.UpdatePlayerGameTypePacketInfo = {
    id: 151,
    name: "update_player_game_type",
    description: "The server will send this back to all clients on receipt of the SetPlayerGameTypePacket so that cached game type and permissions flags in mLevel on all clients is kept up to date.",
};
